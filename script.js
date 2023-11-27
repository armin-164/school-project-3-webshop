const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
const shoppingCart = document.querySelector('.shop-cart');
const cartArray = [];
const filterList = document.querySelector('select[name="filter-list"]');
const filterListCategories = document.querySelector('select[name="filter-category"]');


filterList.addEventListener('change', () => {
    filterProducts(filterList.value)
});








function filterProducts (filter_value) {
    const allProductsDOM = document.querySelectorAll('.product');
    const productList = document.querySelector('.product-list');
    let productsArray = [];

    allProductsDOM.forEach((product) => {
        const ratings = product.querySelectorAll('.fa');

        const productObject = {
            element: product,
            name: product.querySelector('h3').innerText,
            rating: returnTotalRating(ratings),
            price: product.querySelector('.product-price').innerText
        }
        
        productsArray.push(productObject);

    })

    if (filter_value === "filter-name") {
        productList.innerHTML = "";
        sortPropertyAlphabetically(productsArray);

        productsArray.forEach((obj) => {
            productList.appendChild(obj.element);
        })
    }
    console.log(productsArray);
    console.log(filter_value);

}


function sortPropertyAlphabetically (property) {
    property.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        return 0;
      });
}








addToCartButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    resetCart();
    fetchItemInfo(btn);
    updateCartDOM();
  });
});

function fetchItemInfo(e) {
  const product = e.closest('.product');
  const productImg = product.querySelector('img');
  const productName = product.querySelector('h3').innerText;
  const productPrice = parseInt(
    product.querySelector('.product-price').innerText,
    10,
  );
  const productRating = product.querySelectorAll('.fa');
  const productCategory = product.querySelector('.product-category').innerText;

  const cartItem = {
    name: productName,
    img: productImg,
    price: productPrice,
    rating: returnTotalRating(productRating),
    category: productCategory,
  };

  cartArray.push(cartItem);
}

function returnTotalRating(element) {
  let checkedStars = 0;
  let halfStars = 0;

  element.forEach((star) => {
    if (star.classList.contains('checked')) {
      checkedStars++;
    } else if (star.classList.contains('fa-star-half-o')) {
      halfStars++;
    }
  });

  const totalRating = checkedStars + 0.5 * halfStars;
  return totalRating;
}

function resetCart() {
  const allCartItems = document.querySelectorAll('.cart-item');
  allCartItems.forEach((item) => item.remove());
}

function updateCartDOM() {
    const cartSumDOM = document.querySelector('.cart-total-sum');
    let cartSum = 0;
  cartArray.forEach((obj) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.appendChild(
      createItemLeftSection(obj.img, obj.name, obj.category),
    );
    cartItem.appendChild(createItemRightSection(obj.price, obj.rating));

    cartSum += obj.price;
    cartSumDOM.innerText = `Your Total is: ${cartSum}kr`;

    shoppingCart.appendChild(cartItem);
  });
}

function createItemLeftSection(img, name, category) {
  const itemLeftSection = document.createElement('div');
  itemLeftSection.classList.add('item-left-section');

  const itemImg = img.cloneNode(true);

  const itemInfo = document.createElement('div');
  itemInfo.classList.add('item-info');

  const itemName = document.createElement('h4');
  itemName.innerText = name;

  const itemCategory = document.createElement('p');
  itemCategory.innerText = `Category: ${category}`;

  itemInfo.appendChild(itemName);
  itemInfo.appendChild(itemCategory);

  itemLeftSection.appendChild(itemImg);
  itemLeftSection.appendChild(itemInfo);

  return itemLeftSection;
}

function createItemRightSection(price, rating) {
  const itemRightSection = document.createElement('div');
  itemRightSection.classList.add('item-right-section');

  const itemAmountControl = document.createElement('div');
  itemAmountControl.classList.add('item-amount-control');

  const reduceBtn = document.createElement('button');
  reduceBtn.innerText = '-';

  const itemAmountInput = document.createElement('input');
  itemAmountInput.type = 'text';

  const increaseBtn = document.createElement('button');
  increaseBtn.innerText = '+';

  itemAmountControl.appendChild(reduceBtn);
  itemAmountControl.appendChild(itemAmountInput);
  itemAmountControl.appendChild(increaseBtn);

  const itemPriceContainer = document.createElement('div');
  itemPriceContainer.classList.add('item-price');

  const itemPrice = document.createElement('span');
  itemPrice.innerText = `${price}kr`;
  itemPriceContainer.appendChild(itemPrice);

  const removeText = document.createElement('span');
  removeText.classList.add('remove-item-from-cart');
  removeText.innerText = 'Remove from cart';

  removeText.addEventListener('click', () => {
    removeText.closest('.cart-item').remove();
    removeFromCartArray(removeText);
  });

  itemRightSection.appendChild(itemAmountControl);
  itemRightSection.appendChild(itemPriceContainer);
  itemRightSection.appendChild(calculate_And_Return_Rating(rating));
  itemRightSection.appendChild(removeText);

  return itemRightSection;
}

function removeFromCartArray (e) {
    const productName = e.closest('.cart-item').querySelector("h4").innerText;
    const itemIndex = cartArray.findIndex(obj => obj.name === productName);
    cartArray.splice(itemIndex, 1);
}

function calculate_And_Return_Rating(rating) {
  const itemRatingContainer = document.createElement('div');
  itemRatingContainer.classList.add('rating');

  const checkedStars = Math.floor(rating);
  const halfStars = rating % 1 === 0.5;
  const emptyStars = 5 - Math.round(rating);

  for (let i = 0; i < checkedStars; i++) {
    const starSpanElement = document.createElement('span');
    starSpanElement.classList.add('fa', 'fa-star', 'checked');
    itemRatingContainer.appendChild(starSpanElement);
  }

  if (halfStars) {
    const halfStarSpanElement = document.createElement('span');
    halfStarSpanElement.classList.add('fa', 'fa-star-half-o');
    itemRatingContainer.appendChild(halfStarSpanElement);
  }

  for (let i = 0; i < emptyStars; i++) {
    const emptyStarSpanElement = document.createElement('span');
    emptyStarSpanElement.classList.add('fa', 'fa-star-half-o');
    itemRatingContainer.appendChild(emptyStarSpanElement);
  }
  return itemRatingContainer;
}
