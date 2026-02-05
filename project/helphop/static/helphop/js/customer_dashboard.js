(function() {
    var tabs = document.querySelectorAll('.bookings-tab');
    var cards = document.querySelectorAll('.booking-card');
    var emptyFilter = document.getElementById('bookings-empty-filter');
    var emptyEnd = document.getElementById('bookings-empty-end');

    function filterBookings(filter) {
        var visibleCount = 0;
        cards.forEach(function(card) {
            var status = card.getAttribute('data-booking-status');
            var show = filter === 'all' || status === filter;
            card.classList.toggle('booking-card-hidden', !show);
            if (show) visibleCount++;
        });
        tabs.forEach(function(t) { t.classList.toggle('active', t.getAttribute('data-filter') === filter); });
        emptyFilter.style.display = (visibleCount === 0 && filter !== 'all') ? 'block' : 'none';
        emptyEnd.style.display = (visibleCount > 0 || filter === 'all') ? 'block' : 'none';
    }

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            filterBookings(this.getAttribute('data-filter'));
        });
    });
})();
