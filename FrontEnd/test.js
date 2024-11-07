document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Envoyer les informations de connexion au serveur
    fetch("http://localhost:5678/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Connexion réussie
          alert("Connexion réussie");
          // Rediriger vers une autre page après la connexion réussie
          window.location.href = "index.html";
        } else {
          // Afficher un message d'erreur
          const errorMessage = document.getElementById("error-message");
          errorMessage.textContent = "E-mail ou mot de passe incorrect";
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent =
          "Une erreur est survenue. Veuillez réessayer plus tard.";
      });
  });
