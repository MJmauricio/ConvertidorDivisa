document.getElementById('cotizador').addEventListener('click', convertir);

let toggle = document.getElementById("toggle");
let label_toggle = document.getElementById("label_toggle");

function activarDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "activado");
    label_toggle.innerHTML = '<i class="bi bi-sun"></i>';
}

function desactivarDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "desactivado");
    label_toggle.innerHTML = '<i class="bi bi-moon"></i>';
}

let darkMode = localStorage.getItem("dark-mode");


if (darkMode === "activado") {
    activarDarkMode();
    toggle.checked = true; // Asegúrate de que el toggle esté en la posición correcta
} else {
    desactivarDarkMode();
}

    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            activarDarkMode();
        } else {
            desactivarDarkMode();
        }
    });

function convertir() {
    const divisas = [
        { nombre: "Dólar", tasa: 1100 },
        { nombre: "Euro", tasa: 1300 },
        { nombre: "Franco suizo", tasa: 1000 },
        { nombre: "Libra Esterlina", tasa: 323 },
        { nombre: "Yen Japonés", tasa: 564 },
        { nombre: "Dólar Australiano", tasa: 465 },
        { nombre: "Dólar Canadiense", tasa: 649 }
    ];

    const nombresAbreviados = ["USD", "EUR", "CHF", "GBP", "JPY", "AUD", "CAD"];

    let monto = parseFloat(document.getElementById("valor").value);

    if (isNaN(monto) || monto <= 0) {
        document.getElementById("resultado").innerText = "Por favor, ingresa un monto válido.";
        return;
    }

    // Obtener la moneda seleccionada
    const divisaSeleccionada = document.getElementById("moneda").value;

    const divisaIndex = nombresAbreviados.indexOf(divisaSeleccionada);
    
    function calcular(monto, divisa) {
        return monto * divisa.tasa;
    }

    const resultado = calcular(monto, divisas[divisaIndex]);

    document.getElementById("resultado").innerText = `El resultado de tu conversión es: ${resultado} ${nombresAbreviados[divisaIndex]}`;

    document.getElementById("conversion-form").reset();
}