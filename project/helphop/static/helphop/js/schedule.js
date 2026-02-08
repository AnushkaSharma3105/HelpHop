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

// State
let selectedServices = [];
let scheduledHours = null;
let scheduledDateTime = null;

// Init
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const initialService = params.get('service');

    if (initialService) {
        const service = allServices.find(s => s.id === initialService);
        if (service) selectedServices.push(service);
    }

    updateTimePreviews();
    updateUI();
});

// ================= UI UPDATES =================

function updateUI() {
    updateServicesList();
    updateBilling();
    updateEmptyState();
}

function updateServicesList() {
    const container = document.getElementById('selectedServicesList');
    container.innerHTML = selectedServices.map(service => `
        <div class="service-card-compact" data-service-id="${service.id}">
            <div class="service-icon"><span>${service.icon}</span></div>
            <div class="service-info">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
            </div>
            <div class="service-price">₹${service.price}</div>
            <button class="remove-btn" onclick="removeService('${service.id}')">×</button>
        </div>
    `).join('');
}

function updateBilling() {
    const billing = document.getElementById('billingItems');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (!selectedServices.length) {
        billing.innerHTML = '';
        subtotalEl.textContent = '₹0';
        taxEl.textContent = '₹0';
        totalEl.textContent = '₹0';
        return;
    }

    const subtotal = selectedServices.reduce((s, x) => s + x.price, 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    billing.innerHTML = selectedServices.map(s => `
        <div class="billing-item">
            <span>${s.name}</span>
            <span>₹${s.price}</span>
        </div>
    `).join('');

    subtotalEl.textContent = `₹${subtotal}`;
    taxEl.textContent = `₹${tax}`;
    totalEl.textContent = `₹${total}`;
}

function updateEmptyState() {
    document.getElementById('emptyState').style.display =
        selectedServices.length ? 'none' : 'block';
}

// ================= SERVICE ACTIONS =================

function addServiceFromModal(id) {
    const service = allServices.find(s => s.id === id);
    if (!service) return;

    if (!selectedServices.find(s => s.id === id)) {
        selectedServices.push(service);
        updateUI();
    }

    closeServiceModal();
}

function removeService(id) {
    selectedServices = selectedServices.filter(s => s.id !== id);
    updateUI();
}

// ================= MODAL =================

function openServiceModal() {
    const modal = document.getElementById('serviceModal');
    const container = document.getElementById('availableServices');

    container.innerHTML = allServices
        .filter(s => !selectedServices.find(x => x.id === s.id))
        .map(s => `
            <div class="service-modal-card" onclick="addServiceFromModal('${s.id}')">
                <div class="service-modal-icon">${s.icon}</div>
                <h3>${s.name}</h3>
                <p>${s.description}</p>
                <div class="service-modal-price">₹${s.price}</div>
                <button class="service-add-btn">Add Service</button>
            </div>
        `).join('');

    modal.classList.add('active');
}

function closeServiceModal() {
    document.getElementById('serviceModal').classList.remove('active');
}

// ================= SCHEDULE =================

function updateTimePreviews() {
    const now = new Date();
    for (let h = 2; h <= 5; h++) {
        const el = document.getElementById(`time-${h}`);
        if (el) el.textContent = new Date(now.getTime() + h * 3600000).toLocaleString();
    }
}

function toggleScheduleDropdown() {
    document.getElementById('scheduleDropdown').classList.toggle('active');
}

function selectScheduleTime(hours) {
    scheduledHours = hours;
    scheduledDateTime = new Date(Date.now() + hours * 3600000);

    document.getElementById('selectedTimeText').textContent =
        `${hours} Hours from now`;

    document.getElementById('scheduledTimeValue').textContent =
        scheduledDateTime.toLocaleString();

    document.getElementById('scheduledTimeDisplay').style.display = 'flex';
    toggleScheduleDropdown();
}
