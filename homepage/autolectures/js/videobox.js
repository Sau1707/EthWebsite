function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

export default class VideoBox {
    constructor(lecture) {
        this.desc = lecture.desc.substring(7,);
        this.room = lecture.loc;
        if (isBlank(this.room)) {
            this.room = null
        }
        this.topic = lecture.summary;
        this.prof = "Unknown";
        if (lecture.summary.indexOf(')') != -1) {
            this.prof = lecture.summary.substr(lecture.summary.indexOf(')')+2, );;
            this.topic = lecture.summary.substr(0, lecture.summary.indexOf('('));
        }  
        this.start = lecture.start.substring(9,); 
        this.end = lecture.end.substring(9,);
        this.day = lecture.start.substring(0,8)
        this.time = `${this.start.substring(0,2)}:${this.start.substring(2,4)}-${this.end.substring(0,2)}:${this.end.substring(2,4)}`
        if (!this.checkforDay()) {
            this.load = false;
            return;
        }
        this.generateBox()
        this.loadcontent()
        this.loadLink()
        this.load = true;
    }

    generateBox() {
        this.videoframe = document.createElement("div");
        this.videoframe.className = "videoframe";

        this.lectureinfo = document.createElement("div");
        this.lectureinfo.className = "lectureinfo";
        this.videoframe.appendChild(this.lectureinfo);

        this.iframe = document.createElement("iframe");
        this.iframe.allowFullscreen = "allowfullscreen"
        this.videoframe.appendChild(this.iframe);

        this.lectureinfo.innerHTML = '<p><strong>Lecture name:</strong><a class="lname"></a></p><p><strong>Professor:</strong><a class="prof">T. Rösgen</a></p> <p><strong>Course nuber:</strong><a class="cnum"></a></p> <p><strong>Room:</strong><a class="room"></a></p><p><strong>Time:</strong><a class="time"></a></p> <p><strong>Note:</strong></p>';
    
        //finally append to main body
        document.body.appendChild(this.videoframe)
    }

    loadcontent() {
        this.lectureinfo.getElementsByClassName("lname")[0].innerHTML = this.topic;
        this.lectureinfo.getElementsByClassName("prof")[0].innerHTML = this.prof;
        this.lectureinfo.getElementsByClassName("cnum")[0].innerHTML = this.desc;
        this.lectureinfo.getElementsByClassName("room")[0].innerHTML = this.room;
        this.lectureinfo.getElementsByClassName("time")[0].innerHTML = this.time;
    }

    checkforDay() {
        let currentdate = new Date(); 
        let day = currentdate.getFullYear()
                + ("0" + (currentdate.getMonth() + 1)).slice(-2)
                + currentdate.getDate();
        if (day != this.day) return false;
        return true;
    }

    loadLink() {
        //load lecture room
        if (this.room == null) return;
        let room = this.room.replaceAll(" ", "-");
        let url = "https://oc-vp-distribution04.ethz.ch/player/index.html?id=" + room.toLowerCase();
        this.iframe.src = url
    }
}