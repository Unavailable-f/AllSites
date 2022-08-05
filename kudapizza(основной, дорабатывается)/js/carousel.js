class Carousel {
	constructor(arrowLeft, arrowRight, items, itemsWrapper, slidesToScroll) {
		this.arrowLeft = arrowLeft;
		this.arrowRight = arrowRight;
		this.itemsWrapper = itemsWrapper;
		this.slidesToScroll = slidesToScroll;
		this.slidesToShow = 4;
		this.items = items;
		this.itemWidth = items[0].offsetWidth;
		this.position = 0;
		this.range = (this.slidesToScroll * this.itemWidth) + (this.slidesToScroll * 30);
	}
	start() {
		this.arrowLeft.addEventListener("click", () => {
			this.arrowRight.disabled = false;
			this.position += this.range;
			this.itemsWrapper.style.transform = `translateX(${this.position}px)`;
			if (this.position === 0) {
				this.arrowLeft.disabled = true;
			}
		})
		this.arrowRight.addEventListener("click", () => {
			this.arrowLeft.disabled = false;
			let left = this.items.length - this.slidesToShow + this.position / (this.itemWidth + 30);
			if (left <= this.slidesToScroll) {
				let abc = this.position - left * (this.itemWidth + 30);
				this.itemsWrapper.style.transform = `translateX(${abc}px)`;
				this.arrowRight.disabled = true;
				this.position -= this.range;
			} else {
				this.position -= this.range;
				this.itemsWrapper.style.transform = `translateX(${this.position}px)`;
			}
		})
	}
}

let arrowLeftTop = document.querySelector(".more__arrow-left-top");
let arrowRightTop = document.querySelector(".more__arrow-right-top");
let itemsTop = document.querySelectorAll(".more__item-top");
let carouselWrapperTop = document.querySelector(".more__items-top");

let carouselTop = new Carousel(arrowLeftTop, arrowRightTop, itemsTop, carouselWrapperTop, 2);

carouselTop.start();

let arrowLeftBottom = document.querySelector(".more__arrow-left-bottom");
let arrowRightBottom = document.querySelector(".more__arrow-right-bottom");
let itemsBottom = document.querySelectorAll(".more__item-bottom");
let carouselWrapperBottom = document.querySelector(".more__items-bottom");

let carouselBottom = new Carousel(arrowLeftBottom, arrowRightBottom, itemsBottom, carouselWrapperBottom, 2);

carouselBottom.start();