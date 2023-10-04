const API_URL = "https://jsonplaceholder.typicode.com";
const HTMLResponse = document.querySelector(".card-container");
const filterSelect = document.getElementById("filterSelect");

fetch(`${API_URL}/photos`)
  .then((respuesta) => respuesta.json())
  .then((photos) => {
    const first12Photos = photos.slice(0, 12);

    // Crear una opción para mostrar todas las tarjetas
    filterSelect.innerHTML += `<option value="all">Mostrar todas las tarjetas</option>`;

    // Crear opciones para cada título de tarjeta
    first12Photos.forEach((photo) => {
      filterSelect.innerHTML += `<option value="${photo.title}">${photo.title}</option>`;
    });

    // Agregar evento de cambio al <select> para filtrar las tarjetas
    filterSelect.addEventListener("change", () => {
      const selectedValue = filterSelect.value;
      const filteredPhotos =
        selectedValue === "all"
          ? first12Photos
          : photos.filter((photo) => photo.title === selectedValue);
      const tpl = filteredPhotos.map(
        (photo) =>
          `<li class="item">
              <img src="${photo.thumbnailUrl}" alt="${photo.title}" />
              <p>${photo.title}</p>
          </li>`
      );
      HTMLResponse.innerHTML = `${tpl.join("")}`;
    });

    // Mostrar todas las tarjetas por defecto
    filterSelect.value = "all";
    filterSelect.dispatchEvent(new Event("change"));
  });
