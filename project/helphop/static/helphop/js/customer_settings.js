(function() {
    var list = document.querySelector('.settings-list');
    if (!list) return;

    list.addEventListener('click', function(e) {
        var row = e.target.closest('.settings-toggle');
        if (!row) return;

        var checkbox = row.querySelector('.settings-checkbox');
        if (!checkbox) return;

        e.preventDefault();
        checkbox.checked = !checkbox.checked;
    });
})();
