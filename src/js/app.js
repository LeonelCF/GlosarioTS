document.addEventListener("DOMContentLoaded", function () {
    // Obtener elementos del DOM
    const searchInput = document.getElementById("searchInput");
    const wordList = document.getElementById("wordList");
    const definitionArea = document.getElementById("definitionArea");

    // Función para eliminar acentos y diéresis de una cadena
    function removeAccentsAndDiacritics(str) {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    // Cargar el JSON
    fetch("./src/db/diccionario.json")
        .then(response => response.json())
        .then(data => {
            // Función para mostrar las definiciones
            function showDefinitions(palabra) {
                const palabraData = data.palabras.find(item =>
                    removeAccentsAndDiacritics(item.palabra).toLowerCase() === removeAccentsAndDiacritics(palabra).toLowerCase()
                );

                if (palabraData) {
                    definitionArea.innerHTML = `<div class="_def"><div class="def"><h2>${palabraData.palabra}</h2><p>${palabraData.definiciones}</p></div></div>`;
                    
                    // Mostrar definicion
                    // definitionArea.innerHTML +=``
                    // Mostrar todas las definiciones
                    // palabraData.definiciones.forEach(definicion => {
                    //     definitionArea.innerHTML += `<p>${definicion}</p>`;
                    // });
                } else {
                    definitionArea.innerHTML = "Palabra no encontrada.";
                }
            }
            // =================================
            // =================================
            // la funcion siguiente es para 
            // mostrar varias definiciones como asepciones
            // =================================
            // =================================
            // Función para mostrar las definiciones
            
            // function showDefinitions(palabra) {
            //     const palabraData = data.palabras.find(item =>
            //         removeAccentsAndDiacritics(item.palabra).toLowerCase() === removeAccentsAndDiacritics(palabra).toLowerCase()
            //     );

            //     if (palabraData) {
            //         definitionArea.innerHTML = `<h2>${palabraData.palabra}</h2>`;
                    
            //         // Mostrar todas las definiciones
            //         palabraData.definiciones.forEach((definicion, index) => {
            //             definitionArea.innerHTML += `<p><strong>Definición ${index + 1}:</strong> ${definicion}</p>`;
            //         });
            //     } else {
            //         definitionArea.innerHTML = "Palabra no encontrada.";
            //     }
            // }


            // Función para actualizar la lista de palabras
            function updateWordList(query) {
                wordList.innerHTML = ""; // Limpiar la lista

                // Convertir la consulta a minúsculas y quitar acentos y diéresis
                const normalizedQuery = removeAccentsAndDiacritics(query).toLowerCase();

                // Filtrar palabras que coincidan con la búsqueda
                const filteredWords = data.palabras.filter(item =>
                    removeAccentsAndDiacritics(item.palabra).toLowerCase().includes(normalizedQuery)
                );

                // Mostrar las palabras coincidentes
                filteredWords.forEach(item => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="#" data-palabra="${item.palabra}">${item.palabra}</a>`;
                    wordList.appendChild(listItem);
                });

                // Si no se encontraron palabras, mostrar un mensaje
                if (filteredWords.length === 0) {
                    const noResultsItem = document.createElement("li");
                    noResultsItem.textContent = "No se encontraron resultados.";
                    wordList.appendChild(noResultsItem);
                }
            }

            // Mostrar todas las palabras al cargar la página inicialmente
            updateWordList("");

            // Evento para detectar cambios en el campo de búsqueda
            searchInput.addEventListener("input", () => {
                updateWordList(searchInput.value);
                definitionArea.innerHTML = ""; // Limpiar el área de definición
            });

            // Evento para mostrar las definiciones al hacer clic en una palabra
            wordList.addEventListener("click", (event) => {
                if (event.target && event.target.getAttribute("data-palabra")) {
                    const palabra = event.target.getAttribute("data-palabra");
                    showDefinitions(palabra);
                }
            });
        });
});
