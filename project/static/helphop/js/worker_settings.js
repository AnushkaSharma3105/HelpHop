// Worker Settings Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Toggle switches
    const toggleInputs = document.querySelectorAll('.toggle-input');
    toggleInputs.forEach(input => {
        input.addEventListener('change', function() {
            const label = this.closest('.toggle-setting').querySelector('.label-text').textContent;
            const status = this.checked ? 'enabled' : 'disabled';
            console.log(`${label} ${status}`);
        });
    });
    
    // Save settings button
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            showNotification('Settings saved successfully!', 'success');
        });
    }
    
    // Reset button
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (confirm('Reset all settings to default?')) {
                // Reset form
                document.querySelectorAll('.toggle-input').forEach(input => {
                    input.checked = true;
                });
                document.querySelectorAll('.time-field input').forEach((input, index) => {
                    input.value = index === 0 ? '09:00' : '18:00';
                });
                showNotification('Settings reset to default', 'info');
            }
        });
    }
    
    // Day checkboxes
    const dayChecks = document.querySelectorAll('.day-check');
    dayChecks.forEach(check => {
        check.addEventListener('click', function() {
            this.querySelector('input').checked = !this.querySelector('input').checked;
        });
    });
    
    // Add payment method
    const addMethodBtn = document.querySelector('.add-method-btn');
    if (addMethodBtn) {
        addMethodBtn.addEventListener('click', function() {
            const bankName = prompt('Enter bank name:');
            const accountNumber = prompt('Enter last 4 digits of account:');
            
            if (bankName && accountNumber) {
                alert(`Payment method added:\n${bankName} - Account ending in ${accountNumber}`);
            }
        });
    }
    
    // Security buttons
    const securityBtns = document.querySelectorAll('.security-btn');
    securityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent;
            alert(`${action}\n\nThis would open a dialog for: ${action}`);
        });
    });
    
    // Account actions
    const actionBtns = document.querySelectorAll('.action-btn.danger');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.closest('.action-item').querySelector('h4').textContent;
            
            if (confirm(`Are you sure you want to ${action.toLowerCase()}? This action cannot be undone.`)) {
                alert(`${action} has been initiated. Check your email for confirmation.`);
            }
        });
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#dc2626' : '#3b82f6'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Add smooth scroll for settings sections
    document.querySelectorAll('.settings-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
