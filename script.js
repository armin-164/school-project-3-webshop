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
