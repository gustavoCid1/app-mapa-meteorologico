const input = document.getElementById("city-input");
const button = document.getElementById("search-btn");
const card = document.getElementById("weather-card");

button.addEventListener("click", buscarLugar);

async function buscarLugar() {

    const ciudad = input.value.trim();

    if (ciudad === "") {
        card.innerHTML = "<p>Escribe una ciudad o lugar.</p>";
        return;
    }

    try {

        const respuesta = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(ciudad)}&format=json&limit=1`
        );

        const datos = await respuesta.json();

        if (datos.length === 0) {
            card.innerHTML = "<p>No se encontró la ubicación.</p>";
            return;
        }

        const lugar = datos[0];

        card.innerHTML = `
            <h2>${lugar.display_name}</h2>
            <p><strong>Latitud:</strong> ${lugar.lat}</p>
            <p><strong>Longitud:</strong> ${lugar.lon}</p>
            <p><strong>Tipo:</strong> ${lugar.type}</p>
        `;

    } catch (error) {

        card.innerHTML = "<p>Error al consultar la API.</p>";
        console.error(error);

    }

}