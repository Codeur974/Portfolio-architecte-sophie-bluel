document;
// Ajouter un écouteur d'événements pour la flèche de retour
const backArrow = document.querySelector(".fa-arrow-left");
if (backArrow) {
  backArrow.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(e); // Fermer la modal actuelle
    const previousModal = document.getElementById("modal1");
    if (previousModal) {
      previousModal.style.display = "block"; // Afficher la modal précédente
      previousModal.removeAttribute("inert");
      previousModal.setAttribute("aria-modal", "true");
      modal = previousModal;
    }
  });
}
