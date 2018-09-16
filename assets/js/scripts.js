document.body.onload = function () {

    // Vars
    var editor = document.getElementById('editor').contentWindow.document,
        editorSynonyms = document.getElementById('editor-synonyms'),
        buttonBold = document.getElementById('button-bold'),
        buttonItalic = document.getElementById('button-italic'),
        buttonUnderline = document.getElementById('button-underline'),
        buttonSize = document.getElementById('button-size'),
        buttonColor = document.getElementById('button-color'),
        buttonBackground = document.getElementById('button-background'),
        buttonLink = document.getElementById('button-link'),
        buttonUnlink = document.getElementById('button-unlink'),
        buttonSynonyms = document.getElementById('button-synonyms');

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
        var color = prompt("Enter a hexadecimal code or name of color", "");
        editor.execCommand('backcolor', false, color);
    }

    function setLink() {
        var link = prompt("Enter a link", "http://");
        editor.execCommand('createlink', false, link);
    }

    function unsetLink() {
        editor.execCommand('unlink', false, null);
    }

    function getSelectionText() {
        var text = "";
        if (editor.getSelection) {
            text = editor.getSelection().toString();
        } else if (editor.selection && editor.selection.type !== "Control") {
            text = editor.selection.createRange().text;
        }
        return text.trim();
    }

    function getSynonyms(text) {
        fetch('https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?rel_syn=' + text) // TODO fix 'https://cors-anywhere.herokuapp.com'
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                console.log('Parsed json', json);
                createListOfSynonyms(json);
            })
            .catch(function (ex) {
                console.log('Action failed', ex)
            })
    }

    function createListOfSynonyms(data) {
        var html = '';
        if (data.length) {
            for (var i = 0; i < data.length; i++) {
                html += '<a>' + data[i]['word'] + '</a>'
            }
        } else {
            html += 'Sorry, we can not find any synonyms';
        }
        editorSynonyms.style.display = 'block';
        editorSynonyms.innerHTML = html;
        editor.addEventListener('click', hideListOfSynonyms);

        if (data.length) {
            addEventToSynonyms();
        }
    }

    function hideListOfSynonyms() {
        editorSynonyms.style.display = 'none';
        editorSynonyms.innerHTML = '';
        editor.removeEventListener('click', hideListOfSynonyms);
    }

    function addEventToSynonyms() {
        var synonyms = editorSynonyms.querySelectorAll('a');
        if (synonyms.length) {
            for (var i = 0; i < synonyms.length; i++) {
                synonyms[i].addEventListener('click', setSynonym);
            }
        }
    }

    function setSynonym() {
        console.log(this.innerText);
        var selectedText,
            range;
        if (editor.getSelection) {
            selectedText = editor.getSelection();
            if (selectedText.rangeCount) {
                range = selectedText.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(this.innerText + ' '));
            }
        } else if (editor.selection && editor.selection.createRange) {
            range = editor.selection.createRange();
            range.text = this.innerText + ' ';
        }
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
    if (buttonSynonyms) {
        buttonSynonyms.onclick = function (e) {
            e.preventDefault();
            var text = getSelectionText(),
                textArr = text.split(' ');
            if (textArr.length > 1) {
                alert('Place select only one word!');
                return;
            }
            getSynonyms(text);
        }
    }
};