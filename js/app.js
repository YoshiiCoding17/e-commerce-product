"use strict";
//Global Variables
const image = document.querySelector(".product__image");
let isGalleryActive = false;
let index = 1;
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
const productsDiv = document.querySelector(".cart");
//APP
document.addEventListener("DOMContentLoaded", () => {
    hambugerNavigation();
    slider();
    setAmount();
    thumbnailActive();
    lightBox();
    addProduct();
    showCart();
});
function hambugerNavigation() {
    const navegation = document.getElementById("navegation");
    const open = document.getElementById("menu");
    const close = document.getElementById("close");
    open === null || open === void 0 ? void 0 : open.addEventListener("click", () => {
        navegation.classList.add("active");
    });
    close === null || close === void 0 ? void 0 : close.addEventListener("click", () => {
        navegation.classList.remove("active");
    });
}
function slider() {
    var _a, _b;
    const arrows = isGalleryActive ? document.querySelectorAll(".arrow--lightbox") : document.querySelectorAll(".arrow--normal");
    const thumbnails = isGalleryActive ? document.querySelectorAll(".lightbox__thumbnail") : document.querySelectorAll(".product__thumbnail");
    const parentDiv = (_b = (_a = thumbnails[0]) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
    thumbnails[index - 1];
    arrows.forEach(e => {
        e.addEventListener("click", ({ target }) => {
            var _a, _b;
            const element = target;
            console.log(index);
            if (element.classList.contains("arrow--previous") || ((_a = element.getAttribute("alt")) === null || _a === void 0 ? void 0 : _a.includes("previous"))) {
                index == 1 ? index = 4 : index--;
            }
            else {
                index == 4 ? index = 1 : index++;
            }
            isGalleryActive ? document.querySelector(".lightbox__image").src = `images/image-product-${index}.jpg` : image.src = `images/image-product-${index}.jpg`;
            (_b = parentDiv === null || parentDiv === void 0 ? void 0 : parentDiv.querySelector(".active-image")) === null || _b === void 0 ? void 0 : _b.classList.remove("active-image");
            thumbnails[index - 1].classList.add("active-image");
        });
    });
}
function setAmount() {
    const minus = document.getElementById("minus");
    const plus = document.getElementById("plus");
    const amount = document.getElementById("amount");
    minus === null || minus === void 0 ? void 0 : minus.addEventListener("click", () => {
        const value = Number(amount.value) - 1;
        value >= 0 ? amount.value = value + "" : null;
    });
    plus === null || plus === void 0 ? void 0 : plus.addEventListener("click", () => {
        const value = Number(amount.value) + 1;
        amount.value = value + "";
    });
}
function thumbnailActive() {
    var _a, _b, _c;
    const numberImage = Number((_a = image === null || image === void 0 ? void 0 : image.src.slice(43).match(/[0-9]/g)) === null || _a === void 0 ? void 0 : _a.join(""));
    const thumbnails = isGalleryActive ? document.querySelectorAll(".lightbox__thumbnail") : document.querySelectorAll(".product__thumbnail");
    const parentDiv = (_c = (_b = thumbnails[0]) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement;
    thumbnails[numberImage - 1].classList.add("active-image");
    thumbnails.forEach(e => {
        e.addEventListener("click", ({ target }) => {
            var _a, _b;
            const element = target;
            const numberThumbnail = (_a = element.src.slice(43).match(/[0-9]/g)) === null || _a === void 0 ? void 0 : _a.join("");
            index = Number(numberThumbnail);
            isGalleryActive ? document.querySelector(".lightbox__image").src = `images/image-product-${numberThumbnail}.jpg` : image.src = `images/image-product-${numberThumbnail}.jpg`;
            (_b = parentDiv === null || parentDiv === void 0 ? void 0 : parentDiv.querySelector(".active-image")) === null || _b === void 0 ? void 0 : _b.classList.remove("active-image");
            element.classList.add("active-image");
        });
    });
}
function closeLightbox() {
    const close = document.getElementById("close-lightbox");
    close === null || close === void 0 ? void 0 : close.addEventListener("click", () => {
        document.body.removeChild(document.querySelector(".lightbox"));
        isGalleryActive = false;
    });
}
function lightBox() {
    image === null || image === void 0 ? void 0 : image.addEventListener("click", () => {
        isGalleryActive = true;
        const lightBox = document.createElement("div");
        lightBox.classList.add("lightbox");
        lightBox.innerHTML = `
        <section class="product__slider">
            <div class="product__image-div">
                <div id="close-lightbox" class="close">
                    <img src="images/icon-close.svg" alt="close">
                </div>
                <div class="arrow--lightbox arrow arrow--previous">
                    <img id="lightbox-image" class="arrow__image" src="images/icon-previous.svg" alt="arrow previous">
                </div>
                <img  src=${image.src} alt="product" class="lightbox__image">
                <div class="arrow--lightbox arrow arrow--next">
                    <img class="arrow__image" src="images/icon-next.svg" alt="arrow next">
                </div>
            </div>
            <div class="product__thumbnails">
                <div class="product__thumbnail-div">
                    <img class="lightbox__thumbnail product__thumbnail" src="images/image-product-1-thumbnail.jpg" alt="thumbnail">
                </div>

                <div class="product__thumbnail-div">
                    <img class="lightbox__thumbnail product__thumbnail" src="images/image-product-2-thumbnail.jpg" alt="thumbnail">
                </div>

                <div class="product__thumbnail-div">
                    <img class="lightbox__thumbnail product__thumbnail" src="images/image-product-3-thumbnail.jpg" alt="thumbnail">
                </div>

                <div class="product__thumbnail-div">
                    <img class="lightbox__thumbnail product__thumbnail" src="images/image-product-4-thumbnail.jpg" alt="thumbnail">
                </div>
            </div>
        </section>
        `;
        document.body.appendChild(lightBox);
        galleryActive();
    });
}
function galleryActive() {
    slider();
    thumbnailActive();
    closeLightbox();
}
function showCart() {
    const btnCart = document.getElementById("cart");
    btnCart.onclick = () => {
        printCart();
    };
}
function addProduct() {
    const addProductBtn = document.getElementById("buy");
    addProductBtn === null || addProductBtn === void 0 ? void 0 : addProductBtn.addEventListener("click", ({ target }) => {
        var _a, _b;
        const amount = document.getElementById("amount");
        const name = (_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.textContent;
        const price = Number((_b = document.querySelector("#price span")) === null || _b === void 0 ? void 0 : _b.textContent);
        const id = target.dataset.id || "1";
        const validateExist = cart.find(obj => obj.id == id);
        if (validateExist) {
            validateExist.amount += Number(amount.value);
            printCart();
            return;
        }
        const product = {
            id,
            name,
            price,
            amount: Number(amount.value),
            img: image === null || image === void 0 ? void 0 : image.src,
        };
        cart.push(product);
        printCart();
    });
}
function deleteProduct() {
    const btnDelete = document.querySelector(".product--cart__delete");
    btnDelete === null || btnDelete === void 0 ? void 0 : btnDelete.addEventListener("click", ({ target }) => {
        const elementId = target.dataset.id;
        cart = cart.filter(e => e.id !== elementId);
        printCart();
    });
}
function printCart() {
    const products = document.querySelector(".cart__products");
    if (cart.length == 0) {
        const p = document.createElement("p");
        p.textContent = "Your cart is empty";
        p.classList.add("cart__empty");
        if (products === null || products === void 0 ? void 0 : products.firstChild) {
            products.innerHTML = "";
        }
        products === null || products === void 0 ? void 0 : products.appendChild(p);
        productsDiv === null || productsDiv === void 0 ? void 0 : productsDiv.classList.toggle("active-cart");
        return;
    }
    products.innerHTML = "";
    cart.forEach(({ id, name, img, price, amount }) => {
        console.log(price);
        const div = document.createElement("div");
        div.classList.add("product--cart");
        div.innerHTML = `
                <img class="product--cart__image" src="${img}" alt="product">
                    <div class="product--cart__details">
                        <p class="product--cart__name">${name}</p>
                        <p class="product--cart__price">$${price.toFixed(2)} x ${amount}<span class="product--cart__price-span">$${(price * amount).toFixed(2)}</span></p>
                    </div>
                <img class="product--cart__delete" src="images/icon-delete.svg" data-id="${id}" alt="delete">
            `;
        products === null || products === void 0 ? void 0 : products.appendChild(div);
    });
    localStorage.setItem("cart", JSON.stringify(cart, null, 2));
    productsDiv === null || productsDiv === void 0 ? void 0 : productsDiv.classList.toggle("active-cart");
    deleteProduct();
}
//# sourceMappingURL=app.js.map