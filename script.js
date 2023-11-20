const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
const cartItems = [];

addToCartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        fetchItemInfo(btn);
    })
})


// Fetch the products info and add them into the cart
function fetchItemInfo (e) {
    let product = e.closest(".product");
    let productImg = product.querySelector("img");
    let productName = product.querySelector("h3").textContent;
    let productPrice = parseInt(product.querySelector(".product-price").textContent, 10);
    let productRating = product.querySelectorAll(".fa"); 
    let productCategory = product.querySelector(".product-category").textContent;

    createCartItem(productImg, productName, productCategory, productPrice, productRating);

}

function createCartItem (img, name, category, price, rating) {
    const shoppingCart = document.querySelector(".shop-cart");
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.appendChild(createItemLeftSection(img, name, category));
    cartItem.appendChild(createItemRightSection(price, rating));
    shoppingCart.appendChild(cartItem);

}

// Create the left section of the item in cart
function createItemLeftSection(img, name, category) {

    let itemLeftSection = document.createElement("div");
    itemLeftSection.classList.add("item-left-section");

    let itemImg = img.cloneNode(true);


    let itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");

    let itemName = document.createElement("h4");
    itemName.innerText = name;

    let itemCategory = document.createElement("p");
    itemCategory.innerText = `Category: ${category}`;


    itemInfo.appendChild(itemName);
    itemInfo.appendChild(itemCategory);

    itemLeftSection.appendChild(itemImg);
    itemLeftSection.appendChild(itemInfo);

    return itemLeftSection;
}

// Create the right section of the item in cart
function createItemRightSection (price, rating) {
    let itemRightSection = document.createElement("div");
    itemRightSection.classList.add("item-right-section");

        let itemAmountControl = document.createElement("div");
        itemAmountControl.classList.add("item-amount-control");

            let reduceBtn = document.createElement("button");
            reduceBtn.innerText = "-";

            let itemAmountInput = document.createElement("input");
            itemAmountInput.type = "text";

            let increaseBtn = document.createElement("button");
            increaseBtn.innerText = "+";
        
        itemAmountControl.appendChild(reduceBtn);
        itemAmountControl.appendChild(itemAmountInput);
        itemAmountControl.appendChild(increaseBtn);

        let itemPriceContainer = document.createElement("div");
        itemPriceContainer.classList.add("item-price");

            let itemPrice = document.createElement("span");
            itemPrice.innerText = `${price}kr`;
        itemPriceContainer.appendChild(itemPrice);


        let itemRatingContainer = document.createElement("div");
        itemRatingContainer.classList.add("rating");
        rating.forEach((span) => {
            let clonedSpan = span.cloneNode(true);
            itemRatingContainer.appendChild(clonedSpan);
        })

        let removeText = document.createElement("span");
        removeText.innerText = "Remove from cart";


    itemRightSection.appendChild(itemAmountControl);
    itemRightSection.appendChild(itemPriceContainer);
    itemRightSection.appendChild(itemRatingContainer);
    itemRightSection.appendChild(removeText);
    return itemRightSection;
}

