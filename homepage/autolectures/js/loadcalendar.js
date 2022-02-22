import VideoBox from "./videobox.js"

// lodad the new calendar into the localstorage
var file = document.getElementById("file");
file.addEventListener("change", function() {
    const reader = new FileReader();
    reader.onload = function() {
        window.localStorage.setItem("calendar", JSON.stringify(loadEvent(reader.result)));
        let call = JSON.parse(window.localStorage.getItem("calendar"))
        var actives = []
        for (let i in call) {
            let temp = new VideoBox(call[i])
            if (temp.load) actives.push(temp);
        }
    }
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