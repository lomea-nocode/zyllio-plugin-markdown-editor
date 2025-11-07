import { componentIcon } from './icons';

export const MarkdownEditorMetadata = {
  metadataVersion: 2,
  id: 'markdown-editor',
  icon: componentIcon,
  label: 'Markdown Editor',
  category: 'Forms',

  properties: [
    {
      id: 'content',
      name: 'Initial Content',
      type: 'long-text' as const,
      default: '',
      main: true
    },
    {
      id: 'tableid',
      name: 'Table ID',
      type: 'table' as const,
      default: ''
    },
    {
      id: 'rowid',
      name: 'Row ID',
      type: 'row-variable' as const,
      default: ''
    },
    {
      id: 'fieldid',
      name: 'Field ID',
      type: 'column' as const,
      default: 'content'
    },
    {
      id: 'placeholder',
      name: 'Placeholder',
      type: 'text' as const,
      default: 'Start typing...'
    },
    {
      id: 'autosave',
      name: 'Auto-save',
      type: 'boolean' as const,
      default: true as any
    },
    {
      id: 'savedelay',
      name: 'Save Delay (ms)',
      type: 'number' as const,
      default: 1000 as any
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
