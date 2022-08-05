class SelectItem {
	constructor(detailMenu) {
		this.detailMenu = detailMenu;
		this.readyItem = {};
		this.item = '';
		this.productSections = document.querySelectorAll('.products');
	}
	addListeners() {
		this.productSections.forEach(elem => {
			elem.addEventListener("click", e => {
				if (e.target.closest('.item')) {
					this.item = e.target.closest('.item');
					this.readyItem["typeOfProduct"] = this.item.closest(".products").className.split(' ')[0];
					this.createForMenu();
				}
			})
		})
	}
	starting() {
		this.addListeners();
	}
	createForMenu() {
		this.item.querySelectorAll('img, .name, .description, .price').forEach(item => {
			if (item.tagName != "IMG") {
				this.readyItem[item.className] = item.textContent;
			} else {
				this.readyItem["img-source"] = item.src;
			}
		})
		this.detailMenu.makeBackground();
		this.detailMenu.checkType(this.readyItem);
	}
}

export default SelectItem;