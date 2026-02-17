// Worker Dashboard Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle job filtering
    const jobTabs = document.querySelectorAll('.jobs-tab');
    const jobCards = document.querySelectorAll('.job-card');
    
    jobTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active tab
            jobTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter job cards
            let visibleCount = 0;
            jobCards.forEach(card => {
                const status = card.getAttribute('data-job-status');
                
                if (filter === 'all' || status === filter) {
                    card.style.display = 'grid';
                    card.style.animation = 'fadeIn 0.3s ease';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide empty message
            const emptyMsg = document.getElementById('jobs-empty-filter');
            if (visibleCount === 0 && filter !== 'all') {
                emptyMsg.style.display = 'block';
            } else {
                emptyMsg.style.display = 'none';
            }
        });
    });
    
    // Handle job actions
    const completeButtons = document.querySelectorAll('.complete-btn');
    completeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobCard = this.closest('.job-card');
            const jobService = jobCard.querySelector('.job-service').textContent;
            
             
                // Update badge
                const badge = jobCard.querySelector('.job-badge');
                badge.textContent = '✓ Completed';
                badge.className = 'job-badge job-badge-completed';
                
                // Disable action buttons
                const actionBtns = jobCard.querySelectorAll('.action-btn');
                actionBtns.forEach(btn => btn.disabled = true);
                
                // Add rating prompt
                setTimeout(() => {
                    
                    if (rating) {
                        const ratingSpan = document.createElement('span');
                        ratingSpan.className = 'job-rating';
                        ratingSpan.textContent = `⭐ ${rating}.0`;
                        jobCard.querySelector('.job-meta').appendChild(ratingSpan);
                    }
                }, 300);
            });
    });
    
    // Handle update status button
    const updateButtons = document.querySelectorAll('.update-btn');
    updateButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobCard = this.closest('.job-card');
            const statusOptions = ['On the way', 'Arrived', 'In Progress', 'Nearly done'];
            
            const currentStatus = prompt(
                `Update status:\n1. On the way\n2. Arrived\n3. In Progress\n4. Nearly done\n\nEnter number (1-4):`,
                '3'
            );
            
            if (currentStatus && currentStatus >= 1 && currentStatus <= 4) {
                alert(`Status updated to: ${statusOptions[currentStatus - 1]}`);
            }
        });
    });
    
    // Animate cards on load
    jobCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
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
