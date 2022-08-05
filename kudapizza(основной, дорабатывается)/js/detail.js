class Detail {
	constructor(card) {
		this.addButton = document.querySelector('.detail-product__send');
		this.card = card;
		this.rightSideDetail = document.querySelector('.detail-product__right');
		this.closeIcon = document.querySelector('.detail-product__close');
		this.sizes = document.querySelector('.detail-product__sizes');
		this.coloredBtnSizes = document.querySelector('.detail-product__size-color');
		this.elementsClassSizes = '.detail-product__size';
		this.types = document.querySelector('.detail-product__dough');
		this.coloredBtnTypes = document.querySelector('.detail-product__dough-btn-color');
		this.elementsClassTypes = '.detail-product__dough-btn';
		this.btnsType = document.querySelectorAll('.detail-product__dough-btn');
		this.addItems = document.querySelector('.detail-product__add-items');
		this.deleteIngridient = document.querySelectorAll('.detail-product__delete-item');
		this.addIngridient = document.querySelectorAll('.detail-product__add-item');
		this.price = document.querySelector('.detail-product__rubles');
		this.detailWEight = document.querySelector('.detail-product__weight');
		this.btnsSize = document.querySelectorAll('.detail-product__size');
		this.wrapper = document.querySelector('.wrapper');
		this.detailProduct = document.querySelector('.detail-product');
		this.productTitle = document.querySelector('.detail-product__title');
		this.productImg = document.querySelector('.detail-product__left img');
		this.darkScreen = document.querySelector('.dark-screen');
		this.HTMLofItem = ``;
		this.pizzaPrice = 0;
		this.ingridientsPrice = 0;
		this.size = 0;
		this.weight = 0;
		this.startingPrice = 0;
	}
	checkType(readyItem) {
		if (readyItem.typeOfProduct === "pizza") {
			this.renderPizza(readyItem);
		} else if (readyItem.typeOfProduct === "sushi") {
			this.renderSushi(readyItem);
		}
		this.data = readyItem;
	}
	renderPizza(readyItem) {
		let reg = /от/;
		this.productTitle.textContent = readyItem["name"];
		this.price.textContent = reg.test(readyItem["price"]) ? readyItem["price"].slice(3) : readyItem["price"];
		this.startingPrice = parseInt(this.price.textContent);
		this.productImg.src = readyItem["img-source"];
		this.detailProduct.classList.add("open");
		this.wrapper.classList.add("active");
		this.btnSwitcherSizes();
		this.btnSwitcherTypes();
	}
	makeBackground() {
		this.darkScreen.classList.add("on");
		document.body.classList.add("no-scroll");
	}
	checkSize(current) {
		if (current === "Тонкое") {
			this.size = -100;
		} else {
			this.size = 0;
		}
		this.getTotal();
	}
	listenerSizes() {
		this.sizes.addEventListener("click", e => {
			if (e.target.tagName === "BUTTON")
				this.btnsSize.forEach(btn => {
					btn.classList.remove("current");
				})
			e.target.classList.add("current");
			this.getTotal();
		})
	}
	listenerTypes() {
		this.types.addEventListener("click", e => {
			let current = e.target.textContent;
			this.btnsType.forEach(btn => {
				btn.classList.remove("current");
			})
			e.target.classList.add("current");
			this.checkSize(current);
		})

	}
	getTotal() {
		this.btnsSize.forEach(btn => {
			if (btn.classList.contains("current")) {
				let weightOfPizza = parseInt(btn.dataset.weight);
				this.weight = weightOfPizza + this.size;
				this.detailWEight.textContent = this.weight + " г";
				this.pizzaPrice = parseInt(btn.dataset.price) + this.startingPrice;
				let totalPrice = this.pizzaPrice + this.ingridientsPrice;
				this.price.textContent = totalPrice + " ₽";
			}
		})
	}
	start() {
		this.listenerTypes();
		this.listenerSizes();
		this.listenerAddItems();
		this.closeListener();
		this.listenerAddToCard();
	}
	listenerAddItems() {
		this.addItems.addEventListener("click", e => {
			if (e.target.classList.contains("detail-product__add-item-hover")) {
				this.ingridientsPrice -= 59;
			} else if (e.target.classList.contains("detail-product__add-item")) {
				this.ingridientsPrice += 59;
			}
			this.getTotal();
		})
	}
	btnSwitcherSizes() {
		let first = this.sizes.querySelector(this.elementsClassSizes);
		first.style.color = "white";
		let parameters = first.offsetWidth + "px";
		this.coloredBtnSizes.style.width = parameters;
		this.coloredBtnSizes.style.left = 0;
		this.sizes.addEventListener("click", ({ target }) => {
			if (target.tagName === "BUTTON") {
				let btns = this.sizes.querySelectorAll(this.elementsClassSizes);
				btns.forEach(elem => {
					elem.style.color = "black";
				})
				let widthElem = target.offsetWidth;
				let range = target.offsetLeft;
				this.coloredBtnSizes.style.left = range + "px";
				this.coloredBtnSizes.style.width = widthElem + "px";
				target.style.color = "white";
			}
		})
	}
	btnSwitcherTypes() {
		let first = this.types.querySelector(this.elementsClassTypes);
		first.style.color = "white";
		let parameters = first.offsetWidth + "px";
		this.coloredBtnTypes.style.width = parameters;
		this.coloredBtnTypes.style.left = 0;
		this.types.addEventListener("click", ({ target }) => {
			if (target.tagName === "BUTTON") {
				let btns = this.types.querySelectorAll(this.elementsClassTypes);
				btns.forEach(elem => {
					elem.style.color = "black";
				})
				let widthElem = target.offsetWidth;
				let range = target.offsetLeft;
				this.coloredBtnTypes.style.left = range + "px";
				this.coloredBtnTypes.style.width = widthElem + "px";
				target.style.color = "white";
			}
		})
	}
	closeListener() {
		window.addEventListener("click", e => {
			if (e.target === this.darkScreen || e.target === this.closeIcon || e.target === this.addButton) {
				this.ingridientsPrice = 0;
				this.detailProduct.classList.remove("open");
				this.darkScreen.classList.remove("on");
				this.wrapper.classList.remove("active");
				document.body.classList.remove("no-scroll");
				let btns = [...this.detailProduct.querySelectorAll(this.elementsClassSizes), ...this.detailProduct.querySelectorAll(this.elementsClassTypes)];
				btns.forEach((elem, ind) => {
					elem.style.color = "black";
					elem.classList.remove("current");
					if (ind === 0 || ind === 3) {
						elem.classList.add("current");

					}
				})
				let ingridients = [...this.deleteIngridient, ...this.addIngridient];
				ingridients.forEach(ingridient => {
					if (ingridient.classList.contains("selected")) {
						ingridient.classList.remove("selected");
						ingridient.classList.add("detail-product__add-item-hover");
					} else if (ingridient.classList.contains("deleted")) {
						ingridient.classList.remove("deleted");
						ingridient.classList.add("detail-product__delete-item-hover");
					}
				})
			}
		})
	}
	listenerAddToCard() {
		this.addButton.addEventListener("click", () => {
			let dataToCard = {};
			dataToCard["name"] = this.data["name"];
			dataToCard["imgSource"] = this.data["img-source"];
			let allBtns = [...this.btnsSize, ...this.btnsType];
			let currents = allBtns.filter(btn => btn.classList.contains("current"));
			dataToCard["size"] = currents[0].textContent;
			dataToCard["type"] = currents[1].textContent;
			dataToCard["price"] = this.price.textContent;
			this.card.makeCardElement(dataToCard);
		})
	}
}


export default Detail;