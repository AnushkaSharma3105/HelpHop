// Service data from previous page
let orderData = {
    services: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    scheduledTime: null,
    isScheduled: false
};

// Selected payment method and details
let selectedPaymentMethod = null;
let selectedBank = null;
let selectedWallet = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Try to get data from URL parameters or session storage
    loadOrderData();
    
    // Update UI with order data
    updateOrderSummary();
    
    // Format card number input
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', formatCardNumber);
    }
    
    // Format expiry date input
    const expiryInput = document.getElementById('card-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', formatExpiryDate);
    }
    
    // CVV input - numbers only
    const cvvInput = document.getElementById('card-cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
});

// Load order data from URL or session storage
function loadOrderData() {
    // Try to get from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if data is in URL
    const servicesParam = urlParams.get('services');
    const totalParam = urlParams.get('total');
    const scheduledParam = urlParams.get('scheduled');
    
    if (servicesParam && totalParam) {
        try {
            orderData.services = JSON.parse(decodeURIComponent(servicesParam));
            orderData.total = parseInt(totalParam);
            orderData.isScheduled = scheduledParam === 'true';
            
            // Calculate subtotal and tax from total
            
            orderData.subtotal = Math.round(orderData.total / 1.18);
            orderData.tax = orderData.total - orderData.subtotal;
        } catch (e) {
            console.error('Error parsing URL parameters:', e);
            loadDefaultData();
        }
    } else if (sessionStorage.getItem('orderData')) {
        // Try session storage
        try {
            orderData = JSON.parse(sessionStorage.getItem('orderData'));
        } catch (e) {
            console.error('Error parsing session storage:', e);
            loadDefaultData();
        }
    } else {
        // Load default demo data
        loadDefaultData();
    }
}

// Load default data for demo
function loadDefaultData() {
    orderData = {
        services: [
            {
                id: 'home-cleaning',
                name: 'Home Cleaning',
                price: 499
            }
        ],
        subtotal: 499,
        tax: 90,
        total: 589,
        scheduledTime: null,
        isScheduled: false
    };
}

// Update order summary display
function updateOrderSummary() {
    const orderItemsContainer = document.getElementById('orderItems');
    const subtotalElement = document.getElementById('summarySubtotal');
    const taxElement = document.getElementById('summaryTax');
    const totalElement = document.getElementById('summaryTotal');
    
    // Update order items
    orderItemsContainer.innerHTML = orderData.services.map(service => `
        <div class="order-item">
            <span class="item-name">${service.name}</span>
            <span class="item-price">₹${service.price}</span>
        </div>
    `).join('');
    
    // Update totals
    subtotalElement.textContent = `₹${orderData.subtotal}`;
    taxElement.textContent = `₹${orderData.tax}`;
    totalElement.textContent = `₹${orderData.total}`;
}

// Select payment method
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    // Update UI - remove selected class from all cards
    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    const selectedCard = document.querySelector(`[data-method="${method}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Check the radio button
    const radioButton = document.getElementById(method);
    if (radioButton) {
        radioButton.checked = true;
    }
    
    // Hide all forms
    document.querySelectorAll('.payment-form').forEach(form => {
        form.style.display = 'none';
    });
    
    // Show selected form
    const form = document.getElementById(`${method}-form`);
    if (form) {
        form.style.display = 'block';
    }
}

// Format card number (add spaces every 4 digits)
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/\D/g, '');
    
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    e.target.value = formattedValue;
}

// Format expiry date (MM/YY)
function formatExpiryDate(e) {
    let value = e.target.value.replace(/\//g, '');
    value = value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    e.target.value = value;
}

// Verify UPI ID
function verifyUPI() {
    const upiId = document.getElementById('upi-id').value.trim();
    
    if (!upiId) {
        alert('Please enter a UPI ID');
        return;
    }
    
    // Basic UPI ID validation
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(upiId)) {
        alert('Please enter a valid UPI ID (example: yourname@paytm)');
        return;
    }
    
    // In production, this would verify with the payment gateway
    alert(`UPI ID verified: ${upiId}\n\nClick "Pay Now" to complete payment.`);
}

// Select bank
function selectBank(bank) {
    selectedBank = bank;
    
    // Update UI
    document.querySelectorAll('.bank-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    event.target.classList.add('selected');
}

// Select wallet
function selectWallet(wallet) {
    selectedWallet = wallet;
    
    // Update UI
    document.querySelectorAll('.wallet-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    event.target.classList.add('selected');
}

// Validate payment details
function validatePayment() {
    if (!selectedPaymentMethod) {
        return { valid: false, message: 'Please select a payment method' };
    }
    
    switch (selectedPaymentMethod) {
        case 'upi':
            const upiId = document.getElementById('upi-id').value.trim();
            if (!upiId) {
                return { valid: false, message: 'Please enter your UPI ID' };
            }
            const upiRegex = /^[\w.-]+@[\w.-]+$/;
            if (!upiRegex.test(upiId)) {
                return { valid: false, message: 'Please enter a valid UPI ID' };
            }
            return { valid: true };
            
        case 'card':
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            const cardName = document.getElementById('card-name').value.trim();
            const cardExpiry = document.getElementById('card-expiry').value.trim();
            const cardCvv = document.getElementById('card-cvv').value.trim();
            
            if (!cardNumber || cardNumber.length < 15) {
                return { valid: false, message: 'Please enter a valid card number' };
            }
            if (!cardName) {
                return { valid: false, message: 'Please enter the name on card' };
            }
            if (!cardExpiry || cardExpiry.length !== 5) {
                return { valid: false, message: 'Please enter expiry date (MM/YY)' };
            }
            if (!cardCvv || cardCvv.length < 3) {
                return { valid: false, message: 'Please enter CVV' };
            }
            return { valid: true };
            
        case 'netbanking':
            if (!selectedBank) {
                const otherBank = document.getElementById('other-bank').value;
                if (!otherBank) {
                    return { valid: false, message: 'Please select a bank' };
                }
            }
            return { valid: true };
            
        case 'wallet':
            if (!selectedWallet) {
                return { valid: false, message: 'Please select a wallet' };
            }
            return { valid: true };
            
        default:
            return { valid: false, message: 'Invalid payment method' };
    }
}

// Process payment
function processPayment() {
    // Validate payment details
    const validation = validatePayment();
    
    if (!validation.valid) {
        alert(validation.message);
        return;
    }
    
    // Build payment details object
    const paymentDetails = {
        method: selectedPaymentMethod,
        amount: orderData.total,
        services: orderData.services,
        scheduledTime: orderData.scheduledTime,
        isScheduled: orderData.isScheduled
    };
    
    // Add method-specific details
    switch (selectedPaymentMethod) {
        case 'upi':
            paymentDetails.upiId = document.getElementById('upi-id').value.trim();
            break;
            
        case 'card':
            paymentDetails.cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            paymentDetails.cardName = document.getElementById('card-name').value.trim();
            paymentDetails.cardExpiry = document.getElementById('card-expiry').value.trim();
            // Note: CVV should never be stored or logged
            break;
            
        case 'netbanking':
            paymentDetails.bank = selectedBank || document.getElementById('other-bank').value;
            break;
            
        case 'wallet':
            paymentDetails.wallet = selectedWallet;
            break;
    }
    
    // Show processing message
    const payButton = document.querySelector('.pay-now-btn');
    payButton.disabled = true;
    payButton.textContent = 'Processing...';
    
    
    // Simulate payment processing
    setTimeout(() => {
        // Build success message
        let message = `Payment Successful! ✓\n\n`;
        message += `Amount Paid: ₹${orderData.total}\n`;
        message += `Payment Method: ${getPaymentMethodName(selectedPaymentMethod)}\n\n`;
        message += `Services:\n`;
        orderData.services.forEach(service => {
            message += `- ${service.name}: ₹${service.price}\n`;
        });
        
        if (orderData.isScheduled && orderData.scheduledTime) {
            message += `\nScheduled for: ${orderData.scheduledTime}`;
        }
        
        message += `\n\nYou will receive a confirmation email shortly.`;
        
        alert(message);
   
        
        // Reset button
        payButton.disabled = false;
        payButton.textContent = 'Pay Now →';
    }, 2000);
}

// Get payment method display name
function getPaymentMethodName(method) {
    const names = {
        'upi': 'UPI',
        'card': 'Debit/Credit Card',
        'netbanking': 'Net Banking',
        'wallet': 'Wallet'
    };
    return names[method] || method;
}

// Helper function to pass data from booking/schedule page
function navigateToPayment(services, total, scheduledTime = null) {
    // Encode services data
    const servicesJson = encodeURIComponent(JSON.stringify(services));
    
    // Build URL
    let url = `/payment?services=${servicesJson}&total=${total}`;
    
    if (scheduledTime) {
        url += `&scheduled=true`;
    }
    
    // Navigate
    window.location.href = url;
}

// Alternative: Store in session storage
function storeOrderDataAndNavigate(services, total, scheduledTime = null) {
    const orderData = {
        services: services,
        subtotal: Math.round(total / 1.18),
        tax: Math.round(total - (total / 1.18)),
        total: total,
        scheduledTime: scheduledTime,
        isScheduled: !!scheduledTime
    };
    
    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    window.location.href = '/payment';
}