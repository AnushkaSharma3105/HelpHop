// Service data
const allServices = [
    {
        id: 'home-cleaning',
        name: 'Home Cleaning',
        description: 'Full home or room-wise cleaning',
        price: 499,
        icon: '🧹'
    },
    {
        id: 'plumbing',
        name: 'Plumbing',
        description: 'Fixes, installations, maintenance',
        price: 599,
        icon: '🔧'
    },
    {
        id: 'electrical',
        name: 'Electrical',
        description: 'Wiring, fittings, safety checks',
        price: 699,
        icon: '💡'
    },
    {
        id: 'painting',
        name: 'Painting',
        description: 'Interior and exterior painting',
        price: 899,
        icon: '🎨'
    },
    {
        id: 'laundry',
        name: 'Laundry',
        description: 'Wash, iron, and fold',
        price: 399,
        icon: '🧺'
    },
    {
        id: 'repairs',
        name: 'Repairs',
        description: 'General repairs and handyman',
        price: 549,
        icon: '🔨'
    }
];

// Selected services storage
let selectedServices = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check if a service was passed from the services page
    const urlParams = new URLSearchParams(window.location.search);
    const initialService = urlParams.get('service');
    
    if (initialService) {
        const service = allServices.find(s => s.id === initialService);
        if (service) {
            selectedServices.push(service);
        }
    }
    
    // If no services selected, show the first one as default for demo
    if (selectedServices.length === 0) {
        selectedServices.push(allServices[0]);
    }
    
    updateUI();
});

// Update UI
function updateUI() {
    updateServicesList();
    updateBilling();
    updateEmptyState();
}

// Update services list
function updateServicesList() {
    const listContainer = document.getElementById('selectedServicesList');
    
    if (selectedServices.length === 0) {
        listContainer.innerHTML = '';
        return;
    }
    
    listContainer.innerHTML = selectedServices.map(service => `
        <div class="service-card-compact" data-service-id="${service.id}">
            <div class="service-icon">
                <span style="font-size: 1.5rem;">${service.icon}</span>
            </div>
            <div class="service-info">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
            </div>
            <div class="service-price">₹${service.price}</div>
            <button class="remove-btn" onclick="removeService('${service.id}')">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `).join('');
}

// Update billing
function updateBilling() {
    const billingItemsContainer = document.getElementById('billingItems');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    if (selectedServices.length === 0) {
        billingItemsContainer.innerHTML = '<div class="billing-item"><span class="item-name">No services selected</span><span class="item-price">₹0</span></div>';
        subtotalElement.textContent = '₹0';
        taxElement.textContent = '₹0';
        totalElement.textContent = '₹0';
        return;
    }
    
    // Calculate subtotal
    const subtotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
    
    // Calculate tax (18% GST)
    const tax = Math.round(subtotal * 0.18);
    
    // Calculate total
    const total = subtotal + tax;
    
    // Update billing items
    billingItemsContainer.innerHTML = selectedServices.map(service => `
        <div class="billing-item">
            <span class="item-name">${service.name}</span>
            <span class="item-price">₹${service.price}</span>
        </div>
    `).join('');
    
    // Update totals
    subtotalElement.textContent = `₹${subtotal}`;
    taxElement.textContent = `₹${tax}`;
    totalElement.textContent = `₹${total}`;
}

// Update empty state
function updateEmptyState() {
    const emptyState = document.getElementById('emptyState');
    const servicesList = document.getElementById('selectedServicesList');
    
    if (selectedServices.length === 0) {
        emptyState.style.display = 'block';
        servicesList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        servicesList.style.display = 'flex';
    }
}

// Remove service
function removeService(serviceId) {
    selectedServices = selectedServices.filter(service => service.id !== serviceId);
    updateUI();
}

// Open service modal
function openServiceModal() {
    const modal = document.getElementById('serviceModal');
    const availableServicesContainer = document.getElementById('availableServices');
    
    // Get services not yet added
    const availableServices = allServices.filter(service => 
        !selectedServices.find(s => s.id === service.id)
    );
    
    if (availableServices.length === 0) {
        alert('All services have been added!');
        return;
    }
    
    // Populate modal with available services
    availableServicesContainer.innerHTML = availableServices.map(service => `
        <div class="service-modal-card" onclick="addServiceFromModal('${service.id}')">
            <div class="service-modal-icon">${service.icon}</div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="service-modal-price">₹${service.price}</div>
            <button class="service-add-btn">Add Service</button>
        </div>
    `).join('');
    
    modal.classList.add('active');
}

// Close service modal
function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
}

// Add service from modal
function addServiceFromModal(serviceId) {
    const service = allServices.find(s => s.id === serviceId);
    
    if (service && !selectedServices.find(s => s.id === serviceId)) {
        selectedServices.push(service);
        updateUI();
        closeServiceModal();
    }
}

// Add service (for backward compatibility)
function addService(serviceId, serviceName, serviceDescription, servicePrice) {
    const service = allServices.find(s => s.id === serviceId);
    
    if (service && !selectedServices.find(s => s.id === serviceId)) {
        selectedServices.push(service);
        updateUI();
        closeServiceModal();
    }
}

// Proceed to payment
// function proceedToPayment() {
//     if (selectedServices.length === 0) {
//         alert('Please add at least one service to proceed with payment.');
//         return;
//     }
    
//     // Calculate total
//     const subtotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
//     const tax = Math.round(subtotal * 0.18);
//     const total = subtotal + tax;
    
//     // In a real application, this would redirect to a payment gateway
//     alert(`Proceeding to payment for ₹${total}\n\nServices:\n${selectedServices.map(s => `- ${s.name}: ₹${s.price}`).join('\n')}\n\nSubtotal: ₹${subtotal}\nTax (18% GST): ₹${tax}\nTotal: ₹${total}`);
    
//     // You can redirect to payment page or integrate payment gateway here
//     // window.location.href = '/payment?amount=' + total;
// }

// // Close modal when clicking outside
// document.addEventListener('click', function(event) {
//     const modal = document.getElementById('serviceModal');
//     if (event.target === modal) {
//         closeServiceModal();
//     }
// });

// // Close modal on Escape key
// document.addEventListener('keydown', function(event) {
//     if (event.key === 'Escape') {
//         closeServiceModal();
//     }
// });