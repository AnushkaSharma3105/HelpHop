(function() {
    var form = document.getElementById('profile-form');
    var nameInput = document.getElementById('p-name');
    var emailInput = document.getElementById('p-email');
    var avatarPreview = document.getElementById('profile-avatar-preview');
    var namePreview = document.getElementById('profile-name-preview');
    var emailPreview = document.getElementById('profile-email-preview');

    function getInitials(name) {
        if (!name || !name.trim()) return '?';
        var parts = name.trim().split(/\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        return name.trim().slice(0, 2).toUpperCase();
    }

    function updatePreview() {
        var name = nameInput ? nameInput.value.trim() : '';
        var email = emailInput ? emailInput.value.trim() : '';
        if (avatarPreview) avatarPreview.textContent = getInitials(name) || '?';
        if (namePreview) namePreview.textContent = name || 'Your name';
        if (emailPreview) emailPreview.textContent = email || 'Add your email';
    }

    if (nameInput) { nameInput.addEventListener('input', updatePreview); nameInput.addEventListener('change', updatePreview); }
    if (emailInput) { emailInput.addEventListener('input', updatePreview); emailInput.addEventListener('change', updatePreview); }
    if (form) form.addEventListener('submit', function(e) { e.preventDefault(); updatePreview(); });
})();
