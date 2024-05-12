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
  '<div class="cardContainer"><img src="https://picsum.photos/200" class="thumbnail"><div><h3>Abdul</h3><div class="onlineStatusContainer"><span class="onlineStatusDot"></span><p>Offline</p></div></div></div>',
  {
    indent_size: 3,
    end_with_newline: true,
    wrap_line_length: 60,
  }
);

const defaultCSS = css_beautify(
  ".cardContainer{width:400;height:140px;background-color:#fff;border-radius:20px;display:flex;align-items:center;padding-inline:20px;transition:transform .5s;cursor:pointer}.rightContentContainer{display:flex;flex-direction:column;justify-content:center}.cardContainer h3{color:#171717;font-size:24px;margin:0}.cardContainer p{color:#f76564;font-weight:500;margin:0}.cardContainer .onlineStatusContainer{display:flex;justify-content:center;align-items:center;margin-top:10px}.cardContainer .onlineStatusDot{padding:6px;background-color:#f76564;border-radius:50px;margin-right:5px;margin-top:0}.cardContainer:hover{transform:scale(1.05)}.thumbnail{height:100px;width:100px;border-radius:50%;margin-right:15px}",
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
