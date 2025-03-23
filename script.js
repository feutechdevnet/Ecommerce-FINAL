let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');


window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    section.forEach(sec => {
        
        let top = window.scrollY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
            }) 
        }
    });
}

document.querySelector('#search-icon').onclick = () => {
    document.querySelector('#search-form').classList.toggle('active');
};

document.querySelector('#close').onclick = () => {
    document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
    delay: 7500,
    disableOnInteraction: false,
    },
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    loop:true
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    },
    loop:true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
    setInterval(loader, 3000);
}

window.onload = fadeOut();

let cart = [];
let total = 0;

function addToCart(itemName, itemPrice) {
    // Add item to cart array
    cart.push({ name: itemName, price: itemPrice });

    // Update the total price
    total += itemPrice;

    // Update the cart display
    updateCartDisplay();
}

function updateCartDisplay() {
    let cartItemsContainer = document.getElementById('cart-items');
    let totalPriceElement = document.getElementById('total');
    
    // Clear previous cart items
    cartItemsContainer.innerHTML = '';

    // Display cart items
    cart.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsContainer.appendChild(li);
    });

    // Display total price
    totalPriceElement.textContent = total.toFixed(2);
}

function resetCart() {
    // Clear the cart array and total
    cart = [];
    total = 0;

    // Update the cart display
    updateCartDisplay();
}


// PayPal button setup
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: total.toFixed(2)  // Pass the total amount of the cart
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Payment successful! Thank you, ' + details.payer.name.given_name);
            // Optionally, you can also reset the cart here.
            cart = [];
            total = 0;
            updateCartDisplay();
        });
    },
    onError: function(err) {
        console.error('Error during PayPal transaction:', err);
        alert('An error occurred with the payment.');
    }
}).render('#paypal-button-container');  // Render PayPal button in this container
