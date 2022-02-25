import VideoBox from "./videobox.js"

// reader
const reader = new FileReader();
reader.onload = function() { 
    window.localStorage.setItem("calendar", JSON.stringify(loadEvent(reader.result)));
    let call = JSON.parse(window.localStorage.getItem("calendar"))
    console.log(call)
    var actives = []
    for (let i in call) {
        let temp = new VideoBox(call[i])
        if (temp.load) actives.push(temp);
    }   
}


// lodad the new calendar into the localstorage
var file = document.getElementById("file");
file.addEventListener("change", function() {
    console.log(this.files[0])
    reader.readAsText(this.files[0]);
});

function loadEvent(cal) {
    cal = cal.split("\n")
    cal = cal.map(function(e) {
        e = e.replace(/(\r\n|\n|\r)/gm, "")
        return e;
    })
    let lectures = []
    let block = false
    let temp = []
    for (let el in cal) {
      if (!block && cal[el].startsWith('BEGIN') && cal[el].endsWith('VEVENT')) {
        block = true
        continue;
      }  
      if (block && cal[el].startsWith('END') && cal[el].endsWith('VEVENT')) {
        block = false
        let struct = {
            "start": temp[1].slice(8),
            "end":  temp[3].slice(7),
            "summary":  temp[2].slice(8),
            "desc":  temp[4].slice(11),
            "loc":  temp[5].slice(9)
        }
        lectures.push(struct)
        temp = []
      }  
      if (!block) {
          continue;
      }
      temp.push(cal[el]);
    }
    return lectures
}

// get element
let div_box = document.getElementById("dropdiv");

//define default drop and drag event on the box
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    div_box.addEventListener(eventName, preventDefaults, false)
})

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.body.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}

// border hilight
;['dragenter', 'dragover'].forEach(eventName => {
    div_box.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
    div_box.addEventListener(eventName, unhighlight, false)
})

// body outof foucs
;['dragenter', 'dragover'].forEach(eventName => {
    document.body.addEventListener(eventName, body_highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
    document.body.addEventListener(eventName, body_unhighlight, false)
})

function body_highlight(e) {
    document.body.classList = "offocus";
}

let dragTimer;
function body_unhighlight(e) {
    window.clearTimeout(dragTimer);
    dragTimer = window.setTimeout(function() {
        document.body.classList = "";
    }, 185);
}

function highlight(e) {
    div_box.classList.add('highlight')
    window.clearTimeout(dragTimer);
    dragTimer = window.setTimeout(function() {
        document.body.classList = "";
    }, 185);
}

function unhighlight(e) {
    div_box.classList.remove('highlight')
}

// drop event
div_box.addEventListener('drop', handleDrop, false)
function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files
    console.log(files[0])
    if (files[0].type  != "text/calendar") return;
    reader.readAsText(files[0]);
}
