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
const defaultHtml = html_beautify(
  '<label class="switch"><input type="checkbox" checked="checked"><span class="slider round"></span></label>',
  {
    indent_size: 3,
    end_with_newline: true,
    wrap_line_length: 60,
  }
);

const defaultCSS = css_beautify(
  '.switch {position: relative;display: inline-block;width: 60px;height: 34px;}.switch input {opacity: 0;width: 0;height: 0;}.slider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #ccc;-webkit-transition: .4s;transition: .4s;}.slider:before {position: absolute;content: "";height: 26px;width: 26px;left: 4px;bottom: 4px;background-color: white;-webkit-transition: .4s;transition: .4s;}input:checked + .slider {background-image: linear-gradient( 90deg, rgb(91, 134, 229) 0%, rgb(54, 209, 220) 100% ) ;}input:checked + .slider:before {-webkit-transform: translateX(26px);-ms-transform: translateX(26px);transform: translateX(26px);}.slider.round {border-radius: 34px;}.slider.round:before {border-radius: 50%;}',
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
