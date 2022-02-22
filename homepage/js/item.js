var grid = document.getElementById("grid-container")
export var items = {}

export class CreateBox {
    constructor(title, desc = null, link) {
        this.box = document.createElement("div")
        this.box.className = "grid-item button";
        this.box.onclick = function() {location.href=link}
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
        this.title.style.fontWeight = "900"
        this.title.className = "title";
        this.box.appendChild(this.title);
    }

    description(text) {
        this.descText = text;
        this.desc = document.createElement("p");
        this.desc.textContent = text;
        this.desc.className = "description";
        this.box.appendChild(this.desc);
    }

    hide() {
        this.box.style.display = "none";
    }

    show() {
        this.box.style.display = "block";
    }
} 
