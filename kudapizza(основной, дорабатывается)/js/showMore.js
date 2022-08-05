function showMore(btn, text, fade) {
	btn.addEventListener("click", function() {
		if (fade.classList.contains("not")) {
			btn.textContent = "Показать полностью";
			fade.classList.remove("not");
			text.style.maxHeight = "308px";
		} else {
			btn.textContent = "Скрыть";
			fade.classList.add("not");
			text.style.maxHeight = text.scrollHeight + "px";
		}
	})
}

export default showMore;