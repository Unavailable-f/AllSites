let dropbox = document.querySelectorAll('.appointment__dropbox');
let select = document.querySelectorAll('.appointment__select')
let dropboxBody = document.querySelectorAll('.appointment__dropbox-body')

function openMenu(e) {
	e.currentTarget.classList.toggle('actived')
	let body = e.currentTarget.querySelector('.appointment__dropbox-body')
	body.classList.toggle('actived')
}

function selected(e) {
	let content = e.currentTarget.textContent
	let parent = e.currentTarget.closest('.appointment__dropbox-body')
	let active = e.currentTarget.closest('.appointment__dropbox')
	let holder = parent.previousElementSibling
	holder.classList.add('font') 
	holder.textContent = content
	active.classList.remove('actived')
	parent.classList.remove('actived')
}

dropbox.forEach(function(elem) {
	elem.addEventListener('click', openMenu)
}) 

select.forEach(function(el) {
	el.addEventListener('click', selected)
})

