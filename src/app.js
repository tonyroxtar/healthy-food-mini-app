/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  const foodInput = document.getElementById("foodInput");
  const checkFoodButton = document.getElementById("checkFoodButton");
  const alertParagraph = document.getElementById("foodMessage");
  const foodHistory = document.getElementById("foodHistory");
  const clearHistoryButton = document.getElementById("clearHistoryButton");
  const themeToggle = document.getElementById("themeToggle");

  // Lista de alimentos no saludables
  const unhealthyFoods = [
    "pan",
    "pasteles",
    "papas fritas",
    "hamburguesas",
    "hotdogs",
    "completos"
  ];

  // Función para verificar si el alimento es comestible
  function canEat(food) {
    const lowerFood = food.toLowerCase();

    if (unhealthyFoods.includes(lowerFood)) {
      return `${food} no es saludable.`;
    } else if (lowerFood === "manzana") {
      return `¡Genial! La ${food} es muy saludable.`;
    } else if (lowerFood === "naranja") {
      return `¡La ${food} es una buena fuente de vitamina C!`;
    } else {
      return `Puedes comer ${food}.`;
    }
  }

  // Listener para verificar el alimento
  checkFoodButton.addEventListener("click", function() {
    const food = foodInput.value;
    const result = canEat(food);

    alertParagraph.innerHTML = result;

    // Limpiar clases previas
    alertParagraph.classList.remove(
      "alert-warning",
      "alert-danger",
      "alert-success"
    );
    foodInput.classList.remove("valid-food", "invalid-food");

    // Añadir clase según resultado
    if (!unhealthyFoods.includes(food.toLowerCase())) {
      alertParagraph.classList.add("alert-success");
      foodInput.classList.add("valid-food");
    } else {
      alertParagraph.classList.add("alert-danger");
      foodInput.classList.add("invalid-food");
    }

    // Asegúrate de que food no esté vacío
    if (food.trim() !== "") {
      // Crear un contenedor div para la tarjeta
      const card = document.createElement("div");
      card.className = "card mb-3"; // Añadir clases de Bootstrap para estilo de tarjeta

      // Crear el contenido de la tarjeta
      const cardBody = document.createElement("div");
      cardBody.className = "card-body"; // Clase de Bootstrap para cuerpo de la tarjeta
      const cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.textContent = result;

      // Añadir el texto al cuerpo de la tarjeta
      cardBody.appendChild(cardText);
      // Añadir el cuerpo de la tarjeta al contenedor de la tarjeta
      card.appendChild(cardBody);
      // Añadir la tarjeta al historial
      foodHistory.appendChild(card);
    }
  });

  // Listener para limpiar historial
  clearHistoryButton.addEventListener("click", function() {
    foodHistory.innerHTML = ""; // Limpiar el historial en la página
  });

  // Cargar preferencia de tema al cargar la página
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(savedTheme + "-mode");

  // Listener para cambiar de tema
  themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    // Guardar la preferencia de tema en localStorage
    const currentTheme = document.body.classList.contains("dark-mode")
      ? "dark"
      : "light";
    localStorage.setItem("theme", currentTheme);
  });
};
