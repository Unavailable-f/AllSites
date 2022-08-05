function addOrDelete(objects) {
	objects.forEach(object => {
		object.name.addEventListener("click", function(e) {
			if (object.type === "delete") {
				if (e.target.classList.contains("detail-product__delete-item")) {
					e.target.classList.toggle("deleted");
					e.target.classList.toggle("detail-product__delete-item-hover");
				}
			} else if(object.type === "add") {
				if (e.target.classList.contains("detail-product__add-item")) {
					e.target.classList.toggle("selected");
					e.target.classList.toggle("detail-product__add-item-hover");
				}
			}
		})
	})
}
export default addOrDelete;
