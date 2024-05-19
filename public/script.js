onLoadCartNumbers();


 const body = document.body;
 body.addEventListener("click", closeToggler);

function closeToggler() {
    document.querySelector('.collapsedNavBar').classList.remove("show");
  }

function ready(){
    var removeCartItemButton = document.getElementsByClassName('removeBtn');
    
    for(let i = 0; i < removeCartItemButton.length; i++) {
        var button = removeCartItemButton[i];
        button.addEventListener('click', removeCartItem)
    }

    var increasequantityInputs = document.getElementsByClassName('increaseQuantity');
    for(let i = 0; i < increasequantityInputs.length; i++) {
       let input = increasequantityInputs[i];
       input.addEventListener('click', increaseItemQuantity);
    }

    var decreaseQuantityInputs = document.getElementsByClassName('decreaseQuantity');
    for(let i = 0; i < decreaseQuantityInputs.length; i++) {
       let input = decreaseQuantityInputs[i];
       input.addEventListener('click', decreaseItemQuantity);
    }

    

}

function totalCostSum() {
    var itemTotalCost = document.getElementsByClassName('total');
    //item
    var itemTotal = 0;
    for(let i = 0; i < itemTotalCost.length; i++) {
        let itemCost = itemTotalCost[i].innerText;
        itemCost = parseFloat(itemCost);
        itemTotal = itemTotal + itemCost;
    }
    localStorage.setItem('totalCost', itemTotal)
}
  
function removeCartItem(event) {
    var buttonClicked = event.target;
    var removedItem = buttonClicked.parentElement.parentElement;
    removedItem.remove();
    let tag = removedItem.getElementsByClassName('itemTag')[0].innerText;
    let itemTotal = removedItem.getElementsByClassName('total')[0].innerText;
    itemTotal = parseFloat(itemTotal);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let removedItemQuantity = removedItem.getElementsByClassName('itemQuantity')[0].innerText;
    removedItemQuantity = parseInt(removedItemQuantity);
    
    var totalCost = localStorage.getItem('totalCost');
    totalCost = parseFloat(totalCost);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    delete cartItems[tag];
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    totalCost = totalCost - itemTotal;
    localStorage.setItem('totalCost', totalCost);
    productNumbers = productNumbers - removedItemQuantity;
    localStorage.setItem('cartNumbers', productNumbers);
    if(  productNumbers || productNumbers==0) {
        document.querySelector('.shoppingCartBtn span').textContent = productNumbers;
        document.querySelector('.shoppingCartTitle span').textContent = productNumbers;
    }
    displayCart();
    totalCostSum();
}



function increaseItemQuantity(event) {
    var input = event.target;
    var increasedItem = input.parentElement.parentElement;
    var tag = increasedItem.getElementsByClassName('itemTag')[0].innerText;
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    Object.values(cartItems).map(item => {
        if(item.productTag == tag) {
            cartNumbers(item);
            totalCost(item);
            displayCart();
        }
    });
    
   

}

function decreaseItemQuantity(event) {
    let input = event.target;
    let decreasedItem = input.parentElement.parentElement;
    let decreasedItemQuantity = decreasedItem.getElementsByClassName('itemQuantity')[0].innerText;
    if(decreasedItemQuantity == 1) {
        decreasedItem.getElementsByClassName('itemQuantity')[0].setAttribute('disabled', '');
    }else {
        let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let tag = decreasedItem.getElementsByClassName('itemTag')[0].innerText;
    Object.values(cartItems).map(item => {
        if(item.productTag == tag) {
            item.inCart -= 1;
        }
    });
    cartItems = JSON.stringify(cartItems);
    localStorage.setItem('productsInCart', cartItems);
    let itemTotal = decreasedItem.getElementsByClassName('total')[0].innerText;
    itemTotal = parseFloat(itemTotal);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    
    decreasedItemQuantity = parseInt(decreasedItemQuantity);
    let totalCost = localStorage.getItem('totalCost');
    totalCost = parseFloat(totalCost);
    let price = decreasedItem.getElementsByClassName('itemPrice')[0].innerText;
    price = parseFloat(price);

    itemTotal = itemTotal - price;
    itemTotal = Math.round(itemTotal*100) / 100;
    decreasedItem.getElementsByClassName('total')[0].innerHTML = itemTotal + '$';

    decreasedItemQuantity = decreasedItemQuantity - 1;
    
    decreasedItem.getElementsByClassName('itemQuantity')[0].innerHTML = decreasedItemQuantity;
    productNumbers = productNumbers - 1;
    localStorage.setItem('cartNumbers', productNumbers);
    
    
    totalCost = totalCost - price;
    localStorage.setItem('totalCost', totalCost);
    document.getElementsByClassName('cartTotalCost')[0].innerHTML = totalCost + '$';
    if(  productNumbers ) {
        document.querySelector('.shoppingCartBtn span').textContent = productNumbers;
        document.querySelector('.shoppingCartTitle span').textContent = productNumbers;
    }
    }
    
    
}

document.querySelector('.shoppingCartBtn').addEventListener('click', openCart);

// Alert Box Display Success/Error
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search)
 
    if(urlParams.has('success')){
       alert('Message sent successfully')
    } else if(urlParams.has('error')){
       alert('There was an error in sending the message. Please give us a call 05500044')
    }
   }
 
 // Tabbed Menu
 function openMenu(event, menuName) {
   var i, x, tablinks;
   x = document.getElementsByClassName("menu");
   for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
   }
   
   tablinks = document.getElementsByClassName("tablink");
   for (i = 0; i < tablinks.length; i++) {  // This should be tablinks.length
      tablinks[i].classList.remove("active-tab");  // Using classList for better readability
   }
   
   document.getElementById(menuName).style.display = "block";
   event.currentTarget.classList.add("active-tab");  // Using classList for better readability
 }

 function openCart() {

   displayCart();

}

 
 //this code will let us add food the shopping cart
function Product(name, price, tag) {
    this.productName = name;
    this.productPrice = price;
    this.productTag = tag;
    this.inCart = 0;
} 

var addToCartButtons = document.getElementsByClassName('addToCart');
for(var i=0; i < addToCartButtons.length; i++) {
     var button = addToCartButtons[i];
     button.addEventListener('click', addToCartClicked)
}


function addToCartClicked(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('itemName')[0].innerText;
    let price = shopItem.getElementsByClassName('itemPrice')[0].innerText;
    let tag = shopItem.getElementsByClassName('itemTag')[0].innerText;
    let buttonClicked = new Product(title, price, tag);
    cartNumbers(buttonClicked);
    totalCost(buttonClicked);
   
}

//this function will update automatically the cart number each time the page is loaded so it does not return to 0 each time we refresh the page the cart number stays the same
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(  productNumbers ) {
        document.querySelector('.shoppingCartBtn span').textContent = productNumbers;
        document.querySelector('.shoppingCartTitle span').textContent = productNumbers;
    }
}

//this function will update the number of items added to the cart each time an addToCart button is clicked
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.shoppingCartBtn span').textContent = productNumbers + 1;
        document.querySelector('.shoppingCartTitle span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.shoppingCartBtn span').textContent = 1;
        document.querySelector('.shoppingCartTitle span').textContent = 1;
        
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if(cartItems[product.productTag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.productTag]: product
            }
        }
        cartItems[product.productTag].inCart += 1;
    }else {
        product.inCart = 1;
        cartItems = {
            [product.productTag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    let price = parseFloat(product.productPrice);
    
    if(cartCost != null) {
        cartCost = parseFloat(cartCost);
        price = parseFloat(price);
        total = cartCost + price;
        total = Math.round(total*100) / 100;

        localStorage.setItem('totalCost', total);
    } else {
        localStorage.setItem('totalCost', price);
    }    
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.addedFood');
    let shopCartFooter = document.querySelector('.cartFooter');
    let cartCost = localStorage.getItem('totalCost');

    if ( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        shopCartFooter.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <div class="foodRow">
                    <div class="product">
                         <i class="bi bi-trash3 removeBtn iconColor" ></i>
                        <h3 class="itemName">${item.productName}</h3>
                        <span class="d-none itemTag">${item.productTag}</span>
                    </div>
                    <div class="price itemPrice">${item.productPrice} $</div>
                    <div class="quantity d-flex justify-content-around">
                        <i class="bi bi-dash-lg decreaseQuantity iconColor" style="-webkit-text-stroke: 1px"></i>
                        <span class="itemQuantity">${item.inCart}</span>
                        <i class="bi bi-plus-lg increaseQuantity iconColor" style="-webkit-text-stroke: 1px"></i>
                    </div>
                    <div class="total">
                        ${item.inCart * item.productPrice} $
                    </div>
                </div>
            `
        });
        shopCartFooter.innerHTML += `
                <div class="subtotalSec fs-2">
                    <span>Subtotal:</span>
                    <span class="cartTotalCost">${cartCost} $</span>
                </div>
        `
    }

    ready();
}

 document.getElementById("mainLink").click(); // Auto-clicks the Pizza tab when the page loads
 