document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Validation de l'email avec regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorMessage.textContent = "Veuillez entrer une adresse e-mail valide.";
      return;
    }

    // Validation du mot de passe
    if (password.trim() === "") {
      errorMessage.textContent = "Veuillez entrer un mot de passe.";
      return;
    }
    // Envoyer les informations de connexion au serveur
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Erreur réseau");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Réponse du serveur:", data); // Afficher les données dans la console

        // Vérifier si l'API retourne des données
        if (data.token && data.userId) {
          // Connexion réussie
          console.log("Connexion réussie"); // Afficher "Connexion réussie" dans la console

          // Stocker le token et l'userID dans le localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("userID", data.userId);
          localStorage.setItem("isLoggedIn", "true");

          window.location.href = "/mode-edit.html"; // Rediriger l'utilisateur vers la page d'accueil
        } else {
          // Afficher un message d'erreur
          const errorMessage = document.getElementById("error-message");
          throw new Error("E-mail ou mot de passe incorrect");
        }
      })
      .catch((error) => {
        console.log("E-mail ou mot de passe incorrect");
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "E-mail ou mot de passe incorrect";
      });
  });
