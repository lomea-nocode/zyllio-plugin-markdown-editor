/// <reference types="@zyllio/zy-sdk" />

import { MarkdownEditorComponent } from './component';
import { MarkdownEditorMetadata } from './metadata';

declare const zySdk: any;

// Register the component with Zyllio
zySdk.services.registry.registerComponent(
  MarkdownEditorMetadata,
  MarkdownEditorComponent
);

console.log('Markdown Editor Plugin loaded successfully');
