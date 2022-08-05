import scrolling from "./scrolling.js";
import showMore from "./showMore.js";
import {openCloseMenu} from "./showMenu.js"; 
import windowScroll from "./windowScroll.js";
import reset from "./reset.js";
import addOrDelete from "./addOrDelete.js";
import SelectItem from "./menu.js";
import Detail from "./detail.js";
import Card from "./card.js";



const addIngredient = document.querySelector('.detail-product__add-items');
const deleteIngredient = document.querySelector('.detail-product__delete-items');
const rightMenu = document.querySelector('.side-menu__filters');
const fadeText = document.querySelector('.delivery__fade');
const textMore = document.querySelector('.delivery__text');
const btnMore = document.querySelector('.delivery__show-more');
const other = document.querySelector('.other');
const dropdown = document.querySelector('.card__dropdown');
const categories = document.querySelector('.categories__list');
const sections = document.querySelectorAll('[data-category]');
const fixed = document.querySelector('section[class="card"]');
const menuList = document.querySelector('.card__list');


//////////////////////////Сбросить фильтры в боковом меню
reset();


/////////////////////////Отслеживание скролла для фиксирования верхнего меню
windowScroll();


/////////////////////////////////Открыть-закрыть выпадающее меню
other.addEventListener("click", function(e) {
	e.preventDefault();
	dropdown.classList.toggle("active");
	e.currentTarget.classList.toggle("open");
})


///////////////////////////////////При нажатии на ссылку в выпадающем меню, оно закрывается
dropdown.addEventListener("click", function({target}) {
	if (target.classList.contains("card__dropdown-link")) {
		dropdown.classList.remove("active")
	}
})


/////////////////////////////////////////Открыть закрыть боковое меню
openCloseMenu();

////////////////////////////////////////Выбор кнопок в боком меню
rightMenu.addEventListener("click", function(e) {
	if (e.target.classList.contains("side-menu__filter-btn")) {
		e.target.classList.toggle("selected");
	}
})


///////////////////////////////Функция скролла до определенной секции
scrolling(sections, fixed, {obj: categories}, { obj: menuList});


///////////////////Показать больше текста на главной
showMore(btnMore, textMore, fadeText);

///////////////////////////////Добавление и удаление ингредиентов
addOrDelete([{name: addIngredient, type: "add"}, {name: deleteIngredient, type: "delete"}]);




let card = new Card();
card.renderFromStorage(); 
card.start();

let detail = new Detail(card);
detail.start();


/////////////////////////////Создание инстанса класса меню
let testing = new SelectItem(detail);
testing.starting();




