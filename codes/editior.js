var left = document.getElementById('left');
var right = document.getElementById('right');
var bar = document.getElementById('bar');


const drag = (e) => {
    e.preventDefault();
    document.selection ? document.selection.empty() : window.getSelection().removeAllRanges();
    left.style.width = (e.pageX - bar.offsetWidth / 3) + 'px';
    editor.resize();
    console.log(window.innerWidth);
    console.log(left.style.width);
    console.log(right.style.width);
    console.log(bar.offsetWidth);
}

bar.addEventListener('mousedown', () => {
    document.addEventListener('mousemove', drag);
});

bar.addEventListener('mouseup', () => {

    document.removeEventListener('mousemove', drag);
});

var editor = ace.edit("editor", {
    wrap: true
});
// editor.setTheme("ace/theme/cobalt");
editor.session.setMode("ace/mode/html");

editor.setOptions({
    fontSize: '13pt'
    // useWrapMode:true,
    // indentedSoftWrap:false

})
editor.setAutoScrollEditorIntoView(true);
editor.setShowPrintMargin(false);
editor.removeLines(1);
editor.removeLines(2);



// editor.getSession().setUserWrapMode(true);


function getEditorCode() {
    let resultFrame = document.getElementById('resultFrame');
    let userCode = editor.getSession().getValue();

    let ifrw = resultFrame.contentWindow ? resultFrame.contentWindow : resultFrame.contentDocument.document ? resultFrame.contentDocument.document : resultFrame.contentDocument;
    ifrw.document.open();
    ifrw.document.write(userCode);
    ifrw.document.close();
    resultFrame.contentWindow.document.body.style.wordWrap = 'break-word';
}


window.onload = function () {
    if (localStorage.getItem('theme')) {
        editor.setTheme(localStorage.getItem('theme'));
    } else {
        editor.setTheme('');
        localStorage.setItem('theme', '');
    }
    // left.style.width = (window.innerWidth / 2 - bar.offsetWidth / 2) + 'px';
    // right.style.width = (window.innerWidth - left.style.width) + 'px';
	getEditorCode();
    
}

function setDarkMode() {
    editor.setTheme("ace/theme/cobalt");
    localStorage.setItem('theme', 'ace/theme/cobalt')
}

function setLightMode() {
    editor.setTheme('');
    localStorage.setItem('theme', '');
}