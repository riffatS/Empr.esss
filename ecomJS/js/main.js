let carts = document.querySelectorAll('.add-cart');

let products = [
  {
    name: 'understand',
    tag: '1',
    price: 12.00,
    incart: 0
  },
  {
    name: 'reinDeer',
    tag: '2',
    price: 11.00,
    incart: 0
  },
  {
    name: 'demoness',
    tag: '3',
    price: 13.00,
    incart: 0
  },
  {
    name: 'blindWedding',
    tag: '4',
    price: 12.00,
    incart: 0
  },
  {
    name: 'butterfly',
    tag: '5',
    price: 11.00,
    incart: 0
  },
  {
    name: 'kenKun',
    tag: '6',
    price: 18.00,
    incart: 0
  },
  {
    name: 'wolf',
    tag: '7',
    price: 10.00,
    incart: 0
  },
  {
    name: 'bluehead',
    tag: '8',
    price: 15.00,
    incart: 0
  },
  {
    name: 'thumbilina',
    tag: '9',
    price: 12.00,
    incart: 0
  },
  {
    name: 'naruto',
    tag: '10',
    price: 12.00,
    incart: 0
  },
  {
    name: 'kakashi',
    tag: '11',
    price: 14.00,
    incart: 0
  },
  {
    name: 'foam',
    tag: '12',
    price: 12.00,
    incart: 0
  },

];
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    //function to add products and total 
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}
function onLoadCartCheck() {
  //called wen page is loaded 
  let productNO = localStorage.getItem('cartNumbers');
  if (productNO) {
    document.querySelector('.cart span').textContent = productNO;
  }
}
function cartNumbers(prod) {
  console.log('the product clicked is', prod);
  let productNO = localStorage.getItem('cartNumbers');

  productNO = parseInt(productNO);
  if (productNO) {
    localStorage.setItem('cartNumbers', productNO + 1);
    document.querySelector('.cart span').textContent = productNO + 1;

  }
  else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }
  setItem(prod);
}
function setItem(prod) {

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);



  if (cartItems != null) {

    if (cartItems[prod.tag] == undefined)
     {
       //... for parameters 
      cartItems = {
        ...cartItems, [prod.tag]: prod
      }
      
    }
    cartItems[prod.tag].incart += 1;
  }
  else {
    prod.incart = 1;
    cartItems = {
      [prod.tag]: prod
    }
  }
  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}
function totalCost(product){
 
  let cartCost=localStorage.getItem("totalCost");
  
  console.log("cart cost is ",cartCost);
 
  if(cartCost!=null)
  {
    cartCost=parseInt(cartCost);
    localStorage.setItem("totalCost", product.price+cartCost);
  }
  else{
    localStorage.setItem("totalCost", product.price);
  }

  
}
function removeHTML(){

  let CartItemToRemove=document.getElementsByClassName("remove");
  console.log(CartItemToRemove);
  for(var i=0;i<CartItemToRemove.length;i++)
  {
    var button=CartItemToRemove[i]
    button.addEventListener('click', function(event){
      var clicked=event.target;
    //  clicked.remove();
      clicked.parentElement.parentElement.remove();
      var c=document.querySelector('.cart span').textContent;
      // let cartItems = localStorage.getItem('productsInCart');
      // console.log("***************"+cartItems);

    })
  }
  
}
remove = (itemId) => {
  removeHTML();
  let trackItems=JSON.parse(localStorage.getItem("productsInCart"));
  let temp=trackItems;
  let numCarts=parseInt(localStorage.getItem("cartNumbers"));
  Object.values(trackItems).map((item,index)=>{
    // console.log(itemId)
    if(item.tag==itemId)
    {
      let price=parseInt(localStorage.getItem("totalCost"))
      delete temp[item.tag];
      localStorage.setItem("productsInCart",JSON.stringify(temp));
      localStorage.setItem("cartNumbers",--(numCarts));
      localStorage.setItem("totalCost",price-item.price);
    }
  });
 
}


increase = (itemId) => {

  let trackItems=JSON.parse(localStorage.getItem("productsInCart"));
  let temp=trackItems;
  let numCarts=parseInt(localStorage.getItem("cartNumbers"));
  Object.values(trackItems).map((item,index)=>{
    if(item.tag==itemId)
    {
      let price=parseInt(localStorage.getItem("totalCost"))
      item.incart++
      // localStorage.setItem("cartNumbers",--(numCarts));
      localStorage.setItem("totalCost",price+item.price);
    }
  });
  localStorage.setItem("productsInCart",JSON.stringify(trackItems));
}

decrease = (itemId) => {

  let trackItems=JSON.parse(localStorage.getItem("productsInCart"));
  let temp=trackItems;
  let numCarts=parseInt(localStorage.getItem("cartNumbers"));
  let removable=false;
  Object.values(trackItems).map((item,index)=>{
    if(item.tag==itemId)
    {
      let price=parseInt(localStorage.getItem("totalCost"))
      // item.incart<=1?item.incart--:alert("At least one item should be present.");
      if(item.incart<=1)
        alert("At least on item should be present")
      else 
      {
        item.incart--;
        // localStorage.setItem("cartNumbers",--(numCarts));
        localStorage.setItem("totalCost",price-item.price);
        removable=true;
      }
    }
  });
  if (removable)
    localStorage.setItem("productsInCart",JSON.stringify(trackItems));

}
function displayCart(){
  let cartItems=localStorage.getItem("productsInCart");
  cartItems=JSON.parse(cartItems);
  let productContainer=document.querySelector(".products");
  if(cartItems && productContainer)
  {
    productContainer.innerHTML='';
    Object.values(cartItems).map(item =>   {
      productContainer.innerHTML+= `  
      <div class="products">
      <div>
      <div><ion-icon name="close-circle-outline" id="rem" class="remove" onclick=remove(${item.tag})></ion-icon>
      <img class="image" src="images/${item.tag}.png" width="150px"></img><span>${item.name}</span></div>
      
      <div class="price">${item.price}.00</div>
       
      <ion-icon name="caret-back-outline" onclick=decrease(${item.tag})></ion-icon> ${item.incart}
      <ion-icon name="caret-forward-outline" onclick=increase(${item.tag})></ion-icon>
      
      <div>${item.price* item.incart} </div>
      </div>
      </div>
      
      `
    }); 
    
  }
  console.log(cartItems);
}
onLoadCartCheck();
displayCart();