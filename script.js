let ajoutBtn = document.querySelector(".ajouterBtn");
let formContainerAjout = document.querySelector("#formContainerAjout");

function previewImage() {
  const url = document.querySelector("#photoUrl").value;
  const preview = document.querySelector("#imagePreview");
  
  if (url) {
    const img = document.createElement("img");
    img.src = url;
    img.className = "w-full h-full object-cover rounded-full";
    img.onerror = () => {
      preview.innerHTML = '<span class="text-sm text-red-400">Erreur de chargement</span>';
    };
    img.onload = () => {
      preview.innerHTML = "";
      preview.appendChild(img);
    };
  } else {
    preview.innerHTML = '<span class="text-sm text-zinc-400">Aucune image</span>';
  }
}

function hideForm() {
  formContainerAjout.classList.add("hidden");
  let form = formContainerAjout.querySelector("form");
  form.reset();
  document.querySelector("#imagePreview").innerHTML = '<span class="text-sm text-zinc-400">Aucune image</span>';
  
}

ajoutBtn.addEventListener("click", () => {
    formContainerAjout.classList.remove("hidden");
    formContainerAjout.classList.add("flex");
});

function addExperience() {
  let clone = experienceTemplate.content.cloneNode(true);
  let container = clone.querySelector("div");
  container.querySelector(".removeExpBtn").addEventListener("click", () => {
    container.remove();
  });
  experiencesList.append(container);
}


formContainerAjout.addEventListener("submit", (e) => {
  e.preventDefault();
  
  
  // Obtenir Les experiences Ajoutées
  let experiencedata = document.querySelectorAll(".experiencedata");
  let experience = [];
  
  experiencedata.forEach((exp) => {
    experience.push({
      poste: exp.querySelector('input[name="poste"]').value.trim(),
      entreprise: exp.querySelector('input[name="entreprise"]').value.trim(),
      debut: exp.querySelector("#debut").value,
      fin: exp.querySelector("#fin").value,
      description: exp.querySelector("textarea").value.trim()
    });
  });
  
  employe = {
    id : Date.now(),
    nom : document.querySelector('input[name="nom"]').value.trim(),
    role : document.querySelector("select").value,
    url : document.querySelector('input[name="url"]').value.trim(),
    email : document.querySelector('input[name="email"]').value.trim(),
    telephone : document.querySelector('input[name="telephone"]').value.trim(),
    experience : experience,
    localisation : "unsigned"
  };
})
