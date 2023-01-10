
//Global Variables
const image:HTMLImageElement|null = document.querySelector(".product__image");
let isGalleryActive:boolean = false;
let index:number = 1;
let cart:carrito[] = JSON.parse(localStorage.getItem("cart") || "[]");
const productsDiv = document.querySelector(".cart");
//Types
type carrito = {
    id:string;
    name:string|null|undefined;
    price:number;
    amount:number;
    img:string|undefined;
}

//APP
document.addEventListener("DOMContentLoaded",():void =>{

    hambugerNavigation();

    slider();

    setAmount();

    thumbnailActive();

    lightBox();

    addProduct();

    showCart();
});
function hambugerNavigation():void{
    const navegation = document.getElementById("navegation");
    const open = document.getElementById("menu");
    const close = document.getElementById("close");
    open?.addEventListener("click",():void =>{
        navegation!.classList.add("active");
    })
    close?.addEventListener("click" ,():void=>{
        navegation!.classList.remove("active");
    })
}
function slider():void{
    const arrows = isGalleryActive ? document.querySelectorAll(".arrow--lightbox") : document.querySelectorAll(".arrow--normal");
    const thumbnails= isGalleryActive ? document.querySelectorAll(".lightbox__thumbnail") : document.querySelectorAll(".product__thumbnail");
    const parentDiv = thumbnails[0]?.parentElement?.parentElement;
    thumbnails[index - 1];
    arrows.forEach( e =>{
        e.addEventListener("click",({target}):void =>{
            const element = target as HTMLElement;
            console.log(index);
            if(element.classList.contains("arrow--previous") || element.getAttribute("alt")?.includes("previous")){
                index == 1 ? index = 4 : index--;
            }else{
                index == 4 ? index = 1 : index++;
            }
            isGalleryActive ? (document.querySelector(".lightbox__image") as HTMLImageElement)!.src = `images/image-product-${index}.jpg` : image!.src =`images/image-product-${index}.jpg`;
            parentDiv?.querySelector(".active-image")?.classList.remove("active-image");
            thumbnails[index - 1].classList.add("active-image");
        })
    })
}

function setAmount():void{
    const minus = document.getElementById("minus");
    const plus = document.getElementById("plus");
    const amount = document.getElementById("amount");
    minus?.addEventListener("click", () =>{
        const value:number = Number((amount as HTMLInputElement).value) - 1;
        value >= 0 ? (amount as HTMLInputElement).value = value + "" : null;
    });
    
    plus?.addEventListener("click",() =>{
        const value:number = Number((amount as HTMLInputElement).value) + 1;
        (amount as HTMLInputElement).value = value + "";
    })
}

function thumbnailActive():void{
    const numberImage:number|undefined = Number(image?.src.slice(43,).match(/[0-9]/g)?.join(""));
    const thumbnails = isGalleryActive ? document.querySelectorAll(".lightbox__thumbnail") :document.querySelectorAll(".product__thumbnail");
    const parentDiv = thumbnails[0]?.parentElement?.parentElement;
    thumbnails[numberImage - 1].classList.add("active-image");

    thumbnails.forEach(e => {
        e.addEventListener("click",({target}) =>{
            const element:HTMLImageElement = (target as HTMLImageElement);

            const numberThumbnail:string|undefined = element!.src.slice(43,).match(/[0-9]/g)?.join("");

            index = Number(numberThumbnail);

            isGalleryActive ? (document.querySelector(".lightbox__image") as HTMLImageElement)!.src = `images/image-product-${numberThumbnail}.jpg` : image!.src =`images/image-product-${numberThumbnail}.jpg`;

            parentDiv?.querySelector(".active-image")?.classList.remove("active-image");

            element.classList.add("active-image");
        })
    })
}
function closeLightbox():void{
    const close = document.getElementById("close-lightbox");
    close?.addEventListener("click",() =>{
        document.body.removeChild(document.querySelector(".lightbox") as Node)
        isGalleryActive = false;
    })
}
function lightBox():void{
        image?.addEventListener("click",() =>{
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
    })
}
function galleryActive():void{
    slider();
    thumbnailActive();
    closeLightbox();
}
function showCart():void{
    const btnCart = document.getElementById("cart");
    btnCart!.onclick = () =>{
        printCart();
    }
}
function addProduct():void{ 
    const addProductBtn = document.getElementById("buy");
    addProductBtn?.addEventListener("click", ({target}):void =>{
        const amount = document.getElementById("amount");
        const name = document.getElementById("name")?.textContent;
        const price = Number(document.querySelector("#price span")?.textContent);
        const id:string = (target as HTMLElement).dataset.id || "1";
        const validateExist = cart.find(obj => obj.id == id);
        if(validateExist){
            validateExist.amount += Number((amount as HTMLInputElement).value);
            printCart();
            return;
        }
        const product:carrito = {
            id,
            name,
            price,
            amount : Number((amount as HTMLInputElement).value),
            img:image?.src,
        }
        cart.push(product);
        printCart();
    })
}
function deleteProduct():void{
    const btnDelete = document.querySelector(".product--cart__delete");
    btnDelete?.addEventListener("click",({target}) =>{
        const elementId = (target as HTMLElement).dataset.id;
        cart = cart.filter(e => e.id !== elementId);
        printCart();
    });
}
function printCart():void{
        const products = document.querySelector(".cart__products");
        if(cart.length == 0){
            const p = document.createElement("p");
            p.textContent = "Your cart is empty";
            p.classList.add("cart__empty");
            if(products?.firstChild){
                products.innerHTML = "";
            }
            products?.appendChild(p)
            productsDiv?.classList.toggle("active-cart")
            return;
        }
        products!.innerHTML = "";
        cart.forEach(({id,name,img,price,amount}) =>{
            console.log(price)
            const div  = document.createElement("div");
            div.classList.add("product--cart");
            div.innerHTML =  `
                <img class="product--cart__image" src="${img}" alt="product">
                    <div class="product--cart__details">
                        <p class="product--cart__name">${name}</p>
                        <p class="product--cart__price">$${price.toFixed(2)} x ${amount}<span class="product--cart__price-span">$${(price * amount).toFixed(2)}</span></p>
                    </div>
                <img class="product--cart__delete" src="images/icon-delete.svg" data-id="${id}" alt="delete">
            `
            products?.appendChild(div);
        })
        localStorage.setItem("cart",JSON.stringify(cart,null,2));
        productsDiv?.classList.toggle("active-cart");
        deleteProduct();
}