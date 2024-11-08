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

    function filtreButton(text, className, onClickHandler) {
      const button = document.createElement("button");
      console.log(button);

      button.textContent = text;
      button.classList.add(className);
      button.addEventListener("click", onClickHandler);
      buttonContainer.appendChild(button);
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

    filtreButton("tous", "buttonElmt", showAllButton);
    // Appeler la fonction createButton pour ajouter un bouton
    filtreButton(
      "Objets",
      "buttonElmt",
      () => {
        console.log(data[0].category.name);
        // Filtrer les éléments dont la catégorie est "Appartements"
        const filteredData = data.filter(
          (item) => item.category.name === "Objets"
        );
        // Afficher les éléments filtrés dans la console
        console.log("Objets:", filteredData);

        // Sélectionner le conteneur où les éléments filtrés seront affichés
        const photoContainer = document.querySelector(".gallery");

        // Vider le conteneur avant d'ajouter les nouveaux éléments
        photoContainer.innerHTML = "";

        // Ajouter les éléments filtrés au conteneur
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
        });
      }
      // Ajouter le bouton au parent de l'élément
    );
    filtreButton("Appartements", "buttonElmt", () => {
      console.log(data[0].category.name);
      // Filtrer les éléments dont la catégorie est "Appartements"
      const filteredData = data.filter(
        (item) => item.category.name === "Appartements"
      );
      // Afficher les éléments filtrés dans la console
      console.log("Appartements:", filteredData);

      // Sélectionner le conteneur où les éléments filtrés seront affichés
      const photoContainer = document.querySelector(".gallery");

      // Vider le conteneur avant d'ajouter les nouveaux éléments
      photoContainer.innerHTML = "";

      // Ajouter les éléments filtrés au conteneur
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
      });
    });
    filtreButton("Hôtels & Restaurants", "buttonElmt", () => {
      console.log(data[0].category.name);
      // Filtrer les éléments dont la catégorie est "Appartements"
      const filteredData = data.filter(
        (item) => item.category.name === "Hotels & restaurants"
      );
      // Afficher les éléments filtrés dans la console
      console.log("Hôtels & Restaurant:", filteredData);

      // Sélectionner le conteneur où les éléments filtrés seront affichés
      const photoContainer = document.querySelector(".gallery");

      // Vider le conteneur avant d'ajouter les nouveaux éléments
      photoContainer.innerHTML = "";

      // Ajouter les éléments filtrés au conteneur
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
      });
    });
    showAllButton();
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      document.querySelectorAll("button").forEach((button) => {
        button.style.display = "none";
      });
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
        const addPhotoButton = modal.querySelector(".add-Photo");
        if (addPhotoButton) {
          addPhotoButton.style.display = "block"; // Assurez-vous que le bouton est visible
        }
      } else {
        console.error("La cible de la modal n'a pas été trouvée.");
      }
    };

    const closeModal = function (e) {
      if (modal === null) return;
      e.preventDefault();
      modal.style.display = "none";
      const overlay = document.getElementById("modal-overlay");
      overlay.style.display = "none"; // Masquez l'overlay
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

      modal = null;
    };

    const stopPropagation = function (e) {
      console.log("stopPropagation called"); // Log pour vérifier que la fonction est appelée
      e.stopPropagation();
    };
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
      }
    });

    document.querySelectorAll(".js-modal").forEach((a) => {
      a.addEventListener("click", openModal);
    }); // Fonction pour afficher les images dans les deux conteneurs
    const showImages = function (data) {
      const mainGallery = document.querySelector(".main-gallery");
      const modalGallery = document.querySelector(".modal-gallery");

      // Vider les conteneurs avant d'ajouter les nouveaux éléments
      mainGallery.innerHTML = "";
      modalGallery.innerHTML = "";

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

        // Ajouter l'image, le titre et la légende au conteneur principal
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(title);
        mainGallery.appendChild(figure);

        // Créer la figure pour la modal
        const modalFigure = document.createElement("figure");
        modalFigure.classList.add("photo");

        const modalImg = document.createElement("img");
        modalImg.src = item.imageUrl;
        modalImg.alt = item.name;

        // Ajouter l'icône de suppression
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa", "fa-trash-can", "delete-icon");
        deleteIcon.addEventListener("click", () => {
          modalFigure.remove();
        });

        // Ajouter uniquement l'image au conteneur de la modal
        modalFigure.appendChild(modalImg);
        modalFigure.appendChild(deleteIcon);
        modalGallery.appendChild(modalFigure);
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
