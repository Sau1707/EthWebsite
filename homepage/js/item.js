var grid = document.getElementById("grid-container")
export var items = {}


export class CreateBox {
    constructor(title, desc = null, link) {
        this.box = document.createElement("div")
        this.box.className = "card card-course";
        this.container = document.createElement("div");
        this.container.className = "card-contenct text-center";
        this.box.onclick = function() {
            document.location.href = link
        }
        this.box.appendChild(this.container);
        if (link.startsWith("https:")) {
            this.box.onclick = function(e) {
                window.open(link, '_blank').focus();;
            }
        }

        this.title(title)
        if (desc) {
            this.description(desc)
        }
        grid.appendChild(this.box)
        items[title] = this;
    }  

    title(name) {
        this.titleText = name;
        this.title = document.createElement("p");
        this.title.textContent = name;
        this.title.className = "title";
        this.container.appendChild(this.title);
    }

    description(text) {
        this.descText = text;
        this.desc = document.createElement("p");
        this.desc.textContent = text;
        this.desc.className = "description";
        this.container.appendChild(this.desc);
    }

    hide() {
        this.box.style.display = "none";
    }

    show() {
        this.box.style.display = "block";
    }
} 
