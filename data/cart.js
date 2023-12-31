export let cart = JSON.parse(localStorage.getItem('cart')); 
if(!cart){
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];
} 

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function updateCartQuantity(className){
  let cartQuantity = 0;

  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(className).innerHTML = cartQuantity;
};

export function addToCart(productId){
  let matchingItem;
  const numSelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const selectedNumber = numSelector.value;
    
    cart.forEach((cartItem) =>{
      if (productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.quantity+= Number(selectedNumber);
    } else{
      cart.push({
        productId,
        quantity: Number(selectedNumber)
      });
    } saveToStorage();
};

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
  updateCartQuantity('.js-products-quantity');
};

export function updateQuantity(productId, newQuantity){
  let matchingItem;
  cart.forEach((cartItem) =>{
    if(cartItem.productId === productId){
      matchingItem = cartItem
    }
  });

  matchingItem.quantity = newQuantity;
  saveToStorage();
};