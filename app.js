"use strict";
class cardItem {
  constructor(name, imagePath, price, category, id) {
    this.name = name;
    this.imagePath = imagePath;
    this.price = price;
    this.category = category;
  }
}

let items = [
  new cardItem('Sweet Item', "https://js-beginners.github.io/filter-project/img/sweets-1.jpeg", 5, "sweet"),
  new cardItem('Cupcake Item', "https://js-beginners.github.io/filter-project/img/cupcake-1.jpeg", 5, "cupcake"),
  new cardItem('Cake Item', "https://js-beginners.github.io/filter-project/img/cake-1.jpeg", 5, "cakes"),
  new cardItem('Dougnut Item', "https://js-beginners.github.io/filter-project/img/doughnut-1.jpeg", 5, "doughnuts"),
  new cardItem('Sweet Item', "https://js-beginners.github.io/filter-project/img/sweets-2.jpeg", 5, "sweet"),
  new cardItem('Cupcake Item', "https://js-beginners.github.io/filter-project/img/cupcake-2.jpeg", 5, "cupcake"),
  new cardItem('Cake Item', "https://js-beginners.github.io/filter-project/img/cake-2.jpeg", 5, "cakes"),
  new cardItem('Dougnut Item', "https://js-beginners.github.io/filter-project/img/doughnut-2.jpeg", 5, "doughnuts"),
  new cardItem('Sweet Item', "https://js-beginners.github.io/filter-project/img/sweets-3.jpeg", 5, "sweet"),
  new cardItem('Cupcake Item', "https://js-beginners.github.io/filter-project/img/cupcake-3.jpeg", 5, "cupcake"),
  new cardItem('Cake Item', "https://js-beginners.github.io/filter-project/img/cake-3.jpeg", 5, "cakes")
];

let finalArr = [...items];
let checkoutArr = [];
let checkoutArrDOM = [];
let itemsContainer = document.querySelector(".items");
let cardContainer, cardImg, cardPrice, cardName, addToCartContainer, addtoCartIcon, cardDetailsContainer;
let cartListItem, cartListItemName, cartListItemPrice, cartListItemImage, cartListItemRemove, cartListItemRemoveIcon, namePriceContainer;
let categoriesForm = document.getElementById("categories-form");
let categoriesDiv = document.querySelector(".categories");
let categoriesDivChildren = categoriesDiv.children;
let itemsDivChildren = itemsContainer.children;
let cartItemsList = document.getElementById("cart-items");
let cartItemsListChildren = cartItemsList.children;
let cartTriggerBTN = document.getElementById("cart-items-price");
let totalPrice = document.querySelector(".total");
let claerCartButton = document.getElementById("clear-cart");
let cartRemoveSpan;
let cartContainer = document.querySelector(".hidden-cart-container");
let menuToggler = document.querySelector(".menu-toggle");
let cartTotalItemsPrice = document.querySelector(".cart-items-price");
cartTriggerBTN.innerHTML = "0 items $ 0.00";
let totalPriceValue = 0;
totalPrice.innerHTML = "$ 0.00";
renderItems(finalArr);

categoriesForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  finalArr = [];
  finalArr = await items.filter(element => {
    if (element.name.toLowerCase().includes(e.target.searchItem.value.toLowerCase()))
      return true;
  });
  renderItems(finalArr);
});
let firsLoad = true;
menuToggler.addEventListener("click", function () {
  let mainMenuContainer = document.querySelector(".main-menu-container");
  mainMenuContainer.classList.toggle("show-links-menu");
  if (!firsLoad)
    mainMenuContainer.classList.toggle("hide-links-menu");
  firsLoad = false;
});

let flag = false;
cartTriggerBTN.addEventListener("click", function (e) {
  if (!flag) {
    cartContainer.classList.remove("flipped-container");
    cartContainer.className += " shown-cart-container";
    cartContainer.classList.remove("test");
  }
  else {
    cartContainer.classList.remove("shown-cart-container");
    cartContainer.className += " flipped-container";
  }
  flag = !flag;
});

claerCartButton.addEventListener("click", function () {
  cartItemsList.innerHTML = "";
  checkoutArr = [];
  checkoutArrDOM = [];
  totalPriceValue = 0;
  totalPrice.innerHTML = "$ 0.00";
  cartTriggerBTN.innerHTML = "0 items $ 0.00";
})

for (let i = 0; i < categoriesDivChildren.length; i++) {
  categoriesDivChildren[i].addEventListener("click", function () {
    if (categoriesDivChildren[i].id != "all") {
      console.log(categoriesDivChildren[i].id);
      for (let j = 0; j < items.length; j++) {
        if (j == 0) finalArr = [];
        if (categoriesDivChildren[i].id == items[j].category)
          finalArr.push(items[j]);
      }
      itemsContainer.innerHTML = "";
      renderItems(finalArr);
    }
    else {
      renderItems(items);
    }

  });
}

for (let i = 0; i < itemsDivChildren.length; i++) {
  itemsDivChildren[i].children[2].addEventListener("click", () => {
    checkoutArr.push({
      ItemName: itemsDivChildren[i].children[1].children[0].innerHTML,
      itemPrice: itemsDivChildren[i].children[1].children[1].innerHTML,
      ItemImageURL: itemsDivChildren[i].children[0].src
    });
    cartItemsList.innerHTML = "";
    for (let i = 0; i < checkoutArr.length; i++) {
      if (i == 0) {
        checkoutArrDOM = [];
        totalPriceValue = 0;
      }
      totalPriceValue += parseInt(checkoutArr[i].itemPrice.split(" ")[1]);
      checkoutArrDOM.push(renderCartItems(checkoutArr[i], i));
    }
    totalPrice.innerHTML = "$ " + totalPriceValue;
    cartTriggerBTN.innerHTML = `${checkoutArr.length} items $ ${totalPriceValue}.00`;
  })
}

function renderItems(arr) {
  itemsContainer.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    cardContainer = document.createElement("div");
    cardDetailsContainer = document.createElement("div");
    cardImg = document.createElement("img");
    cardPrice = document.createElement("p");
    cardName = document.createElement("p");
    addToCartContainer = document.createElement("span");
    addtoCartIcon = document.createElement("i");
    cardImg.src = arr[i].imagePath;
    cardPrice.innerHTML = "$ " + arr[i].price;
    cardName.innerHTML = arr[i].name;
    addtoCartIcon.setAttribute("class", "fas fa-shopping-cart");
    addToCartContainer.setAttribute("class", "add-to-cart");
    cardDetailsContainer.setAttribute("class", "card-details-container");
    cardContainer.append(cardImg);
    cardDetailsContainer.append(cardName);
    cardDetailsContainer.append(cardPrice);
    cardContainer.append(cardDetailsContainer);
    addToCartContainer.append(addtoCartIcon);
    cardContainer.append(addToCartContainer);
    itemsContainer.append(cardContainer);
  }
}

function renderCartItems(cartItem, index) {
  cartListItem = document.createElement("li");
  cartListItemName = document.createElement("p");
  cartListItemPrice = document.createElement("p");
  cartListItemImage = document.createElement("img");
  cartListItemRemove = document.createElement("span");
  cartListItemRemoveIcon = document.createElement("i");
  namePriceContainer = document.createElement("div");

  cartListItemImage.setAttribute("src", cartItem.ItemImageURL); // check for the Variable name imagePath
  cartListItemRemoveIcon.setAttribute("class", "fas fa-trash");
  cartListItem.setAttribute("id", index);

  cartListItemName.innerHTML = cartItem.ItemName;
  cartListItemPrice.innerHTML = cartItem.itemPrice;
  namePriceContainer.append(cartListItemName);
  namePriceContainer.append(cartListItemPrice);
  cartListItemRemove.append(cartListItemRemoveIcon);
  cartListItem.append(cartListItemImage);
  cartListItem.append(namePriceContainer);
  cartListItem.append(cartListItemRemove);
  cartItemsList.append(cartListItem);
  // refactor this code
  cartRemoveSpan = cartListItem.children[2];
  cartRemoveSpan.addEventListener("click", () => {
    checkoutArr.splice(index, 1);
    cartItemsList.innerHTML = "";
    for (let i = 0; i < checkoutArr.length; i++) {
      renderCartItems(checkoutArr[i], i);

    }
  })


  return cartItemsList;
}

