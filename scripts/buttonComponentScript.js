"use strict";

const codePreview = document.querySelector("#preview");
const htmlInput = document.querySelector(".htmlBox");
const cssInput = document.querySelector(".cssBox");
const htmlCopyBtn = document.querySelector(".htmlCopy");
const cssCopyBtn = document.querySelector(".cssCopy");
const htmlResetBtn = document.querySelector(".htmlReset");
const cssResetBtn = document.querySelector(".cssReset");
const cssCopyIcon = document.querySelector(".cssCopyIcon");
const htmlCopyIcon = document.querySelector(".htmlCopyIcon");
const htmlResetIcon = document.querySelector(".htmlResetIcon");
const cssResetIcon = document.querySelector(".cssResetIcon");
const htmlTitleButton = document.querySelector(".htmlTitleButton");
const cssTitleButton = document.querySelector(".cssTitleButton");
const headerButtonContainer = document.querySelector(".headerButtonContainer");
const codeBox = document.querySelector(".codeBox");
const hamburgerMenu = document.querySelector(".hamburgerMenu");
const sideNavMenu = document.querySelector(".sideNavMenu");

// Side bar open & close for small Screens
hamburgerMenu.addEventListener("click", () => {
  sideNavMenu.classList.toggle("visible");
  hamburgerMenu.classList.toggle("cross");
});

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
  ".button-container{display:flex;width:100%;height:100%;justify-content:center;align-items:center}.button{font-family:sans-serif;outline:0;background:linear-gradient(90deg,#5b86e5 0,#36d1dc 100%);width:500px;border:0;padding:15px;color:#fff;font-size:18px;transition:.4s ease-out;cursor:pointer;border-radius:10px}.button:hover{transform:scale(1.06)}.button:active{transform:scale(.89)}",
  {
    indent_size: 3,
    end_with_newline: true,
    wrap_line_length: 60,
  }
);

htmlCodeInstance.setValue(defaultHtml);
cssCodeInstance.setValue(defaultCSS);

htmlResetBtn.addEventListener("click", () => {
  htmlCodeInstance.setValue(defaultHtml);
  htmlResetIcon.textContent = "check_circle";

  setTimeout(() => {
    htmlResetIcon.textContent = "restart_alt";
  }, 1500);
});

cssResetBtn.addEventListener("click", () => {
  cssCodeInstance.setValue(defaultCSS);

  cssResetIcon.textContent = "check_circle";
  setTimeout(() => {
    cssResetIcon.textContent = "restart_alt";
  }, 1500);
});

// Change iFrame when you receive changes
const update = () => {
  let preview = codePreview.contentWindow.document;
  let codeTemplate = `
  <div style="height:100%;color:#fff;font-size:20px;font-family:sans-serif;display:flex; justify-content: center;align-items: center;">${htmlCodeInstance.getValue()} 
  <style> 
  ${cssCodeInstance.getValue()} +
  </style></div>`;
  preview.open();
  preview.write(codeTemplate);
  preview.close();
};

// Showing code ouput when page loads
window.addEventListener("load", update);

// Run update() function, when the instances have change
htmlCodeInstance.on("change", update);
cssCodeInstance.on("change", update);

htmlCopyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(htmlCodeInstance.getValue());
  htmlCopyIcon.textContent = "library_add_check";
  setTimeout(() => {
    htmlCopyIcon.textContent = " content_copy";
  }, 1500);
});

cssCopyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(cssCodeInstance.getValue());
  cssCopyIcon.textContent = "library_add_check";
  setTimeout(() => {
    cssCopyIcon.textContent = " content_copy";
  }, 1500);
});

// Tabs switch Logic
htmlTitleButton.addEventListener("click", () => {
  if (!htmlTitleButton.classList.contains("activeTab")) {
    htmlTitleButton.classList.add("activeTab");
    cssTitleButton.classList.remove("activeTab");

    cssResetBtn.classList.add("hide");
    htmlResetBtn.classList.remove("hide");

    htmlCopyBtn.classList.remove("hide");
    cssCopyBtn.classList.add("hide");

    htmlInput.classList.remove("hide");
    cssInput.classList.add("hide");
  }
});

cssTitleButton.addEventListener("click", () => {
  if (!cssTitleButton.classList.contains("activeTab")) {
    htmlTitleButton.classList.remove("activeTab");
    cssTitleButton.classList.add("activeTab");

    cssResetBtn.classList.remove("hide");
    htmlResetBtn.classList.add("hide");

    htmlCopyBtn.classList.add("hide");
    cssCopyBtn.classList.remove("hide");

    htmlInput.classList.add("hide");
    cssInput.classList.remove("hide");
  }
});
