let ajoutBtn = document.querySelector(".ajouterBtn");
let formContainerAjout = document.querySelector("#formContainerAjout");
let annulBtnForm = document.querySelector("#annulBtnForm");
let addExperienceBtn = document.querySelector("#addExperienceBtn");
let experienceTemplate = document.querySelector("#experienceTemplate");
let employesContainer = document.querySelector(".employesContainer");
let experiencesList = document.querySelector("#experiencesList");
let employesChooseContainer = document.querySelector("#employesChooseContainer");
let employesChoose = document.querySelector(".employesChoose");
let suppEmpChoose = document.querySelector("#suppEmpChoose");
let details = document.querySelector("#details");
let btnsAjout = document.querySelectorAll(".ajoutBtn");
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



// Fonction pour mettre à jour l'image 
function previewImage() {
  const url = document.querySelector("#photoUrl").value;
  const preview = document.querySelector("#imagePreview");
  
  if (url) {
    const img = document.createElement("img");
    img.src = url;
    img.className = "w-full h-full object-cover rounded-full";
    preview.innerHTML = "";
    preview.appendChild(img);
  } else {
    preview.innerHTML = '<span class="text-sm text-zinc-400">Aucune image</span>';
  }
}

// Fonction pour cacher le formulaire
function hideForm() {
  formContainerAjout.classList.add("hidden");
  let form = formContainerAjout.querySelector("form");
  form.reset();
  document.querySelector("#imagePreview").innerHTML = '<span class="text-sm text-zinc-400">Aucune image</span>';
  // Supprimer tous les messages d'erreur
  clearAllErrors();
}

// Fonction pour ajouter une experience
function addExperience() {
  let clone = experienceTemplate.content.cloneNode(true);
  let container = clone.querySelector("div");
  container.querySelector(".removeExpBtn").addEventListener("click", () => {
    container.remove();
  });
  experiencesList.append(container);
}

// Fonction pour remplir les experiences
function filexperiences(experience){
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

// Fonction pour ajouter un employé
function fillemployee(employee) {
  employee.className =
    "employe flex pl-3 gap-x-3 rounded-2xl border-emerald-500 border-2 cursor-pointer hover:bg-zinc-800 transition-all";
  employee.dataset.id = `${employe.id}`;
  employee.innerHTML = `
            <div class="imageContainerProfil overflow-hidden mt-2 rounded-xl h-9 w-[20%]">
            <img class="w-full h-full object-cover" src="${employe.url}" alt="${employe.nom}"/>
            </div>
            <div class="infoEmploye mt-1 w-[75%] ">
            <h5 class="font-extrabold max-w-[95%] truncate text-zinc-500">${employe.nom}</h5>
            <p class="roleEmploye font-bold max-w-[95%] truncate text-zinc-500">${employe.role}</p>
            </div>
            `;
} 
// Fonction pour afficher les détails d'un employé
function detailsemploye(employee, experience) {
  employee.addEventListener("click", () => {
    details.classList.remove("hidden");
    details.innerHTML = `
    <p id="annulDetails" class="absolute top-4 right-6 text-4xl text-emerald-500 cursor-pointer hover:text-emerald-400">×</p>
    <div class="profilContainerDetails flex flex-col gap-3 items-center">
      <img src="${employe.url}" alt="${employe.nom}" class="h-28 w-28 rounded-full border-4 border-emerald-500 object-cover">
      <p class="text-2xl text-center font-bold text-emerald-500 mt-2">${employe.nom}</p>
      <p class="text-lg font-semibold text-zinc-400 bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700">${employe.role}</p>
      <p class="text-base text-zinc-300">${employe.email}</p>
      <p class="text-base text-zinc-300">${employe.telephone}</p>
      <p class="text-base text-emerald-400 font-semibold">${employe.localisation}</p>
      <h3 class="w-full text-xl font-bold text-center text-emerald-500 mt-6 pb-2 border-b-2 border-zinc-800">Expériences Professionnelles</h3>
    </div>
    `;
    filexperiences(experience);
    document.querySelector("#annulDetails").addEventListener("click", () => {
      details.classList.add("hidden");
    })
  });
}

// Fonction pour afficher un message d'erreur sous un input
function afficherErrors(inputElement, message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message text-red-400 text-sm mt-1";
  errorDiv.textContent = message;
  
  inputElement.classList.add("border-red-500");
  inputElement.parentElement.appendChild(errorDiv);
}

// Fonction pour supprimer tous les messages d'erreur
function clearAllErrors() {
  document.querySelectorAll(".error-message").forEach(msg => msg.remove());
  document.querySelectorAll("input, select, textarea").forEach(input => {
    input.classList.remove("border-red-500");
  });
}

// Fonction pour valider le formulaire par REGEX
function validateForm() {
  clearAllErrors();
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
  
  const nomRegex = /^[a-zA-Z\s]{5,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telephoneRegex = /^\+?[0-9\s]{10}$/;
  const urlRegex = /^https?:\/\/.+\..+/;
  
  
  if (!nomRegex.test(nom)) {
    afficherErrors(nomInput, "Le nom est invalide");
    isValid = false;
  }
  
  if (!emailRegex.test(email)) {
    afficherErrors(emailInput, "Format d'email invalide");
    isValid = false;
  }
  
  if (!telephoneRegex.test(telephone)) {
    afficherErrors(telephoneInput, "Format de téléphone invalide");
    isValid = false;
  }
  
  if (url && !urlRegex.test(url)) {
    afficherErrors(urlInput, "Format d'URL invalide");
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
        afficherErrors(finInput, "La date de fin doit être postérieure à la date de début");
        isValid = false;
      }
    }
  });
  
  return isValid;
}

// Fonction pour filtrer les employé non-assignés selon les roles ayant accés au salle séléctionnée
function filtrerAvailableEmployees(paravailableEmployees,role) {
  let avemployes= [];
  paravailableEmployees.forEach((avemp) => {
    if (avemp.role === role) {
      avemployes.push(avemp);
    }
  })
  return avemployes;
}

// Fonction pour ajuster la couleur des salles
function updateBoxColor(boxElement) {
  const employesInBox = boxElement.querySelectorAll(".employe");
  
  // Les zones qui doivent être en rouge si vides (sauf box1=Conférence et box5=Personnel)
  if (boxElement === box2 || boxElement === box3 || boxElement === box4 || boxElement === box6) {
    if (employesInBox.length === 0) {
      boxElement.classList.add("bg-red-600/30");
      boxElement.classList.add("border-red-500/50");
      boxElement.classList.remove("border-emerald-500/30");
    } else {
      boxElement.classList.remove("bg-red-600/30");
      boxElement.classList.remove("border-red-500/50");
      boxElement.classList.add("border-emerald-500/30");
    }
  }
}

// Fonction d'un employe non-assignés au modal pour choisir les employés
function ajoutEmployeUnsigned(employee, emp) {
  employee.className = "employe flex pl-3 gap-x-3 rounded-2xl border-emerald-500 border-2 cursor-pointer hover:bg-zinc-800 transition-all";
  employee.dataset.id = `${emp.id}`;
  employee.innerHTML = `
            <div class="imageContainerProfil overflow-hidden mt-2 rounded-xl h-9 w-9">
            <img class="w-full h-full object-cover" src="${emp.url}" alt="${emp.nom}"/>
            </div>
            <div class="infoEmploye mt-1 flex-1">
            <h5 class="font-extrabold text-zinc-500">${emp.nom}</h5>
            <p class="roleEmploye font-bold text-zinc-500">${emp.role}</p>
            </div>
  `;
  
  detailsemploye(employee, emp.experience);
}

// Fonction d'un employe non-assignés au modal pour choisir les employés
function fillEmployesChoose(availableEmployees, salle, box) {
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
                    <h5 class="font-extrabold max-w-[95%] truncate text-zinc-500">${empchosen.nom}</h5>
                    <p class="roleEmploye font-bold max-w-[95%] truncate text-zinc-500">${empchosen.role}</p>
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
        showMessageFullRoom();
      }

      })
    })
  } else {
    employesChoose.innerHTML = '<p class="text-zinc-400 text-center p-4">Aucun employé éligible pour cette zone</p>';
  }
  
  employesChooseContainer.classList.remove("hidden");
}


function ajouterEmployerSalle(empchosen, divEmp, boxNumber) {
  let selectedbox = document.querySelector(`.box${boxNumber}`);
  
  let empLocal = document.createElement("div");
  empLocal.className = "employe flex w-28 pl-2 py-1 bg-zinc-900 gap-x-2 rounded-xl border-emerald-500 border-2 hover:scale-105 transition-all cursor-pointer";
  empLocal.dataset.id = empchosen.id;
  empLocal.innerHTML = `
                    <div class="imageContainerProfi overflow-hidden rounded-lg h-8 w-[30%]">
                      <img class="w-full h-full object-cover" src="${empchosen.url}" alt="${empchosen.nom}"/>
                    </div>
                    <div class="infoEmploye w-[70%] flex items-center justify-between">
                      <div class="w-[80%]">
                        <h5 class="text-xs font-bold max-w-[95%] truncate text-zinc-400">${empchosen.nom}</h5>
                        <p class="roleEmploye text-xs max-w-[95%] truncate text-zinc-400">${empchosen.role}</p>
                      </div>
                      <button class="annulEmp text-emerald-500 rounded-full w-5 h-5 flex items-center justify-center text-sm ml-1">×</button>
                    </div>
  `;
  
  selectedbox.append(empLocal);
  divEmp.remove();
  
  // Retirer de la sidebar
  employesContainer.querySelectorAll(".employe").forEach((empl) => {
    if (empl.getAttribute("data-id") === empchosen.id.toString()) {
      empl.remove();
    }
  });
  
  // Mettre à jour la couleur du box
  updateBoxColor(selectedbox);
  
  // Événement pour retirer l'employé de la zone
  empLocal.querySelector(".annulEmp").addEventListener('click', (e) => {
    e.stopPropagation();
    empLocal.remove();
    
    // Remettre l'employé dans side-bar comme employés non-assignés
    empchosen.localisation = "unsigned";
    
    // Recréer l'employé dans la sidebar
    const employee = document.createElement("div");
    ajoutEmployeUnsigned(employee, empchosen);
    employesContainer.appendChild(employee);
    
    // Mettre à jour la couleur de la box
    updateBoxColor(selectedbox);
  });
  
  // Permettre de voir les détails en cliquant sur l'employé dans la zone
  empLocal.addEventListener("click", (e) => {
    // Ne pas ouvrir les détails si on clique sur le bouton de suppression
    if (e.target.classList.contains('annulEmp')) return;
    
    details.classList.remove("hidden");
    details.innerHTML = `
    <p id="annulDetails" class="absolute top-4 right-6 text-4xl text-emerald-500 cursor-pointer hover:text-emerald-400">×</p>
    <div class="profilContainerDetails flex flex-col gap-3 items-center">
      <img src="${empchosen.url}" alt="Photo De Profile" class="h-28 w-28 rounded-full border-4 border-emerald-500 object-cover">
      <p class="text-2xl font-bold text-emerald-500 mt-2">${empchosen.nom}</p>
      <p class="text-lg font-semibold text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-700">${empchosen.role}</p>
      <p class="text-base text-zinc-300">${empchosen.email}</p>
      <p class="text-base text-zinc-300">${empchosen.telephone}</p>
      <p class="text-base text-emerald-400 font-semibold">${empchosen.localisation}</p>
      <h3 class="w-full text-xl font-bold text-emerald-500 mt-6 pb-2 border-b-2 border-zinc-700">Expériences Professionnelles</h3>
    </div>
    `;
    filexperiences(empchosen.experience);
    annulDetails.addEventListener("click", () => {
      details.classList.add("hidden");
    })
  });
}


function showMessageFullRoom(){
  const container = document.querySelector("#fullRoomContainer")

  const fullRoom = document.createElement("div")
  fullRoom.className = `fullRoom text-emerald-500 px-4 py-3 rounded-lg shadow-2xl bg-zinc-900 border border-emerald-500`;
  fullRoom.textContent = "La salle est pleine";

  container.appendChild(fullRoom);

  setTimeout(() => {
      fullRoom.remove();
  }, 3000);
}


ajoutBtn.addEventListener("click", () => {
    formContainerAjout.classList.remove("hidden");
    formContainerAjout.classList.add("flex");
  });
  
addExperienceBtn.addEventListener("click", () => {
    addExperience();
});

annulBtnForm.addEventListener("click", () => {
  hideForm();
});

formContainerAjout.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Validation du formulaire
  if (!validateForm()) {
    return;
  }

  // get experience
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

  detailsemploye(employee, experience);
  
  employes.push(employe);

  employesContainer.append(employee);

  hideForm();
});

suppEmpChoose.addEventListener("click", () => {
  employesChooseContainer.classList.add("hidden");
  employesChoose.innerHTML = '';
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
      fillEmployesChoose(employesAvailable, "Salle de conférence", 1);
    }
    if(btn.classList.contains("personnelAjout")){
      fillEmployesChoose(employesAvailable, "Salle du personnel", 5);
    }
    if(btn.classList.contains("serverAjout")){
      fillEmployesChoose(employesAvailable, "Salle des serveurs", 2);
    }
    if(btn.classList.contains("securiteAjout")){
      fillEmployesChoose(employesAvailable, "Salle de sécurité", 3);
    }
    if(btn.classList.contains("recepcionAjout")){
      fillEmployesChoose(employesAvailable, "Réception", 4);
    }
    if(btn.classList.contains("archiveAjout")){
      fillEmployesChoose(employesAvailable, "Salle d'archives", 6);
    }
    });
});