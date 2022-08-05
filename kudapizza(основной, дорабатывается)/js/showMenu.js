export function openCloseMenu() {
	const sideBtns = document.querySelectorAll('.side-menu__filter-btn');
	const openMenu = document.querySelector('[data-pizza="open"]');
	const darkScreen = document.querySelector('.dark-screen');
	const menu = document.querySelector('.side-menu');
	const body = document.body;
	const wrapper = document.querySelector('.wrapper');
	openMenu.addEventListener("click", function() {
		menu.classList.add("show");
		body.classList.add("no-scroll");
		wrapper.classList.add("active");
		darkScreen.classList.add("on");
	})
	window.addEventListener("click", function(e) {
		if (e.target.classList.contains("side-menu__close") || e.target.classList.contains("dark-screen")) {
			menu.classList.remove("show");
			body.classList.remove("no-scroll");
			wrapper.classList.remove("active");
			darkScreen.classList.remove("on");
			sideBtns.forEach(btn => {
				if (btn.classList.contains("selected")) {
					btn.classList.remove("selected");
				}
			})
		}
	})
}



