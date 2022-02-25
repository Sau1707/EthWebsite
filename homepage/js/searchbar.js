//
import {items} from "./item.js";

let searchbar = document.getElementById("search-bar");
searchbar.onkeyup = function(a) {search(a)} 

function search(a) {
    var filter = document.getElementById("search-bar").value.toUpperCase();
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