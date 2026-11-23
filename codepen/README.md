# Alchemy 101 for CodePen

Open https://codepen.io/pen/ for the classic three-panel editor.

1. Copy all of HTML.html into the HTML panel.
2. Copy all of CSS.css into the CSS panel.
3. Copy all of JavaScript.js into the JavaScript panel.
4. Use plain HTML, CSS and JavaScript: no preprocessors, libraries, or external resource settings are needed. Run the Pen and save when ready.

Use a wide preview or open the result in its own tab. On a phone, rotate to landscape.

The HTML file contains body content only, as required by the classic editor. All local JavaScript modules are combined into a single panel, with labeled sections showing their original filenames. All three stylesheets are combined in source order.

Artwork loads from the public GitHub repository through jsDelivr, pinned to commit 887a5236b5e4ec3392776b0da8ac4bdaba7e8138. Fonts load from Google Fonts. Internet access is required; no paid CodePen asset uploads are necessary. Game progress belongs to the current browser tab; the CodePen copy has its own session.

For a file-based editor, use index.html, CSS.css and JavaScript.js together. index.html is a full HTML document; HTML.html is only the classic HTML panel content.

Open index.html locally or the local server's /codepen/ page to preview this package. The repository's simple server requires /codepen/index.html as the exact URL.

Regenerate from the project root with: node build-codepen.mjs

Edit the original project files, then regenerate this package to keep both versions consistent. Edits made on CodePen do not automatically update your local project or GitHub.

Validation: JavaScript syntax and local browser rendering are checked during packaging. Importing into a signed-in CodePen account is a separate step; no Pen is created automatically.
