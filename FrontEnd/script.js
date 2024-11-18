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

    //gestion page edit si l'utilisateur est connecté

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      document.querySelectorAll("button").forEach((button) => {
        button.style.display = "none";

        //creer un lien pour modifier
        if (!document.querySelector(".js-modal")) {
          // Créer le bouton "Modifier"
          const modifyButton = document.createElement("a");
          modifyButton.href = "#modal1";
          modifyButton.classList.add("js-modal");
          modifyButton.innerHTML =
            '<i class="fa-solid fa-pen-to-square"></i>Modifier';

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
        const loginButton = document.getElementById("loginButton");
        if (loginButton) {
          loginButton.innerHTML = '<a href="/index.html">Logout</a>';
          loginButton.id = "logoutButton"; // Changez l'ID pour éviter les conflits
        }
        if (!document.querySelector(".top-bar")) {
          const topBar = document.createElement("div");
          topBar.classList.add("top-bar");
          topBar.innerHTML =
            '<i class="fa-solid fa-pen-to-square"></i>Mode édition';
          document.body.insertBefore(topBar, document.body.firstChild);
        }
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

        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(title);
        mainGallery.appendChild(figure);

        // Ajouter uniquement l'image au conteneur de la modal
        const modalFigure = document.createElement("figure");
        modalFigure.classList.add("photo");
        const modalImg = document.createElement("img");
        modalImg.src = item.imageUrl;
        modalImg.alt = item.name;
        modalFigure.appendChild(modalImg);
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
