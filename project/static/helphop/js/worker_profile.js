// Worker Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Edit profile button
    const editBtn = document.querySelector('.edit-profile-btn');
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            alert('Profile editing mode activated.\nThis would allow you to edit your profile information.');
            // In a real app, this would enable form fields for editing
        });
    }
    
    // Service checkboxes
    const serviceCheckboxes = document.querySelectorAll('.service-checkbox input');
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const service = this.closest('.service-checkbox').querySelector('.checkbox-label').textContent;
            const status = this.checked ? 'added to' : 'removed from';
            console.log(`${service} ${status} your services`);
        });
    });
    
    // Add certification button
    const addCertBtn = document.querySelector('.add-btn');
    if (addCertBtn) {
        addCertBtn.addEventListener('click', function() {
            const certName = prompt('Enter certification name:');
            const certDate = prompt('Enter expiry date (MM/YYYY):');
            
            if (certName && certDate) {
                // Create new certification item
                const certList = document.querySelector('.certifications-list');
                const newCert = document.createElement('div');
                newCert.className = 'certification-item';
                newCert.innerHTML = `
                    <div>
                        <div class="cert-name">${certName}</div>
                        <div class="cert-date">Valid till ${certDate}</div>
                    </div>
                    <button class="remove-btn">Remove</button>
                `;
                
                certList.appendChild(newCert);
                
                // Add remove functionality to new item
                newCert.querySelector('.remove-btn').addEventListener('click', function() {
                    if (confirm('Remove this certification?')) {
                        newCert.remove();
                        showNotification('Certification removed', 'info');
                    }
                });
                
                showNotification(`Certification "${certName}" added successfully!`, 'success');
            }
        });
    }
    
    // Remove certification buttons
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const certName = this.closest('.certification-item').querySelector('.cert-name').textContent;
            
            if (confirm(`Remove "${certName}"?`)) {
                this.closest('.certification-item').style.opacity = '0';
                setTimeout(() => {
                    this.closest('.certification-item').remove();
                    showNotification('Certification removed', 'info');
                }, 300);
            }
        });
    });
    
    // Save changes button
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // Collect form data
            const formData = {
                services: [],
                about: ''
            };
            
            // Get selected services
            document.querySelectorAll('.service-checkbox input:checked').forEach(checkbox => {
                const service = checkbox.closest('.service-checkbox').querySelector('.checkbox-label').textContent;
                formData.services.push(service);
            });
            
            // Get about text
            const aboutTextarea = document.querySelector('.about-textarea');
            if (aboutTextarea) {
                formData.about = aboutTextarea.value;
            }
            
            console.log('Profile data to save:', formData);
            showNotification('Profile changes saved successfully!', 'success');
        });
    }
    
    // Cancel button
    const cancelBtn = document.querySelector('.cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Discard all changes?')) {
                location.reload();
            }
        });
    }
    
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
    
    // Animate profile sections
    document.querySelectorAll('.profile-section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.3s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
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
