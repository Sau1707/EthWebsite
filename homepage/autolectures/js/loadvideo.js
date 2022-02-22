var clock = document.getElementById("clock")
setInterval(function() {
    var currentdate = new Date(); 
    var day = currentdate.getFullYear()
            + ("0" + (currentdate.getMonth() + 1)).slice(-2)
            + currentdate.getDate()
    var datetime = ("0" + (currentdate.getHours())).slice(-2) 
                 + ("0" + (currentdate.getMinutes())).slice(-2) 
                 + ("0" + (currentdate.getSeconds())).slice(-2) 
    clock.innerText = day+ " " +datetime;
}, 1000)

// onload read the calendar
let call = JSON.parse(window.localStorage.getItem("calendar"))
var currentRoom = document.getElementById("currentRoom");

function choseVideo(el) {
    // current daytime
    var currentdate = new Date(); 
    var day = currentdate.getFullYear()
            + ("0" + (currentdate.getMonth() + 1)).slice(-2)
            + currentdate.getDate();
    var datetime = ("0" + (currentdate.getHours())).slice(-2) 
    + ("0" + (currentdate.getMinutes())).slice(-2) 
    + ("0" + (currentdate.getSeconds())).slice(-2);
    // test
    let diff = 5;
    var newDateObj = new Date(currentdate.getTime() + diff*60000);
    var datetimeplus = ("0" + (newDateObj.getHours())).slice(-2) 
    + ("0" + (newDateObj.getMinutes())).slice(-2) 
    + ("0" + (newDateObj.getSeconds())).slice(-2);

    var newDateObj = new Date(currentdate.getTime() - diff*60000);
    var datetimeminus = ("0" + (newDateObj.getHours())).slice(-2) 
    + ("0" + (newDateObj.getMinutes())).slice(-2) 
    + ("0" + (newDateObj.getSeconds())).slice(-2);

    el_day_start = el["start"].split("T")[0];
    if (el_day_start != day) {
        return
    }
    el_time_start = el["start"].split("T")[1];
    el_time_end = el["start"].split("T")[1];
    if (el_time_start < datetimeplus  && el_time_end > datetimeminus) {
        let room = el["loc"].replaceAll(" ", "-");
        let url = "https://oc-vp-distribution04.ethz.ch/player/index.html?id=" + room.toLowerCase();
        frame.src = url;
        currentRoom.innerText = "Current room:" + room;
    }
}
