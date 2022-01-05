import { products } from "./products.js";

// product abject
class abjProducts{
    constructor(product){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.imageUrl;
        this.cartBool = false;
        this.cartNum = 0;
    }
}

// get and set products
const myProducts = [];
const containerProducts = document.querySelector(".products");

products.forEach(item => {
    let product = new abjProducts(item);
    myProducts.push(product);

    const newDiv = document.createElement("article");
    newDiv.innerHTML = `<div class="product-img"><img src="${item.imageUrl}" alt="${item.title}"></div>
    <div class="product-title"><h3>${item.title}</h3><h3>${item.price} $</h3></div>
    <div class="add-cart"><div class="add-cart-btn" data-id="${item.id - 1}">add to cart</div></div>`;
    containerProducts.appendChild(newDiv);
})

// add cart
const addCartBtn = document.querySelectorAll(".add-cart-btn")
addCartBtn.forEach(item => {
    item.addEventListener("click", () => {
        let productSelect = Number(item.getAttribute("data-id"));
        myProducts[productSelect].cartBool = true;
        myProducts[productSelect].cartNum ++;
        addCartF();
    })
})

function addCartF(){
    let cartContainer = document.querySelector(".cart-container");
    cartContainer.innerHTML = "";
    let cartNum = 0;
    let cartTotal = 0;
    myProducts.forEach(item => { 
        if (item.cartNum == 0){
            item.cartBool = false;
        }

        if (item.cartBool){
            cartContainer.innerHTML += `<article>
            <div class="product-img">
                <img src="${item.img}" alt="${item.title}">
            </div>

            <div class="name-price">
                <h3 class="name-cart">${item.title}</h3>
                <div class="price-cart">$ ${item.price}</div>
            </div>

            <div class="cart-num">
                <i class="fas fa-chevron-up" id="top" data-id="${item.id - 1}"></i>
                <p id="num">${item.cartNum}</p>
                <i class="fas fa-chevron-down" id="bottom" data-id="${item.id - 1}"></i>
            </div>

            <div class="cart-delete" data-id="${item.id - 1}">
                <i class="fas fa-trash"></i>
            </div>
            </article>`
            cartNum += item.cartNum;
            cartTotal += (item.cartNum * item.price);

            // add cart action function
            cartAction();
        }
    })

    document.querySelector("#cart-num").innerHTML = cartNum;
    document.querySelector("#total").innerHTML = `${cartTotal.toFixed(2)} $`;
}

function cartAction() {
    //delete
    const delBtn = document.querySelectorAll(".cart-delete");
    delBtn.forEach(item => {
        item.addEventListener("click", () => {
            let productSelect = Number(item.getAttribute("data-id"));
            myProducts[productSelect].cartBool = false;
            myProducts[productSelect].cartNum = 0;
            addCartF();
        })
    })

    //top and bottom
    const topBottomBtn = document.querySelectorAll(".cart-num > i");
    topBottomBtn.forEach(item => {
        let productSelect = Number(item.getAttribute("data-id"));
        item.addEventListener("click", () => {
            if (item.id == "top"){
                myProducts[productSelect].cartNum ++;
            } else {
                myProducts[productSelect].cartNum --;
            }
            addCartF();
        })
    })
}

// show and close cart
const cart = document.querySelector(".cart");
const bodyBack = document.querySelector(".body-background");

function cartF(input = "show"){
    if (input == "show"){
        cart.classList.add("active");
        bodyBack.classList.remove("hidden");
    } else {
        cart.classList.remove("active");
        bodyBack.classList.add("hidden");
    }
}

document.querySelector(".header-cart-icon").addEventListener("click", () => cartF());
document.querySelector(".cart-header > p").addEventListener("click", () => cartF("close"));
bodyBack.addEventListener("click", () => cartF("close"));