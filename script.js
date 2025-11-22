let ajoutBtn = document.querySelector(".ajouterBtn");
let formContainerAjout = document.querySelector("#formContainerAjout");
let form = formContainerAjout.querySelector("form");
let annulBtnForm = document.querySelector("#annulBtnForm");
let ajoutExperinceBtn = document.querySelector("#ajoutExperinceBtn");
let experienceTemplate = document.querySelector("#experienceTemplate");
let employesContainer = document.querySelector(".employesContainer");
let experiencesList = document.querySelector("#experiencesList");
let employesChooseContainer = document.querySelector("#employesChooseContainer");
let employesChoose = document.querySelector(".employesChoose");
let suppEmpChoose = document.querySelector("#suppEmpChoose");
let details = document.querySelector("#details");
let btnsAjout = document.querySelectorAll(".ajoutBtn");
let annulDetails = document.querySelector("#annulDetails");
let boxes = document.querySelectorAll(".boxes");
let box1 = document.querySelector(".box1");
let box2 = document.querySelector(".box2");
let box3 = document.querySelector(".box3");
let box4 = document.querySelector(".box4");
let box5 = document.querySelector(".box5");
let box6 = document.querySelector(".box6");
let employesAvailable;
let employes = [];
let employe;



function imageaperçu() {
  const url = document.querySelector("#photoUrl").value;
  const aperçu = document.querySelector("#imageAperçu");
  
  if (url) {
    const img = document.createElement("img");
    img.src = url;
    img.className = "w-full h-full object-cover rounded-full";
    aperçu.innerHTML = "";
    aperçu.appendChild(img);
  } else {
    aperçu.innerHTML = '<span class="text-sm text-zinc-400">Aucune image</span>';
  }
}


function cacherFormulaire() {
  formContainerAjout.classList.add("hidden");
  form.reset();

  document.querySelector("#imageAperçu").innerHTML = '<span class="text-sm text-zinc-400">Aucune image</span>';

  effacerErreurs();
}


function ajoutExperince() {
  let clone = experienceTemplate.content.cloneNode(true);
  let container = clone.querySelector("div");
  experiencesList.append(container);
  container.querySelector(".removeExpBtn").addEventListener("click", () => {
    container.remove();
  });
}


function remplirexperiences(experience){
  experience.forEach((exp) => {
      const profilContainerDetails = document.querySelector(".profilContainerDetails");
      const divExp = document.createElement("div");
      divExp.className = "exp w-full bg-zinc-800 border border-zinc-700 border-l-4 border-l-emerald-500 rounded-xl p-4 mt-4 hover:border-l-emerald-400 hover:shadow-lg";
      divExp.innerHTML = `
        <p class="text-lg font-bold text-emerald-500 mb-2">${exp.poste}</p>
        <p class="text-base text-zinc-400 italic mb-1">${exp.entreprise}</p>
        <p class="text-sm text-zinc-500">Début: ${exp.debut}</p>
        <p class="text-sm text-zinc-500 mb-2">Fin: ${exp.fin}</p>
        <p class="text-sm text-zinc-400 mt-2">${exp.description}</p>
      `;

      profilContainerDetails.append(divExp);
    });
}


function rempliremployee(employee) {
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

function detailsemploye(employee, experience) {
  employee.addEventListener("click", () => {
    details.classList.remove("hidden");
    details.innerHTML = `
    <p id="annulDetails" class="absolute top-4 right-6 text-4xl text-emerald-500 cursor-pointer hover:text-emerald-400">×</p>
    <div class="profilContainerDetails flex flex-col gap-3 items-center">
      <img src="${employe.url}" alt="${employe.nom}" class="h-28 w-28 rounded-full border-4 border-emerald-500 object-cover">
      <p class="text-2xl font-bold text-emerald-500 mt-2">${employe.nom}</p>
      <p class="text-lg font-semibold text-zinc-400 bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">${employe.role}</p>
      <p class="text-base text-zinc-300">${employe.email}</p>
      <p class="text-base text-zinc-300">${employe.telephone}</p>
      <p class="text-base text-emerald-400 font-semibold">${employe.localisation}</p>
      <h3 class="w-full text-xl font-bold text-center text-emerald-500 mt-6 pb-2 border-b-2 border-zinc-800">Expériences Professionnelles</h3>
    </div>
    `;
    remplirexperiences(experience);
    annulDetails.addEventListener("click", () => {
      details.classList.add("hidden");
    })
  });
}


// Fonction pour afficher un message d'erreur sous un input
function afficherErreurs(inputElement, message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message text-red-400 text-sm mt-1";
  errorDiv.textContent = message;
  
  inputElement.classList.add("border-red-500");
  inputElement.parentElement.append(errorDiv);
}

function effacerErreurs() {
  document.querySelectorAll(".error-message").forEach(msg => msg.remove());
  document.querySelectorAll("input, select, textarea").forEach(input => {
    input.classList.remove("border-red-500");
  });
}



function validationFormulaire() {
  effacerErreurs();
  const nomInput = document.querySelector('input[name="nom"]');
  const emailInput = document.querySelector('input[name="email"]');
  const telephoneInput = document.querySelector('input[name="telephone"]');
  const urlInput = document.querySelector('input[name="url"]');
  let isValid = true;

  if (!nomInput || !emailInput || !telephoneInput) {
    return !isValid;
  }

  const nom = nomInput.value.trim();
  const email = emailInput.value.trim();
  const telephone = telephoneInput.value.trim();
  const url = urlInput.value.trim();

  const nomRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telephoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
  // const telephoneRegex = /^\+?[0-9\s]{10}$/;
  const urlRegex = /^https?:\/\/.+\..+/;


  if (!nomRegex.test(nom)) {
    afficherErreurs(nomInput, "Le nom est invalide");
    isValid = false;
  }
  
  if (!emailRegex.test(email)) {
    afficherErreurs(emailInput, "Format d'email invalide");
    isValid = false;
  }
  
  if (!telephoneRegex.test(telephone)) {
    afficherErreurs(telephoneInput, "Format de téléphone invalide");
    isValid = false;
  }
  
  if (url && !urlRegex.test(url)) {
    afficherErreurs(urlInput, "Format d'URL invalide");
    isValid = false;
  }

  const experiencedata = document.querySelectorAll(".experiencedata");
  experiencedata.forEach((exp) => {
    const debutInput = exp.querySelector('input[name="debut"]');
    const finInput = exp.querySelector('input[name="fin"]');
    
    if (debutInput && finInput) {
      const debut = debutInput.value;
      const fin = finInput.value;
      
      if (debut > fin) {
        afficherErreurs(finInput, "La date de fin doit être postérieure à la date de début");
        isValid = false;
      }
    }
  });
  
  return isValid;
}




function remplissageExperience(experience){
  experience.forEach((exp) => {
      const profilContainerDetails = document.querySelector(".profilContainerDetails");
      const divExp = document.createElement("div");
      divExp.className = "exp w-full bg-zinc-800 border border-zinc-700 border-l-4 border-l-emerald-500 rounded-xl p-4 mt-4 hover:border-l-emerald-400 hover:shadow-lg";
      divExp.innerHTML = `
      <p class="text-lg font-bold text-emerald-500 mb-2">${exp.poste}</p>
        <p class="text-base text-zinc-400 italic mb-1">${exp.entreprise}</p>
        <p class="text-sm text-zinc-500">Début: ${exp.debut}</p>
        <p class="text-sm text-zinc-500 mb-2">Fin: ${exp.fin}</p>
        <p class="text-sm text-zinc-400 mt-2">${exp.description}</p>
      `;

      profilContainerDetails.append(divExp);
    });
}


function remplirEmployesChoisis(availableEmployees, salle, box) {
  employesChoose.innerHTML = '';
  let employesChosen = [];
  
  // Règles métier
  if (salle === "Salle des serveurs") {
    employesChosen = filtrerAvailableEmployees(availableEmployees, "IT");
    employesChosen.push(...filtrerAvailableEmployees(availableEmployees, "M"));
    employesChosen.push(...filtrerAvailableEmployees(availableEmployees, "N"));
  }
  if (salle === "Salle de sécurité") {
    employesChosen = filtrerAvailableEmployees(availableEmployees, "AS");
    employesChosen.push(...filtrerAvailableEmployees(availableEmployees, "M"));
    employesChosen.push(...filtrerAvailableEmployees(availableEmployees, "N"));
  }
  if (salle === "Réception") {
    employesChosen = filtrerAvailableEmployees(availableEmployees, "R");
    employesChosen.push(...filtrerAvailableEmployees(availableEmployees, "M"));
    employesChosen.push(...filtrerAvailableEmployees(availableEmployees, "N"));
  }
  if (salle === "Salle d'archives") {
    employesChosen = filtrerAvailableEmployees(availableEmployees, "M");
  }
  if (salle === "Salle de conférence" || salle === "Salle du personnel" ) {
    // Tous peuvent accéder
    employesChosen = [...availableEmployees];
  }

  if (employesChosen.length !== 0) {
    employesChosen.forEach((empchosen) => {
      let divEmp = document.createElement("div");
      divEmp.className = `employe flex pl-3 gap-x-3 rounded-2xl border-emerald-500 border-2 cursor-pointer hover:bg-zinc-700 transition-all mt-2`;
      divEmp.dataset.id = `${empchosen.id}`;
      divEmp.innerHTML = `
                  <div class="imageContainerProfil overflow-hidden mt-2 rounded-xl h-9 w-9">
                    <img class="w-full h-full object-cover" src="${empchosen.url}" alt="${empchosen.nom}"/>
                  </div>
                  <div class="infoEmploye mt-1">
                    <h5 class="font-extrabold text-zinc-500">${empchosen.nom}</h5>
                    <p class="roleEmploye font-bold text-zinc-500">${empchosen.role}</p>
                  </div>
              `;
      employesChoose.append(divEmp);

      divEmp.addEventListener("click", () => {
      let selectedbox = document.querySelector(`.box${box}`);
      if (selectedbox.children.length < 6) {
        empchosen.localisation = salle;
        ajouterEmployerSalle(empchosen, divEmp, box);
        employesChooseContainer.classList.add("hidden");
      }else{
        alert("La salle est pleine");
      }

      })
    })
}


function filtrerAvailableEmployees(paravailableEmployees,role) {
  let avemployes= [];
  paravailableEmployees.forEach((avemp) => {
    if (avemp.role === role) {
      avemployes.push(avemp);
    }
  })
  return avemployes;
}



ajoutBtn.addEventListener("click", () => {
      formContainerAjout.classList.remove("hidden");
      formContainerAjout.classList.add("flex");
});


formContainerAjout.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Validation du formulaire
  if (!validationFormulaire()) {
    return;
  }
  
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

  rempliremployee(employee);
  
  detailsemploye(employee, experience);
  
  employes.push(employe);

  employesContainer.append(employee);

  cacherFormulaire();
});


ajoutExperinceBtn.addEventListener("click", () => {
    ajoutExperince();
});


annulBtnForm.addEventListener("click", () => {
  cacherFormulaire();
});


btnsAjout.forEach(btn => {
    btn.addEventListener("click", () => {
        employesAvailable = [];
        employes.forEach((emp) => {
          if (emp.localisation === "unsigned"){
            employesAvailable.push(emp);
          }
        })

    if(btn.classList.contains("conferenceAjout")){
      remplirEmployesChoisis(employesAvailable, "Salle de conférence", 1);
    }
    if(btn.classList.contains("personnelAjout")){
      remplirEmployesChoisis(employesAvailable, "Salle du personnel", 5);
    }
    if(btn.classList.contains("serverAjout")){
      remplirEmployesChoisis(employesAvailable, "Salle des serveurs", 2);
    }
    if(btn.classList.contains("securiteAjout")){
      remplirEmployesChoisis(employesAvailable, "Salle de sécurité", 3);
    }
    if(btn.classList.contains("recepcionAjout")){
      remplirEmployesChoisis(employesAvailable, "Réception", 4);
    }
    if(btn.classList.contains("archiveAjout")){
      remplirEmployesChoisis(employesAvailable, "Salle d'archives", 6);
    }
});
});

