const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
const cartItems = [];


// Create the left section of the item in cart
function createItemLeftSection(img, name, category) {

    const itemLeftSection = document.createElement("div");
    itemLeftSection.classList.add("item-left-section");

    const itemImg = img.cloneNode(true);


    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");

    const itemName = document.createElement("h4");
    itemName.innerText = name;

    const itemCategory = document.createElement("p");
    itemCategory.innerText = `Category: ${category}`;


    itemInfo.appendChild(itemName);
    itemInfo.appendChild(itemCategory);

    itemLeftSection.appendChild(itemImg);
    itemLeftSection.appendChild(itemInfo);

    return itemLeftSection;
}

// Create the right section of the item in cart
function createItemRightSection (price, rating) {
    const itemRightSection = document.createElement("div");
    itemRightSection.classList.add("item-right-section");

        const itemAmountControl = document.createElement("div");
        itemAmountControl.classList.add("item-amount-control");

            const reduceBtn = document.createElement("button");
            reduceBtn.innerText = "-";

            const itemAmountInput = document.createElement("input");
            itemAmountInput.type = "text";

            const increaseBtn = document.createElement("button");
            increaseBtn.innerText = "+";
        
        itemAmountControl.appendChild(reduceBtn);
        itemAmountControl.appendChild(itemAmountInput);
        itemAmountControl.appendChild(increaseBtn);

        const itemPriceContainer = document.createElement("div");
        itemPriceContainer.classList.add("item-price");

            const itemPrice = document.createElement("span");
            itemPrice.innerText = `${price}kr`;
        itemPriceContainer.appendChild(itemPrice);


        const itemRatingContainer = document.createElement("div");
        itemRatingContainer.classList.add("rating");
        rating.forEach((span) => {
            const clonedSpan = span.cloneNode(true);
            itemRatingContainer.appendChild(clonedSpan);
        })

        const removeText = document.createElement("span");
        removeText.innerText = "Remove from cart";


    itemRightSection.appendChild(itemAmountControl);
    itemRightSection.appendChild(itemPriceContainer);
    itemRightSection.appendChild(itemRatingContainer);
    itemRightSection.appendChild(removeText);
    return itemRightSection;
}


function createCartItem (img, name, category, price, rating) {
    const shoppingCart = document.querySelector(".shop-cart");
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.appendChild(createItemLeftSection(img, name, category));
    cartItem.appendChild(createItemRightSection(price, rating));
    shoppingCart.appendChild(cartItem);

}



// Fetch the products info and add them into the cart
function fetchItemInfo (e) {
    const product = e.closest(".product");
    const productImg = product.querySelector("img");
    const productName = product.querySelector("h3").textContent;
    const productPrice = parseInt(product.querySelector(".product-price").textContent, 10);
    const productRating = product.querySelectorAll(".fa"); 
    const productCategory = product.querySelector(".product-category").textContent;

    createCartItem(productImg, productName, productCategory, productPrice, productRating);

}


addToCartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        fetchItemInfo(btn);
    })
})
