import { componentIcon } from './icons';

export const MarkdownEditorMetadata = {
  metadataVersion: 2,
  id: 'markdown-editor',
  icon: componentIcon,
  label: 'Markdown Editor',
  category: 'Forms',
  subcategory: 'Input',

  properties: [
    {
      id: 'content',
      name: 'Initial Content',
      type: 'text',
      tooltip: 'Initial HTML content to display in the editor',
      default: '',
      main: true
    },
    {
      id: 'tableid',
      name: 'Table ID',
      type: 'text',
      tooltip: 'ID of the table to store the content',
      default: ''
    },
    {
      id: 'rowid',
      name: 'Row ID',
      type: 'text',
      tooltip: 'ID of the row to update (leave empty to create new row)',
      default: ''
    },
    {
      id: 'fieldid',
      name: 'Field ID',
      type: 'text',
      tooltip: 'ID of the field/column to save the content to',
      default: 'content'
    },
    {
      id: 'placeholder',
      name: 'Placeholder',
      type: 'text',
      tooltip: 'Placeholder text when editor is empty',
      default: 'Start typing...'
    },
    {
      id: 'autosave',
      name: 'Auto-save',
      type: 'boolean',
      tooltip: 'Automatically save changes to database',
      default: true
    },
    {
      id: 'savedelay',
      name: 'Save Delay (ms)',
      type: 'number',
      tooltip: 'Delay in milliseconds before auto-saving (debounce)',
      default: 1000
    }
  ],

  styles: [
    {
      id: 'width',
      name: 'Width',
      type: 'width',
      default: '100%'
    },
    {
      id: 'height',
      name: 'Height',
      type: 'height',
      default: '400px'
    },
    {
      id: 'border-radius',
      name: 'Border Radius',
      type: 'border-radius',
      default: '8px'
    },
    {
      id: 'border-color',
      name: 'Border Color',
      type: 'border-color',
      default: '#e5e7eb'
    },
    {
      id: 'border-width',
      name: 'Border Width',
      type: 'border-width',
      default: '1px'
    },
    {
      id: 'background-color',
      name: 'Background Color',
      type: 'background-color',
      default: '#ffffff'
    }
  ]
};
