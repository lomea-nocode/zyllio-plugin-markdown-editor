/// <reference types="@zyllio/zy-sdk" />

import { MarkdownEditorComponent } from './component';
import { MarkdownEditorMetadata } from './metadata';

declare const zySdk: any;

// First, define the custom element with the browser
if (!customElements.get('markdown-editor')) {
  customElements.define('markdown-editor', MarkdownEditorComponent);
}

// Then register the component with Zyllio
zySdk.services.registry.registerComponent(
  MarkdownEditorMetadata,
  MarkdownEditorComponent
);

console.log('Markdown Editor Plugin loaded successfully');
