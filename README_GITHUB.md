# Zyllio Markdown Editor Plugin

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Zyllio SDK](https://img.shields.io/badge/Zyllio_SDK-2.x-green)
![License](https://img.shields.io/badge/license-MIT-green)

A rich text editor plugin for Zyllio Studio based on TipTap, inspired by shadcn's minimal-tiptap component.

## ✨ Features

- **Rich Text Formatting**: Bold, italic, strikethrough, inline code
- **Headings**: H1, H2, H3
- **Lists**: Bullet and numbered lists
- **Links**: Hyperlink management with URL popup
- **Blockquotes**: Quote styling
- **History**: Full undo/redo support
- **Auto-save**: Automatic saving to Zyllio database with debouncing
- **Save Indicator**: Real-time feedback (Saving/Saved/Error)
- **Markdown Shortcuts**: `**text**`, `# `, `## `, `### `, etc.
- **Responsive**: Works on desktop and mobile

## 📦 Installation

### Option 1: Install from URL (Recommended)

In Zyllio Studio:

1. Go to **Designer** → **Plugins**
2. Click **Add Plugin**
3. Enter the URL:
   ```
   https://YOUR_USERNAME.github.io/zyllio-plugin-markdown-editor/plugin.js
   ```

### Option 2: Install from Local File

1. Clone this repository
2. Install dependencies: `npm install`
3. Build the plugin: `npm run build`
4. In Zyllio Studio, load `dist/plugin.js`

## 🚀 Quick Start

### 1. Create a Database Table

```
Table: articles
Fields:
  - id (auto)
  - content (long text) ← Required for HTML storage
```

### 2. Add Component to Screen

1. Add the **"Markdown Editor"** component (Forms category)
2. Configure properties:

```
Properties:
  tableid     : "articles"
  rowid       : "" (leave empty to auto-create)
  fieldid     : "content"
  placeholder : "Start writing..."
  autosave    : true
  savedelay   : 1000
```

### 3. Customize Styles

```
Styles:
  width         : 100%
  height        : 500px
  border-radius : 8px
  border-color  : #e5e7eb
```

## 📖 Usage Examples

### Blog Editor

```javascript
Component: Markdown Editor
Properties:
  - tableid: "blog_posts"
  - rowid: "{{current_post_id}}"
  - fieldid: "content"
  - autosave: true
```

### Note Taking App

```javascript
Component: Markdown Editor
Properties:
  - tableid: "notes"
  - rowid: "{{note_id}}"
  - fieldid: "body"
  - placeholder: "Take your notes..."
  - savedelay: 500
```

## 🎨 Customization

All styles are configurable through Zyllio Studio properties:
- Width, height
- Border radius, color, width
- Background color

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/zyllio-plugin-markdown-editor.git
cd zyllio-plugin-markdown-editor

# Install dependencies
npm install

# Development mode (auto-rebuild)
npm run dev

# Build for production
npm run build

# Test standalone
open test.html
```

## 📚 Documentation

- **[Quick Start](QUICKSTART.md)** - Get started in 5 minutes
- **[Full Documentation](README.md)** - Complete reference
- **[Technical Notes](TECHNICAL_NOTES.md)** - Architecture and customization
- **[Testing Guide](TESTING.md)** - How to test the plugin

## 🧪 Testing

### Standalone Test

```bash
npm run build
open test.html
```

### In Zyllio Studio

Follow the [Quick Start](#-quick-start) section above.

## 🔧 Technologies

- **TipTap 2.1+** - Rich text editor framework
- **TypeScript 5.2** - Type safety
- **Webpack 5** - Bundling
- **Zyllio SDK 2.x** - Zyllio integration

## 📦 Build Output

- **Bundle size**: ~327 KB (minified)
- **Format**: ES5 compatible
- **External dependencies**: Zyllio SDK (provided by runtime)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🔗 Links

- [Zyllio SDK](https://github.com/zyllio/zyllio-sdk)
- [TipTap Documentation](https://tiptap.dev/)
- [Shadcn minimal-tiptap](https://www.shadcn.io/components/forms/minimal-tiptap)
- [Zyllio Website](https://www.zyllio.com)

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/zyllio-plugin-markdown-editor/issues)
- **Zyllio Support**: contact@zyllio.com
- **Twitter**: [@zyllio](https://twitter.com/zyllio)

## 🙏 Acknowledgments

- Inspired by [shadcn's minimal-tiptap](https://www.shadcn.io/components/forms/minimal-tiptap)
- Built with [TipTap](https://tiptap.dev/)
- Made for [Zyllio Studio](https://www.zyllio.com)

---

**Made with ❤️ for the Zyllio community**
