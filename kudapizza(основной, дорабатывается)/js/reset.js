function reset() {
	const sideBtns = document.querySelectorAll('.side-menu__filter-btn');
	const btnReset = document.querySelector('.side-menu__reset');
	btnReset.addEventListener("click", function() {
		sideBtns.forEach(btn => {
			if (btn.classList.contains("selected")) {
				btn.classList.remove("selected");
			}
		})
	})
}
export default reset;