document.body.onload = function () {

    // Vars
    var editor = document.getElementById('editor').contentWindow.document,
        buttonBold = document.getElementById('button-bold'),
        buttonItalic = document.getElementById('button-italic'),
        buttonUnderline = document.getElementById('button-underline'),
        buttonSize = document.getElementById('button-size'),
        buttonColor = document.getElementById('button-color'),
        buttonBackground = document.getElementById('button-background'),
        buttonLink = document.getElementById('button-link'),
        buttonUnlink = document.getElementById('button-unlink');

    function initEditor() {
        editor.designMode = 'on';
    }

    initEditor();

    // Editor methods
    function bold() {
        editor.execCommand('bold', false, null);
    }

    function italic() {
        editor.execCommand('italic', false, null);
    }

    function underline() {
        editor.execCommand('underline', false, null);
    }

    function fontSize() {
        var size = prompt("Enter a size (1-7)", "");
        editor.execCommand('fontsize', false, size);
    }

    function fontColor() {
        var color = prompt("Enter a hexadecimal code or name of color", "");
        editor.execCommand('forecolor', false, color);
    }

    function fontBackground() {
        editor.execCommand('backcolor', false, "yellow");
    }

    function setLink() {
        var link = prompt("Enter a link", "http://");
        editor.execCommand('createlink', false, link);
    }

    function unsetLink() {
        editor.execCommand('unlink', false, null);
    }

    // Editor buttons calls
    if (buttonBold) {
        buttonBold.onclick = function (e) {
            e.preventDefault();
            bold();
        };
    }
    if (buttonItalic) {
        buttonItalic.onclick = function (e) {
            e.preventDefault();
            italic();
        };
    }
    if (buttonUnderline) {
        buttonUnderline.onclick = function (e) {
            e.preventDefault();
            underline();
        };
    }
    if (buttonSize) {
        buttonSize.onclick = function (e) {
            e.preventDefault();
            fontSize();
        };
    }
    if (buttonColor) {
        buttonColor.onclick = function (e) {
            e.preventDefault();
            fontColor();
        };
    }
    if (buttonBackground) {
        buttonBackground.onclick = function (e) {
            e.preventDefault();
            fontBackground();
        };
    }
    if (buttonLink) {
        buttonLink.onclick = function (e) {
            e.preventDefault();
            setLink();
        };
    }
    if (buttonUnlink) {
        buttonUnlink.onclick = function (e) {
            e.preventDefault();
            unsetLink();
        };
    }
};


