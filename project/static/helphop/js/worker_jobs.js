// Worker Jobs Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const jobCards = document.querySelectorAll('.available-job-card');
    const filterSelects = document.querySelectorAll('.filter-select');
    const searchInput = document.querySelector('.search-input');
    const filterReset = document.querySelector('.filter-reset');
    const acceptButtons = document.querySelectorAll('.accept-job');
    
    // Initialize jobs with animation
    jobCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
    
    // Handle job acceptance
    acceptButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const jobCard = this.closest('.available-job-card');
            const jobTitle = jobCard.querySelector('.job-title').textContent;
            const jobAmount = jobCard.querySelector('.price-value').textContent;
            
            if (confirm(`Accept this job?\n\n${jobTitle}\n${jobAmount}`)) {
                // Visual feedback
                this.textContent = '✓ Job Accepted';
                this.style.background = '#10b981';
                this.disabled = true;
                
                // Highlight accepted job
                jobCard.style.opacity = '0.7';
                jobCard.style.pointerEvents = 'none';
                
                // Show notification
                showNotification(`"${jobTitle}" has been added to your active jobs!`, 'success');
                
                // Redirect to dashboard after delay
                setTimeout(() => {
                    window.location.href = '/worker-dashboard/';
                }, 2000);
            }
        });
    });
    
    // Handle details button
    const detailsButtons = document.querySelectorAll('.details-btn');
    detailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const jobCard = this.closest('.available-job-card');
            const jobTitle = jobCard.querySelector('.job-title').textContent;
            const jobDetails = jobCard.querySelector('.job-details').textContent;
            
            alert(`${jobTitle}\n\n${jobDetails}`);
        });
    });
    
    // Filter functionality
    function applyFilters() {
        const service = document.querySelector('select:nth-of-type(1)').value.toLowerCase();
        const location = document.querySelector('select:nth-of-type(2)').value.toLowerCase();
        const time = document.querySelector('select:nth-of-type(3)').value.toLowerCase();
        const price = document.querySelector('select:nth-of-type(4)').value.toLowerCase();
        const searchTerm = searchInput.value.toLowerCase();
        
        let visibleCount = 0;
        
        jobCards.forEach(card => {
            let shouldShow = true;
            
            // Service filter
            if (service) {
                const cardService = card.querySelector('.job-service-badge').textContent.toLowerCase();
                shouldShow = shouldShow && cardService.includes(service);
            }
            
            // Location filter (simplified)
            if (location && shouldShow) {
                const cardLocation = card.querySelector('.detail-text').textContent.toLowerCase();
                shouldShow = shouldShow && cardLocation.includes(location);
            }
            
            // Search filter
            if (searchTerm && shouldShow) {
                const cardText = card.textContent.toLowerCase();
                shouldShow = shouldShow && cardText.includes(searchTerm);
            }
            
            // Price range filter (simplified)
            if (price && shouldShow) {
                const priceText = card.querySelector('.price-value').textContent;
                const priceNum = parseInt(priceText.replace(/[^\d]/g, ''));
                const [min, max] = price.includes('-') 
                    ? price.split('-').map(Number) 
                    : [parseInt(price), Infinity];
                shouldShow = shouldShow && priceNum >= min && priceNum <= max;
            }
            
            if (shouldShow) {
                card.style.display = 'grid';
                card.style.animation = 'fadeIn 0.3s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update job count
        const jobsCount = document.querySelector('.jobs-count');
        if (jobsCount) {
            jobsCount.textContent = `Showing ${visibleCount} available jobs`;
        }
    }
    
    // Add event listeners to filters
    filterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    // Search functionality
    searchInput.addEventListener('input', applyFilters);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });
    
    // Reset filters
    filterReset.addEventListener('click', function() {
        filterSelects.forEach(select => select.value = '');
        searchInput.value = '';
        applyFilters();
    });
    
    // Pagination
    const pageNums = document.querySelectorAll('.page-num');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    pageNums.forEach(num => {
        num.addEventListener('click', function() {
            pageNums.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            const page = this.textContent;
            // Update jobs displayed (simplified)
            jobCards.forEach(card => {
                card.style.display = 'grid';
            });
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
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
