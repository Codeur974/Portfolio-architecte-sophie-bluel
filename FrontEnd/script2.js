let worksData = [];
const form = document.getElementById("addPhotoForm");
const validateButton = document.querySelector(".valid-Form");
const photoFileInput = document.getElementById("photoFile");
const photoPreview = document.getElementById("photoPreview");
const addPhotoText = document.querySelector(".button-photo");
const photoInfo = document.getElementById("photo-info");
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("Elmt");
const galleryContainer = document.querySelector(".gallery");
galleryContainer.parentNode.insertBefore(buttonContainer, galleryContainer);
let modal = null;
const overlay = document.getElementById("modal-overlay");

//fonction pour récupérer les travaux

function fetchWorks() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      worksData = data;
      showImages(data);
      initializeCategories(data);
      filterButton();
      showAllButton();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des images:", error);
    });
}

//fonction pour afficher les images

const showImages = function (data) {
  const mainGallery = document.querySelector(".main-gallery");
  const modalGallery = document.querySelector(".modal-gallery");

  if (!mainGallery || !modalGallery) {
    console.error(
      "Les éléments 'mainGallery' ou 'modalGallery' n'ont pas été trouvés."
    );
    return;
  }

  mainGallery.innerHTML = "";
  modalGallery.innerHTML = "";

  data.forEach((item) => {
    const figure = document.createElement("figure");
    figure.classList.add("photo");
    figure.id = `photo-${item.id}`;

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.name;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = item.name;

    const title = document.createElement("h3");
    title.textContent = item.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    figure.appendChild(title);
    mainGallery.appendChild(figure);

    const modalFigure = document.createElement("figure");
    modalFigure.classList.add("photo");
    modalFigure.id = `modal-photo-${item.id}`;

    const modalImg = document.createElement("img");
    modalImg.src = item.imageUrl;
    modalImg.alt = item.name;
    modalFigure.appendChild(modalImg);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash-can", "delete-icon");
    deleteIcon.addEventListener("click", () => deletePhoto(item.id));
    modalFigure.appendChild(deleteIcon);

    modalGallery.appendChild(modalFigure);
  });
};

//fonction pour initialiser les catégories

function initializeCategories(data) {
  const categories = [
    ...new Map(data.map((item) => [item.category.id, item.category])).values(),
  ];
  console.log(categories);

  const categorySelect = document.getElementById("category");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

//fonctionpour pour afficher les boutons de filtre

function filterButton() {
  const categories = [...new Set(worksData.map((item) => item.category.name))];
  categories.sort();

  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.classList.add("category-button");
  allButton.addEventListener("click", showAllButton);
  buttonContainer.appendChild(allButton);

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.classList.add("category-button");
    button.addEventListener("click", () => filtreByCategory(category));
    buttonContainer.appendChild(button);
  });
}

//Fonction pour afficher les images par catégorie

const filtreByCategory = (categoryName) => {
  const filteredData = worksData.filter(
    (item) => item.category.name === categoryName
  );
  addItemsToGallery(filteredData);
};

//Fonction pour afficher toutes les images

const showAllButton = () => {
  addItemsToGallery(worksData);
};

//Fonction pour ajouter les éléments dans la galerie

function addItemsToGallery(items) {
  const photoContainer = document.querySelector(".gallery");
  photoContainer.innerHTML = "";

  items.forEach((item) => {
    const figure = document.createElement("figure");
    figure.classList.add("photo");

    const title = document.createElement("h3");
    title.textContent = item.title;

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.name;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = item.name;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    figure.appendChild(title);
    photoContainer.appendChild(figure);
  });
}

//Fonction pour suprimer une image

function deletePhoto(photoId) {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:5678/api/works/${photoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(`Photo avec l'ID ${photoId} supprimée avec succès`);

      const photoElement = document.getElementById(`photo-${photoId}`);
      if (photoElement) {
        console.log(`Suppression de l'élément avec l'ID photo-${photoId}`);
        photoElement.remove();
      } else {
        console.error(`L'élément avec l'ID photo-${photoId} est introuvable.`);
      }

      const modalPhotoElement = document.getElementById(
        `modal-photo-${photoId}`
      );
      if (modalPhotoElement) {
        console.log(
          `Suppression de l'élément avec l'ID modal-photo-${photoId}`
        );
        modalPhotoElement.remove();
      } else {
        console.error(
          `L'élément avec l'ID modal-photo-${photoId} est introuvable dans la modal.`
        );
      }

      return fetchWorks();
    })
    .then((data) => {
      worksData = data;
      showImages(data);
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de la photo:", error);
    });
}

//Fonction pour ouvrir et fermer la modal

const openModal = function (e) {
  e.preventDefault();
  const target = e.target.getAttribute("href")
    ? document.querySelector(e.target.getAttribute("href"))
    : e.target;
  if (target) {
    target.style.display = "block";
    overlay.style.display = "block";
    target.removeAttribute("inert");
    target.setAttribute("aria-modal", "true");
    modal = target;

    const modalContent = modal.querySelector(".modal-wrapper");
    if (modalContent) {
      modalContent.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    const closeButton = modal.querySelector(".js-modal-close");
    if (closeButton) {
      closeButton.style.display = "block";
      closeButton.addEventListener("click", closeModal);
    }
    const addPhotoButton = modal.querySelector(".add-Photo");
    if (addPhotoButton) {
      addPhotoButton.style.display = "block";
      addPhotoButton.addEventListener("click", openAddPhotoModal);
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

  overlay.style.display = "none";

  if (photoPreview) {
    photoPreview.src = "";
    photoPreview.style.display = "none";
  }
  if (addPhotoText) {
    addPhotoText.style.display = "block";
  }
  if (photoInfo) {
    photoInfo.style.display = "block";
  }

  modal = null;
};

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

if (overlay) {
  overlay.addEventListener("click", (e) => {
    if (modal) {
      closeModal(e);
    }
  });
}

//Fonction pour ouvrir la modal d'ajout d'image

const openAddPhotoModal = function (e) {
  e.preventDefault();
  const addPhotoModal = document.getElementById("modal2");
  if (addPhotoModal) {
    addPhotoModal.style.display = "block";
    overlay.style.display = "block";
    addPhotoModal.removeAttribute("inert");
    addPhotoModal.setAttribute("aria-modal", "true");
    modal = addPhotoModal;

    const modalContent = modal.querySelector(".modal-wrapper");
    if (modalContent) {
      modalContent.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    const closeButton = modal.querySelector(".js-modal-close");
    if (closeButton) {
      closeButton.style.display = "block";
      closeButton.addEventListener("click", closeModal);
    }

    const photoFileInput = document.getElementById("photoFile");
    const photoPreview = document.getElementById("photoPreview");
    photoFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          photoPreview.src = event.target.result;
          photoPreview.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });

    const addPhotoForm = document.getElementById("addPhotoForm");
    addPhotoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(addPhotoForm);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token non trouvé");
        return;
      }
      console.log("FormData entries:", Array.from(formData.entries()));

      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => {
          console.log("Raw response:", response);
          if (!response.ok) {
            return response.text().then((text) => {
              console.error("Erreur du serveur:", text);
              throw new Error(`HTTP error! status: ${response.status}`);
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Photo ajoutée avec succès:", data);
          return fetchWorks();
        })
        .then((data) => {
          worksData = data;
          showImages(data);
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la photo:", error);
        });
    });
  } else {
    console.error("La modal 'Ajouter une photo' n'a pas été trouvée.");
  }
};

//Verifier si l'utilisateur est connecté

const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
  if (!document.querySelector(".top-bar")) {
    const topBar = document.createElement("div");
    topBar.classList.add("top-bar");
    topBar.textContent = "Mode Édition";
    document.body.insertBefore(topBar, document.body.firstChild);
  }

  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.innerHTML = '<a href="/index.html">Logout</a>';
    loginButton.id = "logoutButton";
  }

  if (!document.querySelector(".js-modal")) {
    const modifyButton = document.createElement("a");
    modifyButton.href = "#modal1";
    modifyButton.classList.add("js-modal");
    modifyButton.innerHTML =
      '<i class="fa-solid fa-pen-to-square"></i>Modifier';

    const portfolioSection = document.querySelector("#portfolio");
    const title = portfolioSection.querySelector("h2.buttonImage");
    if (title) {
      const titleContainer = document.createElement("div");
      titleContainer.classList.add("title-container");
      titleContainer.appendChild(title);
      titleContainer.appendChild(modifyButton);
      portfolioSection.insertBefore(
        titleContainer,
        portfolioSection.firstChild
      );
    }

    modifyButton.addEventListener("click", openModal);
  }

  const topBar = document.querySelector(".top-bar");
  if (topBar) {
    topBar.addEventListener("click", (e) => {
      const modal1 = document.getElementById("modal1");
      if (modal1) {
        openModal({ target: modal1, preventDefault: () => {} });
      }
    });
  }

  const filters = document.querySelector(".Elmt");
  if (filters) {
    filters.style.display = "none";
  }
}

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/index.html";
  });
}

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

//Verifier la validité du formulaire

const checkFormValidity = () => {
  validateButton.disabled = !form.checkValidity();
};

form.addEventListener("input", checkFormValidity);
form.addEventListener("change", checkFormValidity);

checkFormValidity();

if (photoFileInput && photoPreview && addPhotoText) {
  photoFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        photoPreview.src = event.target.result;
        photoPreview.style.display = "block";
        addPhotoText.style.display = "none";
        photoInfo.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });
} else {
  console.error(
    "L'élément avec l'ID 'photoFile', 'photoPreview' ou 'button-photo' n'a pas été trouvé."
  );
}
//Initialisation de la page

fetchWorks();
