class Card {
	constructor() {
		this.id = 0;
		this.cardClose = document.querySelector('.basket__close');
		this.cardPopup = document.querySelector('.added-card');
		this.cardBottom = document.querySelector('.basket__bottom');
		this.cardTitle = document.querySelector('.basket__title');
		this.card = document.querySelector('.basket');
		this.textForIcon = document.querySelector('.card__price');
		this.priceText = document.querySelector('.basket__total');
		this.itemsWrapper = document.querySelector('.basket__items');
		this.wrapper = document.querySelector('.wrapper');
		this.iconOfCard = document.querySelector('.card__btn');
		this.darkScreen = document.querySelector('.dark-screen');
		this.arrItems = [];
		this.totalPrice = 0;
	}
	makeCardElement(data) {
		this.showPopup();
		data["startPrice"] = data["price"];
		if (this.checkTheSame(data)) {
			data["number"] = 1;
			data["id"] = this.id;
			this.arrItems.push(data);
			let HTMLofELement = `
		<div class="basket__item" data-id=${data.id}>
		<div class="basket__img">
			<img src="${data.imgSource}" alt="">
		</div>
		<div class="basket__details">
			<p class="basket__item-name">${data.name}</p>
			<p class="basket__item-info">${data.type} тесто, ${data.size}</p>
			<div class="basket__item-increase">
				<div class="basket__amount">
					<button class="basket__minus">-</button>
					<span class="basket__number">${data.number}</span>
					<button class="basket__plus">+</button>
				</div>
				<p class="basket__summ">${data.price}</p>
			</div>
		</div>
	</div>
`
			this.itemsWrapper.insertAdjacentHTML("beforeend", HTMLofELement);
			this.mekeTotalPrice(data, "plus");
			this.id += 1;
		}
	}
	start() {
		this.iconOfCard.addEventListener("click", () => {
			this.darkScreen.classList.add("on");
			this.wrapper.classList.add("active");
			this.card.classList.add("show");
			document.body.classList.add("no-scroll");
			this.emptyCard();
		})
		window.addEventListener("click", (e) => {
			if (e.target.classList.contains('basket__close') || e.target.classList.contains('dark-screen')) {
				this.darkScreen.classList.remove("on");
				this.wrapper.classList.remove("active");
				this.card.classList.remove("show");
				document.body.classList.remove("no-scroll");
			}
		})
		this.itemsWrapper.addEventListener("click", ({ target }) => {
			if (target.classList.contains("basket__plus")) {
				let item = target.closest('.basket__item');
				let itemId = item.dataset.id;
				this.arrItems.forEach((item) => {
					if (item.id == itemId) {
						this.makePriceOfItem(item, item.id, "plus");
						this.mekeTotalPrice(item, "plus");
					}
				})
			} else if (target.classList.contains("basket__minus")) {
				let item = target.closest('.basket__item');
				let itemId = item.dataset.id;
				this.arrItems.forEach((element, idx) => {
					if (element.id == itemId) {
						if (element.number == 1) {
							this.id -= 1;
							this.arrItems.splice(idx, 1);
							this.mekeTotalPrice(element, "minus");
							this.emptyCard();
							item.remove();
						} else {
							this.makePriceOfItem(element, element.id, "minus");
							this.mekeTotalPrice(element, "minus");
						}
					}
				})
			}
		})
	}
	mekeTotalPrice(currentItem, action) {
		let price = parseInt(currentItem.startPrice);
		if (action === "plus") {
			this.totalPrice += price;
		} else {
			this.totalPrice -= price;
		}
		this.priceText.textContent = "Итого: " + this.totalPrice + " ₽";
		this.textForIcon.textContent = this.totalPrice + " ₽";
		this.addStorage();
	}
	showPopup() {
		this.cardPopup.classList.add("show");
		setTimeout(() => {
			this.cardPopup.classList.remove("show");
		}, 2000)
	}
	checkTheSame(data) {
		let flag = true;
		this.arrItems.forEach(elem => {
			if (data["name"] === elem["name"] && data["type"] === elem["type"] && data["size"] === elem["size"] && data["startPrice"] === elem["startPrice"]) {
				this.makePriceOfItem(elem, elem.id, "plus");
				flag = false;
				this.mekeTotalPrice(elem, "plus");
				console.log("asd");
			}
		})
		return flag;
	}
	emptyCard() {
		if (this.arrItems.length === 0) {
			this.cardTitle.textContent = "Корзина пуста";
			this.cardBottom.classList.add("hide");
		} else {
			this.cardTitle.textContent = "Ваш заказ";
			this.cardBottom.classList.remove("hide");
		}
	}
	makePriceOfItem(itemObj, idItem, action) {
		if (action === "plus") {
			itemObj["price"] = parseInt(itemObj["price"]) + parseInt(itemObj["startPrice"]) + " ₽";
			itemObj["number"]++;
		} else {
			itemObj["price"] = parseInt(itemObj["price"]) - parseInt(itemObj["startPrice"]) + " ₽";
			itemObj["number"]--;
		}
		let itemHTML = this.itemsWrapper.querySelector(`[data-id="${idItem}"]`);
		let priceHTML = itemHTML.querySelector('.basket__summ');
		let numberHTML = itemHTML.querySelector('.basket__number');
		this.priceToHTML(itemObj, priceHTML, numberHTML);
	}
	priceToHTML(item, price, number) {
		price.textContent = item["price"];
		number.textContent = item["number"];
	}
	addStorage() {
		localStorage.setItem("items", JSON.stringify(this.arrItems));
	}
	renderFromStorage() {
		this.arrItems = localStorage.getItem("items") ? [...JSON.parse(localStorage.getItem("items"))] : [];
		if (! this.arrItems) {
			return;
		}
		this.id = this.arrItems.length + 1;
		let HTMLofELement = '';
		this.arrItems.forEach(elem => {
		this.totalPrice += parseInt(elem.price);
		HTMLofELement += `
		<div class="basket__item" data-id=${elem.id}>
		<div class="basket__img">
			<img src="${elem.imgSource}" alt="">
		</div>
		<div class="basket__details">
			<p class="basket__item-name">${elem.name}</p>
			<p class="basket__item-info">${elem.type} тесто, ${elem.size}</p>
			<div class="basket__item-increase">
				<div class="basket__amount">
					<button class="basket__minus">-</button>
					<span class="basket__number">${elem.number}</span>
					<button class="basket__plus">+</button>
				</div>
				<p class="basket__summ">${elem.price}</p>
			</div>
		</div>
	</div>`
		})
		this.itemsWrapper.insertAdjacentHTML("beforeend", HTMLofELement);
		this.priceText.textContent = "Итого: " + this.totalPrice + " ₽";
		this.textForIcon.textContent = this.totalPrice + " ₽";
	}
}


export default Card;