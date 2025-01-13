document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessageElement = document.getElementById("error-message");
    // Réinitialiser le message d'erreur au début

    errorMessageElement.style.display = "none";
    errorMessageElement.textContent = "";

    try {
      // Envoyer les informations de connexion au serveur
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(response);

      if (response.status === 200) {
        const data = await response.json();
        console.log("Réponse du serveur:", data); // Afficher les données dans la console

        // Vérifier si l'API retourne des données
        if (data.token && data.userId) {
          // Connexion réussie
          console.log("Connexion réussie"); // Afficher "Connexion réussie" dans la console

          // Stocker le token et l'userID dans le localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("userID", data.userId);
          localStorage.setItem("isLoggedIn", "true");

          window.location.href = "/index.html"; // Rediriger l'utilisateur vers la page d'accueil
        } else {
          throw new Error("Données de connexion invalides.");
        }
      } else if (response.status === 401) {
        throw new Error(" mot de passe incorrect");
      } else if (response.status === 404) {
        throw new Error("Utilisateur non trouvé");
      } else {
        throw new Error("Une erreur est survenue");
      }
    } catch (error) {
      // Afficher l'erreur dans le conteneur d'erreur
      errorMessageElement.style.display = "block";
      errorMessageElement.textContent = error.message;
    }
  });
