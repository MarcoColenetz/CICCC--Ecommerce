let bagIcon = document.querySelector('#bag-icon');
let bag = document.querySelector('.bag');
let closebag = document.querySelector('#close-bag');

bagIcon.onclick = () => {
  bag.classList.add('active');
};

closebag.onclick = () => {
  bag.classList.remove('active');
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var removebagButtons = document.getElementsByClassName('bag-remove');
  console.log(removebagButtons);
  for (var i = 0; i < removebagButtons.length; i++) {
    var button = removebagButtons[i];
    button.addEventListener('click', removebagItem);
  }
  // trocar quantidade
  var quantityInputs = document.getElementsByClassName('bag-quantity');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
  var addbag = document.getElementsByClassName('add-bag');
  for (var i = 0; i < addbag.length; i++) {
    var button = addbag[i];
    button.addEventListener('click', addbagClicked);
  }
  //botao de checkout funcionando
  document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonClicked);

  document
    .getElementsByClassName('btn-clear')[0]
    .addEventListener('click', clearButtonClicked);
}
//botao de checkout
function buyButtonClicked() {
  alert('Your order is complete!');
  var bagContent = document.getElementsByClassName('bag-content')[0];
  while (bagContent.hasChildNodes()) {
    bagContent.removeChild(bagContent.firstChild);
  }
  updatetotal();
}

function clearButtonClicked() {
  var bagContent = document.getElementsByClassName('bag-content')[0];
  while (bagContent.hasChildNodes()) {
    bagContent.removeChild(bagContent.firstChild);
  }
  updatetotal();
}

//remove items from bag
function removebagItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

//adiciona no carrinho

function addbagClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText;
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
  addProductTobag(title, price, productImg);
  updatetotal();
}

function addProductTobag(title, price, productImg) {
  var bagShopBox = document.createElement('div');
  bagShopBox.classList.add('bag-box');
  var bagItems = document.getElementsByClassName('bag-content')[0];
  var bagItemsNames = bagItems.getElementsByClassName('bag-product-title');
  for (var i = 0; i < bagItemsNames.length; i++) {
    if (bagItemsNames[i].innerText == title) {
      alert('This item is already in your bag!');
      return;
    }
  }

  var bagBoxContent = `
                    <img src="${productImg}" alt="" class="bag-img">
                      <div class="detail-box">
                        <div class="bag-product-title">${title}</div>
                        <div class="bag-price">${[price]}</div>
                        <input type="number" value="1" class="bag-quantity">
                      </div>
                      <i class='bx bxs-trash-alt bag-remove' ></i>`;

  bagShopBox.innerHTML = bagBoxContent;
  bagItems.append(bagShopBox);
  bagShopBox
    .getElementsByClassName('bag-remove')[0]
    .addEventListener('click', removebagItem);
  bagShopBox
    .getElementsByClassName('bag-quantity')[0]
    .addEventListener('change', quantityChanged);
}
//update do preço total
function updatetotal() {
  var bagContent = document.getElementsByClassName('bag-content')[0];
  var bagBoxes = bagContent.getElementsByClassName('bag-box');
  var total = 0;
  var totalQuantity = 0;
  for (var i = 0; i < bagBoxes.length; i++) {
    var bagBox = bagBoxes[i];
    var priceElement = bagBox.getElementsByClassName('bag-price')[0];
    var quantityElement = bagBox.getElementsByClassName('bag-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;

    total = total + price * quantity;
    totalQuantity = totalQuantity + parseInt(quantity);
  }
  document.getElementsByClassName('total-price')[0].innerText = '$' + total;
  document.getElementsByClassName('total-items-quantity')[0].innerText =
    totalQuantity;
}
