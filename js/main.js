var addToCartCount = 0

// Обработчики для модальных окон
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const productId = this.getAttribute('data-product');
        const modal = document.getElementById(`modal-${productId}`);
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});
        
// Закрытие модальных окон
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});
        
// Закрытие при клике вне модального окна
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});


        
// Выбор размера
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const sizeOptions = this.parentElement.querySelectorAll('.size-btn');
        sizeOptions.forEach(option => option.classList.remove('selected'));
        this.classList.add('selected');
    });
});



// Техподдержка
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', function(e) {
        // Закрываем все открытые элементы, кроме текущего
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0';
            }
        });
        
        item.classList.toggle('active');
        
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    });
});

// Добавление в корзину
let cartItems = [];
document.querySelectorAll('.add-to-cart').forEach(btn => {
    
    btn.addEventListener('click', function() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const modal = this.closest('.modal');
        const imgs = modal.querySelector('.product-image').src;
        const productBrand = modal.querySelector('.product-brand').textContent;
        const productTitle = modal.querySelector('.product-title').textContent;
        var productPrice = modal.querySelector('.product-price').textContent;
        const selectedSize = modal.querySelector('.size-btn.selected').textContent;
        productPrice = Number(productPrice.replace(/[^\d.-]/g, ''))
        var productQuantity = 1
        const appConfig = {
            Image: imgs,
            Brand: productBrand,
            Title: productTitle,
            Price: productPrice,
            Size: selectedSize
        };
        
        let itemExists = false;
        
        if (cartItems.length !== 0) {
            for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].Title === appConfig.Title && cartItems[i].Price === appConfig.Price) {
                    itemExists = true;
                    break;
                }
            }
            
            if (itemExists) {
                showToast('✕ Product has already been added to the cart', 'error')
            } else {
                showToast('✓ Product was successfully added to the cart', 'success')
                cartItems.push(appConfig);
            }
        } else {
            showToast('✓ Product was successfully added to the cart', 'success')
            cartItems.push(appConfig);
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

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