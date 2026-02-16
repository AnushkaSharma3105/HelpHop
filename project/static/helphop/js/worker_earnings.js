// Worker Earnings Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const earningsTabs = document.querySelectorAll('.earnings-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    earningsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            earningsTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide tab content
            tabContents.forEach(content => {
                if (content.id === tabName) {
                    content.classList.add('active');
                    content.style.animation = 'fadeIn 0.3s ease';
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
    
    // Withdrawal form
    const withdrawForm = document.querySelector('.withdrawal-form');
    if (withdrawForm) {
        withdrawForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = document.querySelector('.input-with-max input').value;
            const method = document.querySelector('.form-group select').value;
            
            if (!amount || !method) {
                alert('Please fill in all fields');
                return;
            }
            
            if (confirm(`Request withdrawal of ₹${amount} to ${method}?`)) {
                alert('Withdrawal request submitted! You will receive the amount within 2-3 business days.');
                withdrawForm.reset();
            }
        });
    }
    
    // Max button
    const maxBtn = document.querySelector('.max-btn');
    if (maxBtn) {
        maxBtn.addEventListener('click', function() {
            const input = document.querySelector('.input-with-max input');
            input.value = '2500'; // Available balance
        });
    }
    
    // Download invoice
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const invoiceInfo = this.closest('.invoice-item').querySelector('.invoice-info h4').textContent;
            alert(`Downloading ${invoiceInfo}...`);
            // In a real app, this would trigger a PDF download
        });
    });
    
    // View invoice
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const invoiceInfo = this.closest('.invoice-item').querySelector('.invoice-info h4').textContent;
            alert(`Opening ${invoiceInfo}...\n\nThis would display the PDF invoice in a new window.`);
        });
    });
    
    // Month picker change
    const monthPicker = document.querySelector('.month-picker');
    if (monthPicker) {
        monthPicker.addEventListener('change', function() {
            const month = this.value;
            alert(`Loading earnings for ${month}...`);
            // Update table data dynamically
        });
    }
    
    // Animate earnings cards
    const earningsCards = document.querySelectorAll('.earnings-card');
    earningsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
