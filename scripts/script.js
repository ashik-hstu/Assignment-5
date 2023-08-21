const cartItemsEl = document.getElementById('cart-items')
const totalPriceEl = document.getElementById('total-price')
const discountEl = document.getElementById('discount')
const discountedPriceEl = document.getElementById('discounted-price')
const purchaseButtonEl = document.getElementById('purchase-button')
const applyCouponInputEl = document.getElementById('coupon-input')
const applyCouponButtonEl = document.getElementById('coupon-button')
const productsEl = document.getElementsByClassName('product')


for(let i=0; i<productsEl.length; i++) {
    productsEl[i].addEventListener('click', function() {
        const productTitle = productsEl[i].getElementsByClassName('product-title')
        const productPrice = productsEl[i].getElementsByClassName('product-price')
        const price = productPrice[0].textContent.trim();
        const title = productTitle[0].textContent.trim()
// Add item to list
        const div = document.createElement('div')
        div.textContent = `${cartItemsEl.childElementCount + 1}. ${title}`;
        cartItemsEl.appendChild(div)

        // Update total price
        const totalPrice = Number(totalPriceEl.textContent) + Number(price);
        totalPriceEl.textContent = totalPrice;
        let discount = 0;
        if(Number(discountEl.textContent) > 0) {
            discount = totalPrice * 0.2;
        }
        discountEl.textContent = discount.toFixed(2)

        // Update discounted price
        const discountedPrice = Number(totalPriceEl.textContent) - discount;
        discountedPriceEl.textContent = discountedPrice;

        if(totalPrice> 0) {
            purchaseButtonEl.disabled = false
        }
        if(totalPrice >= 200) {
 applyCouponButtonEl.disabled = false           
        }

    })
}

applyCouponButtonEl.addEventListener('click', function(e) {
e.preventDefault();
    const value = applyCouponInputEl.value;
    if(value === 'SELL200') {
        const discount = (Number(totalPriceEl.textContent) * 0.2).toFixed(2);
        discountEl.textContent = discount;
 const discountedPrice = Number(totalPriceEl.textContent) - discount;
        discountedPriceEl.textContent = discountedPrice;
    }
})

purchaseButtonEl.addEventListener('click', function() {

    document.body.innerHTML +=`
    
   <div id="modal" class="h-[100vh] inset-0 overflow-hidden fixed bg-black/50  flex items-center justify-center w-[100vw]">
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white rounded-lg flex items-center justify-center flex-col gap-3 shadow-lg">
      <img src="/assets/images/congo.png" class="w-[100px] h-[100px]" />
      <h2 class="text-3xl text-green-700 text-center">Congratulations</h2>
      <p>You purchased the products</p>
      <button id="go-home" class="bg-[#E527B2] disabled:cursor-not-allowed disabled:bg-[#E527B2]/50 px-3 py-1.5  text-[#FFFFFF] text-xl rounded-lg">Go Home</button>
    </div>
   </div> 
    `
    const goHomeButtonEl = document.getElementById('go-home')
    goHomeButtonEl.addEventListener('click', function() {

    const modalEl = document.getElementById('modal')

    applyCouponInputEl.value = ""
    totalPriceEl.innerHTML = ""
    discountEl.innerHTML = ""
    discountedPriceEl.innerHTML = ""
    document.body.removeChild(modalEl)

    })

})


