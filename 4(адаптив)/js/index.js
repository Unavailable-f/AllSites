let burger = document.querySelector('.header__burger')
let body = document.body
let menu = document.querySelector(".header__list-wrap")
let links = document.querySelectorAll('.header__link')

burger.addEventListener('click', open)

links.forEach(single)

function open() {
	burger.classList.toggle('active')
	menu.classList.toggle('active')
	body.classList.toggle('_no-scroll')
}

function single(elem) {
	elem.addEventListener('click', close)
}

function close() {
	burger.classList.remove('active')
	menu.classList.remove('active')
	body.classList.remove('_no-scroll')
}