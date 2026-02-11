// function openModal(id) {
//   document.getElementById(id).style.display = "flex";
// }

// function closeModal(id) {
//   document.getElementById(id).style.display = "none";
// }


// function goToSchedule(button) {
//     const modal = button.closest('.modal-overlay');
//     if (!modal) return;

//     const service = modal.dataset.service;
//     if (!service) return;

//     window.location.href = `/schedule/?service=${service}`;
// }


// window.goToBookNow = function (button) {
//     const modal = button.closest('.modal-overlay');
//     if (!modal) return;

//     const service = modal.dataset.service;
//     if (!service) return;

//     window.location.href = `/book-now/?service=${service}`;
// };

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

