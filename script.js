let ajoutBtn = document.querySelector(".ajouterBtn");
let formContainerAjout = document.querySelector("#formContainerAjout");
let employes = [];
let employe;




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

function fillemployee(employee) {
  employee.className =
    "employe flex pl-3 gap-x-3 rounded-2xl border-emerald-500 border-2 cursor-pointer hover:bg-zinc-800 transition-all";
  employee.dataset.id = `${employe.id}`;
  employee.innerHTML = `
            <div class="imageContainerProfil overflow-hidden mt-2 rounded-xl h-9 w-9">
            <img class="w-full h-full object-cover" src="${employe.url}" alt="${employe.nom}"/>
            </div>
            <div class="infoEmploye mt-1">
            <h5 class="font-extrabold text-zinc-500">${employe.nom}</h5>
            <p class="roleEmploye font-bold text-zinc-500">${employe.role}</p>
            </div>
            `;
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

  const employee = document.createElement("div");

  fillemployee(employee);
  employes.push(employe);
})
