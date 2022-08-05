function windowScroll() {
	let card = document.querySelector('.card');
	if (scrollY >= 170) {
		card.classList.add("fixed");
	}
	window.addEventListener("scroll", function() {
		if (scrollY >= 170) {
			card.classList.add("fixed");
		} else { 
			card.classList.remove("fixed");
		}
	})
}
export default windowScroll;