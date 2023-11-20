const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
const cartItems = [];

addToCartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        fetchItemInfo(btn);
    })
})




// Fetch elements info
function fetchItemInfo (e) {
    let product = e.closest(".product");

    // Fetch img
    let productImg = product.querySelector("img");

    // Fetch name
    let productName = product.querySelector("h3").textContent;

    // Fetch price
    let productPrice = parseInt(product.querySelector(".product-price").textContent, 10);

    // Fetch rating 
    let productRating = product.querySelectorAll(".fa"); 

    // Fetch category
    let productCategory = product.querySelector(".product-category").textContent;


}
