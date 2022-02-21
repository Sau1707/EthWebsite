import {CreateBox} from "./item.js";
import {SearchBar} from "./searchbar.js"

// Generate searchbar
new SearchBar()

// Generate all box
new CreateBox(`Meccanica 1`, `L'esame è per pagliacci`, "./test");
new CreateBox(`Meccanica 2`, `Una descrizione`, "./test");
new CreateBox(`Analisi 1`, `Viva antognini`, "./test");
new CreateBox(`Analisi 2`, `Ahia`, "./test");
new CreateBox(`Analisi 3`, `Laplace e Fourier`, "./test");