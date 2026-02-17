

function openModal(id) {
  document.getElementById(id).style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
  document.body.style.overflow = "";
}

function goToSchedule(button) {
  const modal = button.closest('.modal-overlay');
  if (!modal) return;
  window.location.href = `/schedule/?service=${modal.dataset.service}`;
}

function goToBookNow(button) {
  const modal = button.closest('.modal-overlay');
  if (!modal) return;
  window.location.href = `/book-now/?service=${modal.dataset.service}`;
}

