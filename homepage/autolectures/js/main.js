import VideoBox from "./videobox.js"

let call = JSON.parse(window.localStorage.getItem("calendar"))
var actives = []

for (let i in call) {
    let temp = new VideoBox(call[i])
    if (temp.load) actives.push(temp);
}
