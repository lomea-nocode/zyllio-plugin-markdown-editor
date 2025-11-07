/// <reference types="@zyllio/zy-sdk" />

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { icons } from './icons';
import './styles.css';

declare const zySdk: any;

export class MarkdownEditorComponent extends HTMLElement {
  private editor: Editor | null = null;
  private saveTimeout: any = null;
  private lastSavedContent: string = '';
  private saveIndicator: HTMLElement | null = null;

  constructor() {
    super();
  }

  async connectedCallback() {
    try {
      // Get properties
      const content = zySdk.services.component.getPropertyValue(this, 'content');
      const placeholder = zySdk.services.component.getPropertyValue(this, 'placeholder') || 'Start typing...';
      const autosave = zySdk.services.component.getPropertyValue(this, 'autosave');
      const tableId = zySdk.services.component.getPropertyValue(this, 'tableid');
      const rowId = zySdk.services.component.getPropertyValue(this, 'rowid');
      const fieldId = zySdk.services.component.getPropertyValue(this, 'fieldid');

      // Load content from database if table and row are specified
      let initialContent = content;
      if (tableId && rowId && fieldId) {
        try {
          const rows = await zySdk.services.storage.retrieveRows(tableId);
          const row = rows.find((r: any) => r.id === rowId);
          if (row && row[fieldId]) {
            initialContent = row[fieldId];
            this.lastSavedContent = initialContent;
          }
        } catch (error) {
          console.error('Error loading content from database:', error);
        }
      }

      // Create editor container
      this.innerHTML = `
        <div class="markdown-editor-container">
          <div class="markdown-editor-toolbar" id="toolbar"></div>
          <div class="markdown-editor-content" id="editor"></div>
          <div class="markdown-editor-footer">
            <span class="save-indicator" id="save-indicator"></span>
          </div>
        </div>
      `;

      this.saveIndicator = this.querySelector('#save-indicator');

      // Initialize TipTap editor
      const editorElement = this.querySelector('#editor') as HTMLElement;

      this.editor = new Editor({
        element: editorElement,
        extensions: [
          StarterKit.configure({
            bulletList: {
              keepMarks: true,
              keepAttributes: false,
            },
            orderedList: {
              keepMarks: true,
              keepAttributes: false,
            },
          }),
          Link.configure({
            openOnClick: false,
            HTMLAttributes: {
              class: 'editor-link',
            },
          }),
        ],
        content: initialContent || '',
        editorProps: {
          attributes: {
            class: 'prose prose-sm focus:outline-none',
            placeholder: placeholder,
          },
        },
        onUpdate: ({ editor }) => {
          if (autosave) {
            this.handleContentChange(editor.getHTML());
          }
        },
      });

      // Create toolbar buttons
      this.createToolbar();

    } catch (error) {
      console.error('Error initializing markdown editor:', error);
      this.innerHTML = '<div class="error">Error loading editor</div>';
    }
  }

  disconnectedCallback() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    if (this.editor) {
      this.editor.destroy();
    }
  }

  private createToolbar() {
    const toolbar = this.querySelector('#toolbar');
    if (!toolbar || !this.editor) return;

    const buttons = [
      // Text formatting
      { icon: 'bold', action: () => this.editor?.chain().focus().toggleBold().run(), isActive: () => this.editor?.isActive('bold') },
      { icon: 'italic', action: () => this.editor?.chain().focus().toggleItalic().run(), isActive: () => this.editor?.isActive('italic') },
      { icon: 'strikethrough', action: () => this.editor?.chain().focus().toggleStrike().run(), isActive: () => this.editor?.isActive('strike') },
      { icon: 'code', action: () => this.editor?.chain().focus().toggleCode().run(), isActive: () => this.editor?.isActive('code') },
      { separator: true },

      // Headings
      { icon: 'h1', action: () => this.editor?.chain().focus().toggleHeading({ level: 1 }).run(), isActive: () => this.editor?.isActive('heading', { level: 1 }) },
      { icon: 'h2', action: () => this.editor?.chain().focus().toggleHeading({ level: 2 }).run(), isActive: () => this.editor?.isActive('heading', { level: 2 }) },
      { icon: 'h3', action: () => this.editor?.chain().focus().toggleHeading({ level: 3 }).run(), isActive: () => this.editor?.isActive('heading', { level: 3 }) },
      { separator: true },

      // Lists
      { icon: 'bulletList', action: () => this.editor?.chain().focus().toggleBulletList().run(), isActive: () => this.editor?.isActive('bulletList') },
      { icon: 'orderedList', action: () => this.editor?.chain().focus().toggleOrderedList().run(), isActive: () => this.editor?.isActive('orderedList') },
      { separator: true },

      // Other
      { icon: 'link', action: () => this.setLink(), isActive: () => this.editor?.isActive('link') },
      { icon: 'quote', action: () => this.editor?.chain().focus().toggleBlockquote().run(), isActive: () => this.editor?.isActive('blockquote') },
      { separator: true },

      // History
      { icon: 'undo', action: () => this.editor?.chain().focus().undo().run(), canExecute: () => this.editor?.can().undo() },
      { icon: 'redo', action: () => this.editor?.chain().focus().redo().run(), canExecute: () => this.editor?.can().redo() },
    ];

    buttons.forEach((button) => {
      if (button.separator) {
        const separator = document.createElement('div');
        separator.className = 'toolbar-separator';
        toolbar.appendChild(separator);
      } else {
        const btn = document.createElement('button');
        btn.className = 'toolbar-button';
        btn.innerHTML = icons[button.icon as keyof typeof icons] || '';
        btn.type = 'button';

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (button.action) {
            button.action();
          }
          this.updateToolbarState();
        });

        // Store button reference for state updates
        (btn as any).__buttonConfig = button;

        toolbar.appendChild(btn);
      }
    });

    // Update toolbar state periodically
    this.editor.on('selectionUpdate', () => {
      this.updateToolbarState();
    });

    this.updateToolbarState();
  }

  private updateToolbarState() {
    const toolbar = this.querySelector('#toolbar');
    if (!toolbar) return;

    const buttons = toolbar.querySelectorAll('.toolbar-button');
    buttons.forEach((btn) => {
      const config = (btn as any).__buttonConfig;
      if (!config) return;

      // Update active state
      if (config.isActive) {
        if (config.isActive()) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }

      // Update disabled state
      if (config.canExecute) {
        if (config.canExecute()) {
          btn.removeAttribute('disabled');
        } else {
          btn.setAttribute('disabled', 'true');
        }
      }
    });
  }

  private setLink() {
    if (!this.editor) return;

    const previousUrl = this.editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);

    // Cancelled
    if (url === null) {
      return;
    }

    // Empty - remove link
    if (url === '') {
      this.editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // Update link
    this.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  private handleContentChange(content: string) {
    // Show saving indicator
    if (this.saveIndicator) {
      this.saveIndicator.textContent = 'Saving...';
      this.saveIndicator.classList.add('saving');
    }

    // Clear previous timeout
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    // Get save delay
    const saveDelay = zySdk.services.component.getPropertyValue(this, 'savedelay') || 1000;

    // Set new timeout
    this.saveTimeout = setTimeout(() => {
      this.saveContent(content);
    }, saveDelay);
  }

  private async saveContent(content: string) {
    // Don't save if content hasn't changed
    if (content === this.lastSavedContent) {
      if (this.saveIndicator) {
        this.saveIndicator.textContent = 'Saved';
        this.saveIndicator.classList.remove('saving');
        this.saveIndicator.classList.add('saved');

        setTimeout(() => {
          if (this.saveIndicator) {
            this.saveIndicator.textContent = '';
            this.saveIndicator.classList.remove('saved');
          }
        }, 2000);
      }
      return;
    }

    try {
      const tableId = zySdk.services.component.getPropertyValue(this, 'tableid');
      const rowId = zySdk.services.component.getPropertyValue(this, 'rowid');
      const fieldId = zySdk.services.component.getPropertyValue(this, 'fieldid') || 'content';

      if (!tableId) {
        console.warn('No table ID specified, content not saved');
        return;
      }

      const data = {
        [fieldId]: content
      };

      if (rowId) {
        // Update existing row
        await zySdk.services.storage.updateRow(tableId, rowId, data);
      } else {
        // Create new row
        const newRow = await zySdk.services.storage.createRow(tableId, data);
        // Update the rowid property with the new row ID
        zySdk.services.dictionary.setValue(
          zySdk.services.component.getPropertyValue(this, 'rowid'),
          newRow.id
        );
      }

      this.lastSavedContent = content;

      // Show saved indicator
      if (this.saveIndicator) {
        this.saveIndicator.textContent = 'Saved';
        this.saveIndicator.classList.remove('saving');
        this.saveIndicator.classList.add('saved');

        setTimeout(() => {
          if (this.saveIndicator) {
            this.saveIndicator.textContent = '';
            this.saveIndicator.classList.remove('saved');
          }
        }, 2000);
      }

    } catch (error) {
      console.error('Error saving content:', error);

      if (this.saveIndicator) {
        this.saveIndicator.textContent = 'Error saving';
        this.saveIndicator.classList.remove('saving');
        this.saveIndicator.classList.add('error');

        setTimeout(() => {
          if (this.saveIndicator) {
            this.saveIndicator.textContent = '';
            this.saveIndicator.classList.remove('error');
          }
        }, 3000);
      }
    }
  }

  // Public method to get current content
  public getContent(): string {
    return this.editor?.getHTML() || '';
  }

  // Public method to set content
  public setContent(content: string) {
    this.editor?.commands.setContent(content);
  }
}
