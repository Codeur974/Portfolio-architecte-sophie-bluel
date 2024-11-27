document;
let modal = null;

const openModal = function (e, modalId) {
  e.preventDefault();
  const target = modalId
    ? document.getElementById(modalId)
    : e.target.getAttribute("href")
    ? document.querySelector(e.target.getAttribute("href"))
    : e.target;
  const overlay = document.getElementById("modal-overlay");
  if (target) {
    target.style.display = "block"; // Assurez-vous que la modal est visible
    overlay.style.display = "block"; // Affichez l'overlay
    target.removeAttribute("inert");
    target.setAttribute("aria-modal", "true");
    modal = target;

    // Empêcher la fermeture de la modal lorsque vous cliquez à l'intérieur de la modal
    const modalContent = modal.querySelector(".modal-wrapper");
    if (modalContent) {
      modalContent.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    const closeButton = modal.querySelector(".js-modal-close");
    if (closeButton) {
      closeButton.style.display = "block"; // Assurez-vous que le bouton est visible
      closeButton.addEventListener("click", closeModal);
    }

    const addPhotoButton = modal.querySelector(".add-Photo");
    if (addPhotoButton) {
      addPhotoButton.style.display = "block"; // Assurez-vous que le bouton est visible
      addPhotoButton.addEventListener("click", (e) => openModal(e, "modal2"));
    }
  } else {
    console.error("La cible de la modal n'a pas été trouvée.");
  }
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.style.display = "none";
    modal.setAttribute("inert", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
  });
  const overlay = document.getElementById("modal-overlay");
  overlay.style.display = "none"; // Masquez l'overlay
  modal = null;
};

// Fermer la modal avec la touche "Escape"
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

// Fermer la modal lorsque vous cliquez sur l'overlay
const overlay = document.getElementById("modal-overlay");
if (overlay) {
  overlay.addEventListener("click", (e) => {
    if (modal) {
      closeModal(e);
    }
  });
}

// Ajouter des écouteurs d'événements pour ouvrir les modales
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

// Ajouter un écouteur d'événements à la croix de fermeture de la modal
const closeButton = document.querySelector(".js-modal-close");
if (closeButton) {
  closeButton.addEventListener("click", closeModal);
}
