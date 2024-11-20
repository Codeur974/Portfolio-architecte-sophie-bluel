fetch("http://localhost:5678/api/works")
  .then((response) => response.json())

  .then((data) => {
    console.log(data);
    //creation d'un boutton
    // Créer une div pour contenir les boutons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("Elmt");

    // Ajouter la div au DOM, par exemple, avant la galerie
    const galleryContainer = document.querySelector(".gallery");
    galleryContainer.parentNode.insertBefore(buttonContainer, galleryContainer);
    const filtreByCategory = (categoryName) => {
      const filteredData = data.filter(
        (item) => item.category.name === categoryName
      );
      const photoContainer = document.querySelector(".gallery");
      photoContainer.innerHTML = "";

      filteredData.forEach((item) => {
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
      }); //
    };
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.classList.add("category-button");
    allButton.addEventListener("click", showAllButton);
    buttonContainer.appendChild(allButton);

    function filterButton() {
      const categories = [...new Set(data.map((item) => item.category.name))];

      categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.classList.add("category-button");
        button.addEventListener("click", () => filtreByCategory(category));
        buttonContainer.appendChild(button);
      });
    }
    function showAllButton() {
      const photoContainer = document.querySelector(".gallery");
      photoContainer.innerHTML = "";
      data.forEach((item) => {
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
        photoContainer.appendChild(figure);
        figure.appendChild(title);
      });
    }
    filterButton();

    showAllButton();

    let modal = null;

    const openModal = function (e) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute("href"));
      const overlay = document.getElementById("modal-overlay");
      if (target) {
        target.style.display = "block"; // Assurez-vous que la modal est visible
        overlay.style.display = "block"; // Affichez l'overlay
        target.removeAttribute("aria-hidden");
        target.setAttribute("aria-modal", "true");
        modal = target;
        modal.addEventListener("click", closeModal);
        const stopElement = modal.querySelector(".js-modal-stop");
        if (stopElement) {
          stopElement.addEventListener("click", (e) => {
            if (!e.target.classList.contains("add-Photo")) {
              stopPropagation(e);
            }
          });
        } else {
          console.error(
            "L'élément avec la classe 'js-modal-stop' n'a pas été trouvé."
          );
        }
        const closeButton = modal.querySelector(".js-modal-close");
        if (closeButton) {
          closeButton.style.display = "block"; // Assurez-vous que le bouton est visible
          closeButton.addEventListener("click", closeModal);
        }
        const addPhotoButton = modal.querySelector(".add-Photo");
        if (addPhotoButton) {
          addPhotoButton.style.display = "block"; // Assurez-vous que le bouton est visible
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
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
        modal.removeEventListener("click", closeModal);
        const stopElement = modal.querySelector(".js-modal-stop");
        if (stopElement) {
          stopElement.removeEventListener("click", stopPropagation);
        }
        const closeButton = modal.querySelector(".js-modal-close");
        if (closeButton) {
          closeButton.removeEventListener("click", closeModal);
        }
      });
      const overlay = document.getElementById("modal-overlay");
      overlay.style.display = "none"; // Masquez l'overlay
      modal = null;
    };

    const stopPropagation = function (e) {
      console.log("stopPropagation called"); // Log pour vérifier que la fonction est appelée
      e.stopPropagation();
    };

    // Fermer la modal avec la touche "Escape"
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
      }
    }); // Fermer la modal lorsque vous cliquez sur l'overlay
    const overlay = document.getElementById("modal-overlay");
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (modal) {
          closeModal(e);
        }
      });
    }

    const openAddPhotoModal = function (e) {
      e.preventDefault();
      e.stopPropagation(); // Empêcher la propagation de l'événement de clic
      const addPhotoModal = document.getElementById("modal2");
      const overlay = document.getElementById("modal-overlay");
      if (addPhotoModal) {
        addPhotoModal.style.display = "block"; // Assurez-vous que la modal est visible
        overlay.style.display = "block"; // Affichez l'overlay
        addPhotoModal.removeAttribute("aria-hidden");
        addPhotoModal.setAttribute("aria-modal", "true");
        modal = addPhotoModal;
        modal.addEventListener("click", closeModal);
        const stopElement = modal.querySelector(".js-modal-stop");
        if (stopElement) {
          stopElement.addEventListener("click", stopPropagation);
        } else {
          console.error(
            "L'élément avec la classe 'js-modal-stop' n'a pas été trouvé."
          );
        }
        const closeButton = modal.querySelector(".js-modal-close");
        if (closeButton) {
          closeButton.style.display = "block"; // Assurez-vous que le bouton est visible
          closeButton.addEventListener("click", closeModal);
        }

        // Ajouter un écouteur d'événements pour afficher l'aperçu de la photo
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
        }); // Ajouter un écouteur d'événements pour gérer l'envoi des données
        const addPhotoForm = document.getElementById("addPhotoForm");
        addPhotoForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const formData = new FormData(addPhotoForm);
          const token = localStorage.getItem("token"); // Récupérer le jeton d'authentification
          console.log("Token:", token); // Log pour vérifier le jeton

          if (!token) {
            console.error("Token non trouvé");
            return;
          }
          console.log("FormData entries:", Array.from(formData.entries())); // Log pour vérifier les données envoyées
          fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`, // Ajouter le jeton d'authentification aux en-têtes
            },
            body: formData,
          })
            .then((response) => {
              console.log("Raw response:", response); // Log pour vérifier la réponse brute
              if (!response.ok) {
                return response.text().then((text) => {
                  // Lire la réponse en tant que texte
                  console.error("Erreur du serveur:", text); // Afficher le texte de l'erreur
                  throw new Error(`HTTP error! status: ${response.status}`);
                });
              }
              return response.json();
            })
            .then((data) => {
              console.log("Photo ajoutée avec succès:", data);
              // Ajouter la nouvelle image au DOM
              const mainGallery = document.querySelector(".main-gallery");
              const figure = document.createElement("figure");
              figure.classList.add("photo");
              figure.id = `photo-${data.id}`; // Utilisez l'ID retourné par le serveur

              const img = document.createElement("img");
              img.src = data.imageUrl; // Assurez-vous que le chemin est correct
              img.alt = data.title;

              const figcaption = document.createElement("figcaption");
              figcaption.textContent = data.title;

              figure.appendChild(img);
              figure.appendChild(figcaption);
              mainGallery.appendChild(figure);

              closeModal(e); // Fermer la modal après l'ajout de la photo
              const galleryModal = document.getElementById("modal1");
              if (galleryModal) {
                galleryModal.style.display = "none";
                galleryModal.setAttribute("aria-hidden", "true");
                galleryModal.removeAttribute("aria-modal");
              } // Actualiser la page après l'ajout de la photo
              window.location.reload();
            })
            .catch((error) => {
              console.error("Erreur lors de l'ajout de la photo:", error);
            });
        });
      } else {
        console.error("La modal 'Ajouter une photo' n'a pas été trouvée.");
      }
    };
    const deletePhoto = function (photoId) {
      const token = localStorage.getItem("token"); // Récupérer le jeton d'authentification
      fetch(`http://localhost:5678/api/works/${photoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le jeton d'authentification aux en-têtes
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log(`Photo avec l'ID ${photoId} supprimée avec succès`);
          // Supprimer l'élément de la galerie principale
          const photoElement = document.getElementById(`photo-${photoId}`);
          if (photoElement) {
            photoElement.remove();
          } else {
            console.error(
              `L'élément avec l'ID photo-${photoId} n'a pas été trouvé.`
            );
          }
          // Supprimer l'élément de la modal
          const modalPhotoElement = document.getElementById(`photo-${photoId}`);
          if (modalPhotoElement) {
            modalPhotoElement.remove();
          } else {
            console.error(
              `L'élément avec l'ID photo-${photoId} n'a pas été trouvé dans la modal.`
            );
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de la photo:", error);
        });
    };

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      // Ajouter dynamiquement une barre noire en haut de la page avec le texte "Mode Édition" centré
      if (!document.querySelector(".top-bar")) {
        const topBar = document.createElement("div");
        topBar.classList.add("top-bar");
        topBar.textContent = "Mode Édition";
        document.body.insertBefore(topBar, document.body.firstChild);
      }

      // Modifier dynamiquement le texte du bouton de connexion en "Logout"
      const loginButton = document.getElementById("loginButton");
      if (loginButton) {
        loginButton.innerHTML = '<a href="/index.html">Logout</a>';
        loginButton.id = "logoutButton"; // Changez l'ID pour éviter les conflits
      }

      // Vérifiez si le bouton "Modifier" existe déjà
      if (!document.querySelector(".js-modal")) {
        // Créer le bouton "Modifier"
        const modifyButton = document.createElement("a");
        modifyButton.href = "#modal1";
        modifyButton.classList.add("js-modal");
        modifyButton.innerHTML =
          '<i class="fa-solid fa-pen-to-square"></i>Modifier';

        // Ajouter le bouton "Modifier" à côté du titre "Mes Projets"
        const portfolioSection = document.querySelector("#portfolio");
        const title = portfolioSection.querySelector("h2.buttonImage");
        if (title) {
          // Créer une div englobante pour le titre et le bouton
          const titleContainer = document.createElement("div");
          titleContainer.classList.add("title-container");

          // Ajouter le titre et le bouton à la div englobante
          titleContainer.appendChild(title);
          titleContainer.appendChild(modifyButton);

          // Ajouter la div englobante à la section portfolio
          portfolioSection.insertBefore(
            titleContainer,
            portfolioSection.firstChild
          );
        }

        // Ajouter un écouteur d'événements pour ouvrir la modal
        modifyButton.addEventListener("click", openModal);
      }
      // Ajouter un écouteur d'événements pour ouvrir la modal 1 lorsque la top bar est cliquée
      const topBar = document.querySelector(".top-bar");
      if (topBar) {
        topBar.addEventListener("click", (e) => {
          const modal1 = document.getElementById("modal1");
          if (modal1) {
            openModal({ target: modal1, preventDefault: () => {} });
          }
        });
      }
    }

    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        // Supprimer les informations de connexion du localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("isLoggedIn");

        // Rediriger vers la page d'accueil
        window.location.href = "/index.html";
      });
    }

    // Ajouter des écouteurs d'événements pour ouvrir la modal
    document.querySelectorAll(".js-modal").forEach((a) => {
      a.addEventListener("click", openModal);
    });

    // Fonction pour afficher les images dans les deux conteneurs
    const showImages = function (data) {
      const mainGallery = document.querySelector(".main-gallery");
      const modalGallery = document.querySelector(".modal-gallery");

      // Vérifiez que les éléments existent
      if (!mainGallery || !modalGallery) {
        console.error(
          "Les éléments 'mainGallery' ou 'modalGallery' n'ont pas été trouvés."
        );
        return;
      }

      // Vider les conteneurs avant d'ajouter les nouveaux éléments
      mainGallery.innerHTML = "";
      modalGallery.innerHTML = "";

      data.forEach((item) => {
        const figure = document.createElement("figure");
        figure.classList.add("photo");
        figure.id = `photo-${item.id}`; // Ajouter un ID unique pour chaque photo

        const img = document.createElement("img");
        img.src = item.imageUrl;
        img.alt = item.name;

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = item.name;

        figure.appendChild(figcaption);

        mainGallery.appendChild(figure);

        // Ajouter uniquement l'image au conteneur de la modal
        const modalFigure = document.createElement("figure");
        modalFigure.classList.add("photo");
        modalFigure.id = `photo-${item.id}`; // Ajouter un ID unique pour chaque photo
        const modalImg = document.createElement("img");
        modalImg.src = item.imageUrl;
        modalImg.alt = item.name;
        modalFigure.appendChild(modalImg);

        // Ajouter l'icône de suppression
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa", "fa-trash-can", "delete-icon");
        deleteIcon.addEventListener("click", () => deletePhoto(item.id));
        modalFigure.appendChild(deleteIcon);

        modalGallery.appendChild(modalFigure);

        // Logs pour déboguer
        console.log("Image ajoutée à la galerie principale :", img.src);
        console.log("Image ajoutée à la modale :", modalImg.src);
      });
    };

    // Requête à l'API pour récupérer les données des images
    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((data) => {
        showImages(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des images:", error);
      });
  });
