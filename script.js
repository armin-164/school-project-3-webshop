const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");


addToCartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        fetchItemInfo(btn);
    })
})

function fetchItemInfo (e) {
    const product = e.closest(".product");
    const productImg = product.querySelector("img");
    const productName = product.querySelector("h3").innerText;
    const productPrice = parseInt(product.querySelector(".product-price").innerText, 10);
    const productRating = product.querySelectorAll(".fa"); 
    const productCategory = product.querySelector(".product-category").innerText;

}

function returnTotalRating(element) {
    let checkedStars = 0;
    let halfStars = 0;

    element.forEach((star) => {
        if (star.classList.contains("checked")) {
            checkedStars++;
        }

        else if (star.classList.contains("fa-star-half-o")) {
            halfStars++;
        }
    });

    const totalRating = checkedStars + (0.5 * halfStars);
    return totalRating;
}
