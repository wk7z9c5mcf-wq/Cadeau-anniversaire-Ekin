const CODE_CORRECT = "2209";
let redirectionEnCours = false;

function addNumber(number) {
  const input = document.getElementById("codeInput");
  if (input && input.value.length < 4) {
    input.value += number;
    updateCodeDisplay();
  }
}

function deleteLastDigit() {
  const input = document.getElementById("codeInput");
  if (input) {
    input.value = input.value.slice(0, -1);
    updateCodeDisplay();
  }
}

function clearCode() {
  const input = document.getElementById("codeInput");
  if (input) {
    input.value = "";
    updateCodeDisplay();
  }
}

function updateCodeDisplay() {
  const input = document.getElementById("codeInput");
  const slots = document.querySelectorAll(".code-slot");
  if (!input) return;

  slots.forEach((slot, index) => {
    slot.textContent = input.value[index] || "♥";
    slot.classList.toggle("filled", Boolean(input.value[index]));
  });
}

function checkCode() {
  const input = document.getElementById("codeInput");
  const message = document.getElementById("accessMessage");

  if (!input || !message) return;

  if (input.value !== CODE_CORRECT) {
    message.textContent = "Code incorrect. Réessaie.";
    input.value = "";
    return;
  }

  if (redirectionEnCours) return;
  redirectionEnCours = true;

  message.textContent = "Code accepté ! Bienvenue dans le dossier 🎉";
  lancerFeuxArtifice();

  setTimeout(() => {
    window.location.href = "accueil.html";
  }, 2300);
}

function lancerFeuxArtifice() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "9999"
  });
  document.body.appendChild(canvas);

  const particules = [];
  const couleurs = ["#ff4f81", "#ffd166", "#ffffff", "#b388ff", "#ff8c42"];
  const debut = performance.now();
  let dernierTir = 0;

  function creerExplosion() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.65;
    const couleur = couleurs[Math.floor(Math.random() * couleurs.length)];

    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const vitesse = 1 + Math.random() * 4;
      particules.push({
        x, y,
        vx: Math.cos(angle) * vitesse,
        vy: Math.sin(angle) * vitesse,
        vie: 1,
        couleur
      });
    }
  }

  function animer(maintenant) {
    const ecoule = maintenant - debut;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (ecoule < 1300 && maintenant - dernierTir > 300) {
      creerExplosion();
      dernierTir = maintenant;
    }

    for (let i = particules.length - 1; i >= 0; i--) {
      const p = particules[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.035;
      p.vie -= 0.018;

      ctx.globalAlpha = Math.max(p.vie, 0);
      ctx.fillStyle = p.couleur;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();

      if (p.vie <= 0) particules.splice(i, 1);
    }

    ctx.globalAlpha = 1;

    if (ecoule < 2000) {
      requestAnimationFrame(animer);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(animer);
}
avatar.setAttribute("class", `avatar ${answer.pose} talking`);