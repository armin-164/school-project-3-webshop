const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
const shoppingCart = document.querySelector('.shop-cart');
const cartArray = [];
const filterList = document.querySelector('select[name="filter-list"]');
const filterListCategories = document.querySelector('select[name="filter-category"]');

// This function will increase the price of all donuts that
// are visible in the DOM product list with 15% if conditions are met. Note that
// the product list in the DOM and the cart in the DOM are entirely different.
function priceIncreaseRule() {
  const allProductPrices = document.querySelectorAll('.product-price');

  const currentDate = new Date();
  const weekDay = currentDate.getDay();
  const hours = currentDate.getHours();

  if ( (weekDay === 5 && hours >= 15) || (weekDay === 6) || (weekDay === 0) || (weekDay === 0 && hours < 3) ) {
    allProductPrices.forEach((price) => {
      const currentPrice = parseInt(price.innerText, 10);
      price.innerText = Math.round((currentPrice * 1.15) * 100) / 100;
    });
  }
}

// Execute priceIncreaseRule when DOM content has loaded. 
document.addEventListener("DOMContentLoaded", priceIncreaseRule());

// This function will return a numerical rating depending
// on the classes that the elements (that is used as an arg) has.
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


// This function will sort an array alphabetically
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
};

// This function will retrieve all the already visible products
// on the DOM and make an object for each product with different 
// properties that will be pushed in an array. The properties of the objects
// will determine how the array is sorted and it will be reflected in the DOM
function filterProducts (filterValue) {
    const allProductsDOM = document.querySelectorAll('.product');
    const productList = document.querySelector('.product-list');
    const productsArray = [];

    // Retrieve all products in DOM, create an object for each and push into an array
    allProductsDOM.forEach((product) => {
        const ratings = product.querySelectorAll('.fa');

        const productObject = {
            element: product,
            name: product.querySelector('h3').innerText,
            rating: returnTotalRating(ratings),
            price: parseInt(product.querySelector('.product-price').innerText, 10,)
        }
        
        productsArray.push(productObject);

    })

    // If the select elements option value is filter-name,
    // clear all products and sort the array alphabetically
    // and append each item of the array to the product list
    if (filterValue === "filter-name") {
        productList.innerHTML = "";
        sortPropertyAlphabetically(productsArray);
        productsArray.forEach((obj) => {
            productList.appendChild(obj.element);
        })
    }

    // Same logic but sort the array by highest price first
    else if (filterValue === "filter-price-down") {
        productList.innerHTML = "";
        productsArray.sort((a, b) => b.price - a.price);
        
        productsArray.forEach((obj) => {
            productList.appendChild(obj.element);
        })
    }

    // Same logic but sort the array by lowest price first
    else if (filterValue === "filter-price-up") {
        productList.innerHTML = "";
        productsArray.sort((a, b) => a.price - b.price);
        
        productsArray.forEach((obj) => {
            productList.appendChild(obj.element);
        })
    }
    
    // Same logic but sort by highest rating first
    else if (filterValue === "filter-rating") {
        productList.innerHTML = "";
        productsArray.sort((a, b) => b.rating - a.rating);
        
        productsArray.forEach((obj) => {
            productList.appendChild(obj.element);
        })
    }
};

// This is an addeventlistener that will look for when
// the "select" elements options is changed
filterList.addEventListener('change', () => {
    filterProducts(filterList.value)
});

// This function is for the select element that has
// the option to filter by category. It will check
// for all products, if their dataset value is the same as
// the category that was chosen. If condition isn't met, 
// hide the products. And if it is met, make them visible.
function hideProducts(filterValue) {
  const allProductsDOM = document.querySelectorAll('.product');

  allProductsDOM.forEach((product) => {
      const category = product.querySelector('.product-category');

      if (filterValue !== category.dataset.value) {
          product.style.display = "none";
      }

      else {
          product.style.display = "block";
      }
  })
  
};

// Event listener that will listen for when select elements
// option has changed and use hideProducts function
filterListCategories.addEventListener('change', () => {
    hideProducts(filterListCategories.value);
});


// This function will look for the closest header to the event object.
// It will then loop through the cartArray to see if there is an object
// with the same name as the header and return true if it's found.
function isItemInArray(e) {
  const productName = e.closest('.product').querySelector('h3').innerText;
  
  for (let i = 0; i < cartArray.length; i++) {
      if (cartArray[i].name === productName) {
          return true;
      }
  }
  return false;
};

// This function will select all cart items and remove each one of them
function resetCart() {
  const allCartItems = document.querySelectorAll('.cart-item');
  allCartItems.forEach((item) => item.remove());
}

// This function will create a variable that will contain the closest product.
// It will create several other variables containing product information that will
// be used as property values for an object (cartItem). The cartItem will be pushed
// in the cartArray
function fetchItemInfo(e) {
  const product = e.closest('.product');
  const productImg = product.querySelector('img');
  const productName = product.querySelector('h3').innerText;
  const productPrice = Math.round(parseFloat(
    product.querySelector('.product-price').innerText,
    10,
  ) * 100 ) / 100 ;
  const productRating = product.querySelectorAll('.fa');
  const productCategory = product.querySelector('.product-category').innerText;

  const cartItem = {
    name: productName,
    img: productImg,
    price: productPrice,
    rating: returnTotalRating(productRating),
    category: productCategory,
    amount: 1,
  };

  
  cartArray.push(cartItem);
};

// This function will retrieve the DOM that represents the cart total
// and update it depending on the conditions that are checked.
function updateTotalPrice() {
  const cartSumDOM = document.querySelector('.cart-total-sum');
  let cartSum = 0;
  let totalDonuts = 0;
  let deliveryFee = 25;

  const currentDate = new Date();
  const weekDay = currentDate.getDay();
  const hours = currentDate.getHours();

  if (cartArray.length < 1) {
    cartSumDOM.innerText = 'Your Total is:';
  }

  else {

    // For each item, add the items price on the cartSum 
    // and add the items amount to totalDonuts
    cartArray.forEach((item) => {
      cartSum += item.price;
      totalDonuts += item.amount;
    });

    // If the amount of donuts is more than 15, set deliveryFee to 0
    if (totalDonuts > 15) {
      deliveryFee = 0;
    }

    // Else, add an additional 10% of the cartSum on the deliveryFee
    else {
      deliveryFee += Math.round(cartSum * 0.1);
    }

    // If it's monday and the hour is before 10
    if (weekDay === 1 && hours < 10) {
      cartSumDOM.innerText = `Monday special 10%: The prices are ${Math.round(cartSum * 0.9) * 100 / 100}kr + ${deliveryFee}kr in delivery fee. Total: ${Math.round((cartSum * 0.9) + deliveryFee)}`;
    }

    else {
      cartSumDOM.innerText = `The prices are ${cartSum}kr + ${deliveryFee}kr in delivery fee. Total: ${Math.round(cartSum + deliveryFee)}`;
    }

    // If the cartSum and deliveryFee combined, exceeds 800, remove
    // the second option (invoice) for payment
    if (cartSum + deliveryFee > 800) {
      const paymentSelector = document.querySelector(".payment-method");
      paymentSelector.removeChild(paymentSelector.options[2]);
    }

  }
};

// This function will manipulate DOM and the cart items when
// the increase or decrease amount is clicked.
function increaseOrDecrease(e, symbol, element) {

  // Create a few variables that will contain information from
  // the closest cart item to the event object.
  const cartItem = e.target.closest('.cart-item');
  const cartItemName = cartItem.querySelector('h4').innerText;
  const itemPriceDOM = e.target.closest('.item-right-section').querySelector('.item-total-price');
  let defaultProductPrice;

  const productsDOM = document.querySelectorAll('.product');

  // For each product in the DOM, see if the products name is the same
  // as the cartItems name. If so, retrieve the products price with two decimals and 
  // assign to defaultProductPrice
  productsDOM.forEach((product) => {
    const productName = product.querySelector("h3").innerText;
    if (productName === cartItemName) {
       defaultProductPrice = Math.round(parseFloat(product.querySelector('.product-price').innerText, 10) * 100) / 100;
    }
  });

  // For each item in cartArray
  cartArray.forEach((obj) => {

      // If cartItemName is the same as the objects name and the amount is
      // greater or equal to 1 and the symbol is a +.
      // Increase the amount by 1, assign the amount to the 
      // element value (the DOM element that shows the amount of this item)
      // and assign the defaultProductPrice multiplied by the object amount
      // to the objects price.
      if (cartItemName === obj.name && obj.amount >= 1 && symbol === "+") {
          obj.amount += 1;
          element.value = obj.amount;
          obj.price = defaultProductPrice * obj.amount;
      
          // If objects amount is equal or greather than 10, multiply the 
          // objects price (a 10% discount on that specific object/cartItem)
          if (obj.amount >= 10) {
            obj.price *= 0.9;
          }

          itemPriceDOM.innerText = `${obj.price}kr`;

      }

      // Same logic but will decrease the amount due to the - symbol and will only work
      // when the objects amount is equal or greater than 2.
      else if (cartItemName === obj.name && obj.amount >=2  && symbol === "-") {
          obj.amount -= 1;
          element.value = obj.amount;
          obj.price = defaultProductPrice * obj.amount;

          if (obj.amount >= 10) {
            obj.price *= 0.9;
          }
          
          itemPriceDOM.innerText = `${obj.price}kr`;
      }    
  })
};

// Fetch the closest cartItemName to the event object. Find the index of the cartArray by looking if
// the productName resembles the objects name and use the index to splice the item from the array.
function removeFromCartArray (e) {
  const productName = e.closest('.cart-item').querySelector("h4").innerText;
  const itemIndex = cartArray.findIndex(obj => obj.name === productName);
  cartArray.splice(itemIndex, 1);
};


// This function will take the numerical rating 
// and create the ratings DOM elements for the cartItem
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
};

// Create left section of the cartItem
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
};

// Create right section of the cartItem
function createItemRightSection(price, rating, amount) {
  const itemRightSection = document.createElement('div');
  itemRightSection.classList.add('item-right-section');

  const itemAmountControl = document.createElement('div');
  itemAmountControl.classList.add('item-amount-control');

  const reduceBtn = document.createElement('button');
  reduceBtn.innerText = '-';

  const itemAmountInput = document.createElement('input');
  itemAmountInput.type = 'number';
  itemAmountInput.readOnly = 'true';
  itemAmountInput.value = amount;

  const increaseBtn = document.createElement('button');
  increaseBtn.innerText = '+';

  itemAmountControl.appendChild(reduceBtn);
  itemAmountControl.appendChild(itemAmountInput);
  itemAmountControl.appendChild(increaseBtn);

  const itemPriceContainer = document.createElement('div');
  itemPriceContainer.classList.add('item-price');

  const itemPrice = document.createElement('span');
  itemPrice.classList.add('item-total-price');
  itemPrice.innerText = `${price}kr`;

  reduceBtn.addEventListener("click", (e) => {
    increaseOrDecrease(e, "-", itemAmountInput);
    updateTotalPrice();
  })

  increaseBtn.addEventListener("click", (e) => {
    increaseOrDecrease(e, "+", itemAmountInput);
    updateTotalPrice();
  });


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
};



// This will update cart in DOM
function updateCartDOM() {
  cartArray.forEach((obj) => {
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');

  cartItem.appendChild(
    createItemLeftSection(obj.img, obj.name, obj.category),
  );

  cartItem.appendChild(createItemRightSection(obj.price, obj.rating, obj.amount));

  updateTotalPrice();

  shoppingCart.appendChild(cartItem);
});
}

// For each addToCart button, add an
// eventlistener that will check if the products is already a cartItem in
// the cartArray and run a few functions if it's not in the cartArray
addToCartButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const isItemInCartArray = isItemInArray(btn);

    if (!isItemInCartArray) {
      resetCart();
      fetchItemInfo(btn);
      updateCartDOM();
    }
    
  });
});




const submitOrderBtn = document.querySelector('.submit-btn');
const resetOrderBtn = document.querySelector('.reset-btn');
const paymentSelector = document.querySelector(".payment-method");

// This function will validate input field depending on the arguments in the parameter
function validateInputField(negate, regex, input, msg ) {
    const doesInputMatchRegex = regex.test(input.value);

    // FOR THE IF STATEMENT A FEW LINES DOWN: Some of the regex that will be used, check for a valid input and some
    // of the regex check for a non valid input, therefore the use of the negate argument (true/false).

    // Example with two input fields. User name and user postal code:
    // For the user name I have a regex that will check if the name has symbols or numbers. Basically an invalid name.
    // But for the postal code I have a regex that checks for 5 numbers which is a valid postal code.
    // That's why there is a need for the negate argument. 
    // If I only used doesInputMatchRegex and !doesInputMatchRegex, it wouldn't work since the code would run regardless if it matched or not
    if ((negate && !doesInputMatchRegex) || (!negate && doesInputMatchRegex)) {
        input.setCustomValidity(msg);
    } else {
        input.setCustomValidity('');
    }
    
};

// This will remove the users payment info that they have filled in
function removePaymentInfo(element) {
  const allInputs = element.querySelectorAll('input');
  allInputs.forEach((input) => {
      input.value = "";
  })
};

// This function will make the inputs related to the selected payment method, visible.
function displayPaymentMethod(method) {
  const invoicePaymentDiv = document.querySelector('.payment-invoice');
  const cardPaymentDiv = document.querySelector('.payment-card');

  if (method === 'invoice') {
      removePaymentInfo(cardPaymentDiv);
      cardPaymentDiv.style.display = "none";
      invoicePaymentDiv.style.display = "flex";
  }
  else if (method === 'card') {
      removePaymentInfo(invoicePaymentDiv);
      invoicePaymentDiv.style.display = "none";
      cardPaymentDiv.style.display = "flex";
  }
};

paymentSelector.addEventListener('change', () => {
    displayPaymentMethod(paymentSelector.value);
});


// Add an eventlistener that will reset the cart in DOM, cartArray and update the total price.
resetOrderBtn.addEventListener("click", () => {
  resetCart();
  cartArray.splice(0, cartArray.length);  
  updateTotalPrice();
});

// This function will check if all necessary forms are filled out and then return true.
function formIsValid() {
  const formRows = document.querySelectorAll('.form-row[style*="display: flex"]');
  const checkbox = document.querySelector('input[type="checkbox"][required]');
  const selectPayment = document.querySelector('.payment-method');
  let empty = 0;


  formRows.forEach((row) => {
    const requiredInputs = row.querySelectorAll('input[type="text"][required]');

    requiredInputs.forEach((input) => {
      if (input.value === "") {
        empty += 1;
      }
    })

 
  })

  if (empty === 0 && checkbox.checked && selectPayment.selectedIndex !== 0 && cartArray.length >= 1) {
    return true;
  }
  
};

// This function will calculate the delivery time from the moment it has been used.
function calculateDeliveryTime() {
  const currentDate = new Date();
  const weekDay = currentDate.getDay();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  if (weekDay === 0 || weekDay === 6) {
    currentDate.setHours(currentDate.getHours() + 1);
    currentDate.setMinutes(currentDate.getMinutes() + 30);  
    return `Your order will be delivered at ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  }

  else if (hours < 8 || hours > 23) {
    currentDate.setMinutes(currentDate.getMinutes() + 45);  
    return `Your order will be delivered at ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  }

  else if ((hours >= 12 && minutes >= 1) || (hours <= 13 && minutes >= 1)) {
    return `Your order will be delivered at 15:00`;
  }

  else {
    currentDate.setMinutes(currentDate.getMinutes() + 30);  
    return `Your order will be delivered at ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  }
};

// This function will display the order confirmation in the DOM.
function displayOrderConfirmation (names, adress, postalCode, city, email, phone) {
  const sectionCheckout = document.querySelector('.section-checkout');


  if (!sectionCheckout.querySelector('.order-confirmation') && formIsValid()) {
    const orderConfirmationBox = document.createElement("div");
    orderConfirmationBox.classList.add('order-confirmation');

    const confirmationHeader = document.createElement("h5");
    confirmationHeader.innerText = 'Thank you for the order!'

    const orderedItemsContainer = document.createElement("div");
    orderedItemsContainer.classList.add("ordered-items");


    cartArray.forEach((item) => {
      const itemRow = document.createElement("div");
      itemRow.classList.add("confirmation-row");

      const itemName = document.createElement("span");
      itemName.innerText = item.name;

      const itemAmount = document.createElement("span");
      itemAmount.innerText = `x ${item.amount}`;

      const itemPrice = document.createElement("span");
      itemPrice.innerText = `${item.price}kr`

      itemRow.appendChild(itemName);
      itemRow.appendChild(itemAmount);
      itemRow.appendChild(itemPrice);
      orderedItemsContainer.appendChild(itemRow);
    })
    
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("user-delivery-info");

    const deliveryMessageParagraph = document.createElement("p");
    deliveryMessageParagraph.innerText = 'Delivery Information:'
    infoContainer.appendChild(deliveryMessageParagraph);

    const deliveryName = document.createElement("span");
    deliveryName.innerText = `${names[0].value} ${names[1].value}`;
    infoContainer.appendChild(deliveryName);

    const deliveryAdress = document.createElement("span");
    deliveryAdress.innerText = `${adress.value}, ${postalCode.value}, ${city.value}`;
    infoContainer.appendChild(deliveryAdress);

    const deliveryContactInfo = document.createElement("span");
    deliveryContactInfo.innerText = `${email.value}, ${phone.value}`;
    infoContainer.appendChild(deliveryContactInfo);

    const deliveryTimeContainer = document.createElement("div");
    deliveryTimeContainer.classList.add("order-delivery-time");

    const deliveryTime = document.createElement("span");
    deliveryTime.innerText = calculateDeliveryTime();
    deliveryTimeContainer.appendChild(deliveryTime);



    orderConfirmationBox.appendChild(confirmationHeader);
    orderConfirmationBox.appendChild(orderedItemsContainer);
    orderConfirmationBox.appendChild(infoContainer);
    orderConfirmationBox.appendChild(deliveryTimeContainer);
    sectionCheckout.appendChild(orderConfirmationBox);
    
  }
  else if (cartArray.length < 1) {
    alert("Please add the desired items to your cart")
  }

  else if (sectionCheckout.querySelector('.order-confirmation')) {
    alert("Please update your page!");
   }
};

// This function will validate each input field by using regex and give custom messages when conditions aren't met.
function validateOrderForm() {
    const hasNumbersOrSymbols = /[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const containsFiveNumbers = /^\d{5}$/;
    const validPhoneNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const containsSixteenNumbers = /^\d{16}$/;
    const isYearAndMonth = /^\d{4}\/\d{2}$/;
    const containsThreeNumbers = /^\d{3}$/;
    const isAnSSN = /^(\d{10}|\d{12})$/;



    const userFirstAndLastName = document.querySelectorAll('.user-name');
    userFirstAndLastName.forEach(name => validateInputField(false, hasNumbersOrSymbols, name, "Please exclude any numbers or symbols"));

    const userAdress = document.querySelector('.user-adress');

    const userPostalCode = document.querySelector('.user-postalcode');
    validateInputField(true, containsFiveNumbers, userPostalCode, "Invalid Postal Code");


    const userCity = document.querySelector('.user-city');
    validateInputField(false, hasNumbersOrSymbols, userCity, 'Please exclude any numbers/symbols');
    
    const userPhone = document.querySelector('.user-phone');
    validateInputField(true, validPhoneNumber, userPhone, 'Invalid Phone Number');

    const userEmail = document.querySelector('.user-email');

    const userCardNumber = document.querySelector('.user-card-number');
    const userCardExpiryDate = document.querySelector('.user-card-expiry-date');
    const userCardCvc = document.querySelector('.user-card-cvc');

    const userSSN = document.querySelector('.user-ssn');

    if (userCardNumber.value === "" && userCardExpiryDate.value === "" && userCardCvc.value === "") {
        validateInputField(true, isAnSSN, userSSN, 'Please write your SSN with 10 or 12 digits');
    }

    else if (userSSN.value === "") {
        validateInputField(true, containsSixteenNumbers, userCardNumber, 'Invalid Card Number')
        validateInputField(true, isYearAndMonth, userCardExpiryDate, 'Please write in this format: YYYY/MM');
        validateInputField(true, containsThreeNumbers, userCardCvc, 'Please write a three-digit CVC');
    }

    displayOrderConfirmation(userFirstAndLastName, userAdress, userPostalCode, userCity, userEmail, userPhone);
};

// An event listener that will validate each input in the form
submitOrderBtn.addEventListener("click", () => {
  validateOrderForm();
}); 

