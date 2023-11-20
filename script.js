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















/*
addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        let product = btn.closest(".product");
        let productPrice = parseInt(product.querySelector(".product-price").textContent, 10);

        let productImg = document.createElement("img");
        productImg.src = product.querySelector("img").src;

       
      createCartItem(productImg);
    })
})



function createCartItem(img) {
    const shoppingCart = document.querySelector(".shop-cart");
    let cartItem = document.createElement("div");
    cartItem.classList = "cart-item";

    cartItem.appendChild(createItemLeftSection(img))

    shoppingCart.appendChild(cartItem);


}

function createItemLeftSection(img, div) {
    let itemLeftSection = document.createElement("div");
    itemLeftSection.classList = "item-left-section";
    itemLeftSection.appendChild(img)
    return itemLeftSection;
}*/