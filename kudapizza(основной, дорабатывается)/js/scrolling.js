function scrolling(sections, fixed, ...items) {
	let heightFixed = fixed.offsetHeight;
	items.forEach(elem => {
			elem.obj.addEventListener("click", function(e) {
				if (e.target.dataset.filter || e.target.href && e.target.getAttribute("href") != "#other" && !e.target.classList.contains("card__dropdown-link")) {
					let name = e.target.dataset.filter ?? e.target.getAttribute("href").slice(1);
					let currentTarget;
					sections.forEach(each => {
						if (each.dataset.category === name) {
							currentTarget = each;
						}
					})
					let scrolled = window.pageYOffset;
					let where = currentTarget.getBoundingClientRect().top;
					let toScroll = scrolled + where - heightFixed;
					window.scrollTo({
						behavior: "smooth",
						left: 0,
						top: toScroll,
					})
				}
			})
	})
}

export default scrolling;