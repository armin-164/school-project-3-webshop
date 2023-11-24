const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
const cartArray = [];

addToCartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        resetCart();
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

    const cartItem = {
        name: productName,
        img: productImg, 
        price: productPrice,
        rating: returnTotalRating(productRating),
        category: productCategory
      };

    cartArray.push(cartItem);
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

function resetCart() {
    const allCartItems = document.querySelectorAll('.cart-item');
    allCartItems.forEach(item => item.remove());
}

