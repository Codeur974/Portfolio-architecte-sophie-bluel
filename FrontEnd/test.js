document;
function createCategoryButtons() {
  const categories = [...new Set(data.map((item) => item.category.name))]; // Récupérer les catégories uniques
  const buttonContainer = document.querySelector(".button-container"); // Assurez-vous d'avoir un conteneur pour les boutons

  // Créer un bouton pour chaque catégorie
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.classList.add("category-button");
    button.addEventListener("click", () => filtreByCategory(category));
    buttonContainer.appendChild(button);
  });

  // Créer un bouton pour afficher toutes les photos
  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.classList.add("category-button");
  allButton.addEventListener("click", showAllButton);
  buttonContainer.appendChild(allButton);
}

// Appeler la fonction pour créer les boutons de catégorie
createCategoryButtons();

// Afficher toutes les photos par défaut
showAllButton();
