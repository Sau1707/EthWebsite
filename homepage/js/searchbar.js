//
import {items} from "./item.js";

// Create searchbar
export class SearchBar {
    constructor() {
        this.div = document.getElementById("search-bar")
        this.createInput()
        this.div.appendChild(this.inp)
    }

    createInput() {
        this.inp = document.createElement("input");
        this.inp.id = "searchInput"
        this.inp.className="search";
        this.inp.type = "text";
        this.inp.onkeyup = function(a) {search(a)}       
        this.inp.placeholder = "Search"
    }
}

function search(a) {
    var filter = document.getElementById("searchInput").value.toUpperCase();
    for (let item in items) {
        let t = items[item].titleText.toUpperCase().indexOf(filter) > -1;
        let d = items[item].descText.toUpperCase().indexOf(filter) > -1;
        if (t || d) {
            items[item].show()
        } else {
            items[item].hide()
        }
    }
}