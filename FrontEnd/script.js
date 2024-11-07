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
  });
