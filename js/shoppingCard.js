document.addEventListener('DOMContentLoaded', function() {
    let cartItemsContainer = document.querySelector('.cart-items');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if(cartItems.length != 0)
    {cartItems.forEach(item => {
        if (item.Price >= 1000) {
            item.Price = '$' + item.Price.toLocaleString('en-US');
        
        } else {
            item.Price = '$' + item.Price.toString();
        }
        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.Image}" alt="${item.Title}" class="item-image">
                <div class="item-details">
                    <div>
                        <div class="item-header">
                            <h3 class="item-title">${item.Title}</h3>
                            <span class="item-price">${item.Price}</span>
                        </div>
                        <p class="item-brand">${item.Brand}</p>
                    </div>
                    <div class="item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn">+</button>
                        </div>
                        <button class="remove-btn">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        cartItemsContainer.innerHTML += cartItemHTML;
        // Сумма корзины
        cnt = 0
        for(var i = 0; i < document.querySelectorAll('.item-price').length; i++) {
            cnt = cnt + Number(document.querySelectorAll('.item-price')[i].textContent.replace(/[^\d.-]/g, ''))
        }
        goToDollar()
    });}
    else {
        document.querySelector('.cart-content').style.display = 'none';
        document.querySelector('.empty-cart').style.display = 'flex';
    }
});

function goToDollar() {
    if (cnt > 0) {
        document.querySelector('.cart-content').style.display = 'flex';
        document.querySelector('.empty-cart').style.display = 'none';
        if (cnt >= 1000) {
            cnt = '$' + cnt.toLocaleString('en-US');
            } else {
                cnt = '$' + cnt.toString();
            }
            document.getElementsByClassName('total-sum')[0].innerHTML = cnt
        
    } else {
        document.querySelector('.cart-content').style.display = 'none';
        document.querySelector('.empty-cart').style.display = 'flex';
    }  
}



// + и -
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('quantity-btn')) {
        let itemPrice = e.target.closest('.cart-item').querySelector('.item-price').textContent;
        let quantityElement = e.target.parentElement.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        itemPrice = Number(itemPrice.replace(/[^\d.-]/g, ''));
        
        if (e.target.textContent === '+' && quantity < 10) {
            quantity++;
            quantityElement.textContent = quantity;
            plusCartSummary(itemPrice);
        } else if (e.target.textContent === '-' && quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
            minusCartSummary(itemPrice);
        }
    }
});



function plusCartSummary(itemPrice) {
    cnt = Number(cnt.replace(/[^\d.-]/g, '')) + itemPrice
    goToDollar()
}

function minusCartSummary(itemPrice) {
    cnt = Number(cnt.replace(/[^\d.-]/g, '')) - itemPrice
    goToDollar()
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-btn') || e.target.closest('.remove-btn')) {
        let item = e.target.closest('.cart-item');
        let itemPrice = item.querySelector('.item-price').textContent;
        let quantityElement = item.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        itemPrice = Number(itemPrice.replace(/[^\d.-]/g, ''));
        
        deleteCartSummary(itemPrice, quantity);
        item.remove();
        
        // Обновляем localStorage после удаления
        updateLocalStorage();
    }
});

function deleteCartSummary(itemPrice, quantity) {
    cnt = Number(cnt.replace(/[^\d.-]/g, '')) - (itemPrice * quantity)
    goToDollar()
}

function updateLocalStorage() {
    const items = document.querySelectorAll('.cart-item');
    
    const cartItems = [];
    
    items.forEach(item => {
        cartItems.push({
            Image: item.querySelector('.item-image').src,
            Title: item.querySelector('.item-title').textContent,
            Price: item.querySelector('.item-price').textContent,
            Brand: item.querySelector('.item-brand').textContent,
            Quantity: parseInt(item.querySelector('.quantity').textContent)
        });
    });
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

document.querySelectorAll('.checkout-btn').forEach(btn => {
    
    btn.addEventListener('click', function() {
        localStorage.removeItem('cartItems')
        showToast('✓ Payment was successful', 'success')
        document.querySelector('.cart-content').style.display = 'none';
        document.querySelector('.empty-cart').style.display = 'flex';
    })
})


function showToast(message, type = 'success') {
    const toast = document.getElementById('toast-notification');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Устанавливаем сообщение и тип
    toastMessage.textContent = message;
    toast.className = `toast-notification toast-${type}`;
    
    // Показываем уведомление
    toast.style.top = '20px';
    
    // Автоматическое скрытие через 3 секунды
    setTimeout(() => {
        toast.style.top = '-100px';
    }, 2000);
}