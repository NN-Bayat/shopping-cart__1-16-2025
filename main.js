const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
});

cartClose.addEventListener('click', () => {
    cart.classList.remove('active');
});

const addCartButton = document.querySelectorAll(".add_cart");

addCartButton.forEach(button => {
    button.addEventListener('click', event => {
        const productBox = event.target.closest('.products_box');
        addToCart(productBox);
    });
});

const cartContent = document.querySelector(".cart_content");

const addToCart = productBox => {
    const productTmgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".products_title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItems = document.querySelectorAll(".cart_product_title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This item is already in the cart.");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart_box");
    cartBox.innerHTML = `
                <img src="${productTmgSrc}" class="cart_img">
                <div class="cart_detail">
                    <h2 class="cart_product_title">${productTitle}</h2>
                    <span class="cart_price">${productPrice}</span>
                    <div class="cart_quantity">
                        <button id="decrement">-</button>
                        <span class="number">1</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-line cart_remove"></i>
    `;

    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart_remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);
        updateTotalPrice();
    });

    cartBox.querySelector(".cart_quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = parseInt(numberElement.textContent);

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            }
        }
        else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;
        updateTotalPrice();
    });

    updateCartCount(1);

    updateTotalPrice();
};

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total_price");
    const cartBoxes = document.querySelectorAll(".cart_box");

    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart_price");
        const quantityElement = cartBox.querySelector(".number");
        const price = parseFloat(priceElement.textContent.replace("$", ""));
        const quantity = parseInt(quantityElement.textContent);

        total += price * quantity;
    });

    totalPriceElement.textContent = `$${total}`;
};

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;

    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    };
};

const buyNowButton = document.querySelector(".btn_buy");
buyNowButton.addEventListener('click', () => {
    const cartBoxes = cartContent.querySelectorAll(".cart_box");
    if (cartBoxes.length === 0) {
        alert("اول خوش کو دویوم بای کو باز بخر! او جونه مرگ.")
        return;
    };

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("اگه تنگ بود مینی بوخاری بنداز!");
});

