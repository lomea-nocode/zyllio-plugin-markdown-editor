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
  private shadow: ShadowRoot;

  // Declare which attributes to observe
  static get observedAttributes() {
    return ['content', 'placeholder', 'autosave', 'tableid', 'rowid', 'fieldid', 'savedelay'];
  }

  constructor() {
    super();
    // Create Shadow DOM for better encapsulation
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    try {
      // Get properties from HTML attributes
      const content = this.getAttribute('content') || '';
      const placeholder = this.getAttribute('placeholder') || 'Start typing...';
      const autosave = this.getAttribute('autosave') === 'true';
      const tableId = this.getAttribute('tableid') || '';
      const rowId = this.getAttribute('rowid') || '';
      const fieldId = this.getAttribute('fieldid') || 'content';

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

      // Create editor container in Shadow DOM
      this.shadow.innerHTML = `
        <style>
          ${this.getStyles()}
        </style>
        <div class="markdown-editor-container">
          <div class="markdown-editor-toolbar" id="toolbar"></div>
          <div class="markdown-editor-content" id="editor"></div>
          <div class="markdown-editor-footer">
            <span class="save-indicator" id="save-indicator"></span>
          </div>
        </div>
      `;

      this.saveIndicator = this.shadow.querySelector('#save-indicator');

      // Initialize TipTap editor
      const editorElement = this.shadow.querySelector('#editor') as HTMLElement;

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

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // Handle attribute changes if needed
    // For now, we'll mainly handle initial setup in connectedCallback
    if (oldValue !== newValue && this.editor) {
      // Could implement live updates here if needed
      console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
    }
  }

  private createToolbar() {
    const toolbar = this.shadow.querySelector('#toolbar');
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
    const toolbar = this.shadow.querySelector('#toolbar');
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

    // Get save delay from attribute
    const saveDelay = parseInt(this.getAttribute('savedelay') || '1000', 10);

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
      const tableId = this.getAttribute('tableid') || '';
      const rowId = this.getAttribute('rowid') || '';
      const fieldId = this.getAttribute('fieldid') || 'content';

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
        // Update the rowid attribute with the new row ID
        this.setAttribute('rowid', newRow.id);
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

  // Get CSS styles as string for Shadow DOM
  private getStyles(): string {
    return `
      .markdown-editor-container {
        display: flex;
        flex-direction: column;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background: #ffffff;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .markdown-editor-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        padding: 8px;
        border-bottom: 1px solid #e5e7eb;
        background: #f9fafb;
      }

      .toolbar-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        background: #ffffff;
        cursor: pointer;
        transition: all 0.2s;
      }

      .toolbar-button:hover {
        background: #f3f4f6;
        border-color: #9ca3af;
      }

      .toolbar-button:active {
        background: #e5e7eb;
      }

      .toolbar-button.active {
        background: #3b82f6;
        border-color: #2563eb;
        color: #ffffff;
      }

      .toolbar-button.active svg {
        fill: #ffffff;
      }

      .toolbar-button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .toolbar-button svg {
        width: 18px;
        height: 18px;
        fill: #374151;
      }

      .toolbar-separator {
        width: 1px;
        height: 32px;
        background: #d1d5db;
        margin: 0 4px;
      }

      .markdown-editor-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }

      .markdown-editor-content .ProseMirror {
        outline: none;
        min-height: 200px;
      }

      .markdown-editor-content .ProseMirror p {
        margin: 0 0 1em 0;
      }

      .markdown-editor-content .ProseMirror h1 {
        font-size: 2em;
        font-weight: bold;
        margin: 0.67em 0;
      }

      .markdown-editor-content .ProseMirror h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin: 0.75em 0;
      }

      .markdown-editor-content .ProseMirror h3 {
        font-size: 1.17em;
        font-weight: bold;
        margin: 0.83em 0;
      }

      .markdown-editor-content .ProseMirror ul,
      .markdown-editor-content .ProseMirror ol {
        padding-left: 2em;
        margin: 1em 0;
      }

      .markdown-editor-content .ProseMirror li {
        margin: 0.5em 0;
      }

      .markdown-editor-content .ProseMirror blockquote {
        border-left: 4px solid #d1d5db;
        padding-left: 1em;
        margin: 1em 0;
        color: #6b7280;
      }

      .markdown-editor-content .ProseMirror code {
        background: #f3f4f6;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 0.9em;
      }

      .markdown-editor-content .ProseMirror a {
        color: #3b82f6;
        text-decoration: underline;
      }

      .markdown-editor-content .ProseMirror a:hover {
        color: #2563eb;
      }

      .markdown-editor-content .ProseMirror strong {
        font-weight: bold;
      }

      .markdown-editor-content .ProseMirror em {
        font-style: italic;
      }

      .markdown-editor-content .ProseMirror s {
        text-decoration: line-through;
      }

      .markdown-editor-footer {
        padding: 8px 16px;
        border-top: 1px solid #e5e7eb;
        background: #f9fafb;
        display: flex;
        justify-content: flex-end;
        min-height: 32px;
      }

      .save-indicator {
        font-size: 12px;
        color: #6b7280;
      }

      .save-indicator.saving {
        color: #f59e0b;
      }

      .save-indicator.saved {
        color: #10b981;
      }

      .save-indicator.error {
        color: #ef4444;
      }

      .error {
        padding: 16px;
        color: #ef4444;
        text-align: center;
      }
    `;
  }
}
