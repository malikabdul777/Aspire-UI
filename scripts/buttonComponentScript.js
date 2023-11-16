"use strict";

const codePreview = document.querySelector("#preview");
const htmlInput = document.querySelector(".htmlBox");
const cssInput = document.querySelector(".cssBox");
const htmlCopyBtn = document.querySelector(".htmlCopy");
const cssCopyBtn = document.querySelector(".cssCopy");

//Code Mirror Initialization
const htmlCodeInstance = CodeMirror(htmlInput, {
  lineNumbers: true,
  tabSize: 4,
  mode: "text/html",
  theme: "material-ocean",
  styleActiveLine: true,
  autoCloseTags: true,
  lineWrapping: true,
});
const cssCodeInstance = CodeMirror(cssInput, {
  lineNumbers: true,
  tabSize: 4,
  mode: "css",
  theme: "material-ocean",
  styleActiveLine: true,
  lineWrapping: true,
});

// Bueatifying Code
const defaultHtml = html_beautify('<button class="button">Button</button>', {
  indent_size: 3,
  end_with_newline: true,
  wrap_line_length: 60,
});

const defaultCSS = css_beautify(
  ".button-container{display:flex;width:100%;height:100%;justify-content:center;align-item:center}.button{font-family:sans-serif;outline:0;background:linear-gradient(90deg,#5b86e5 0,#36d1dc 100%);width:500px;border:0;padding:15px;color:#fff;font-size:18px;transition:.4s ease-out;cursor:pointer;border-radius:10px}.button:hover{transform:scale(1.06)}.button:active{transform:scale(.89)}",
  {
    indent_size: 3,
    end_with_newline: true,
    wrap_line_length: 60,
  }
);

htmlCodeInstance.setValue(defaultHtml);
cssCodeInstance.setValue(defaultCSS);

// Showing code ouput when page loads
window.addEventListener("load", function () {
  update();
});

// Run update() function, when the instances have change
htmlCodeInstance.on("change", function () {
  update();
});
cssCodeInstance.on("change", function () {
  update();
});

// Change iFrame when you receive changes
function update() {
  let preview = codePreview.contentWindow.document;
  let codeTemplate =
    `
    <!DOCTYPE html>
    <html>
    <head>
    <style>` +
    cssCodeInstance.getValue() +
    `</style>
    <body style="height:7rem;color:#fff;font-size:20px;font-family:sans-serif;display:flex; justify-content: center;align-items: center;">` +
    htmlCodeInstance.getValue() +
    `</body>
    </html>`;
  preview.open();
  preview.write(codeTemplate);
  preview.close();
}

htmlCopyBtn.addEventListener("click", () =>
  navigator.clipboard.writeText(htmlCodeInstance.getValue())
);

cssCopyBtn.addEventListener("click", () =>
  navigator.clipboard.writeText(cssCodeInstance.getValue())
);
