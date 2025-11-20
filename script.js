

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