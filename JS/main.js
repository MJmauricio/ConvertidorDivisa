document.getElementById('cotizador').addEventListener('click', convertir);

document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        convertir();
    }
});

let toggle = document.getElementById("toggle");
let label_toggle = document.getElementById("label_toggle");
let historial = [];




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
    toggle.checked = true;
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

    document.getElementById('borrarHistorialBtn').addEventListener('click', function() {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar historial',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                historial = []; // Vaciar el historial
                mostrarHistorial(); // Actualizar la vista
                Swal.fire(
                    '¡Borrado!',
                    'El historial ha sido eliminado.',
                    'success'                   
                );
            }
        });
    });

    

function convertir() {
    const divisas = [
        { nombre: "Dólar", tasa: 930 },
        { nombre: "Euro", tasa: 1054 },
        { nombre: "Franco suizo", tasa: 1125 },
        { nombre: "Libra Esterlina", tasa: 1251 },
        { nombre: "Yen Japonés", tasa: 7 },
        { nombre: "Dólar Australiano", tasa: 644 },
        { nombre: "Dólar Canadiense", tasa: 703  }
    ];

    const nombresAbreviados = ["USD", "EUR", "CHF", "GBP", "JPY", "AUD", "CAD"];

    let monto = parseFloat(document.getElementById("valor").value);

    if (isNaN(monto) || monto <= 0) {
        document.getElementById("resultado").innerText = "Por favor, ingresa un monto válido.";
        return;
    }

    const divisaSeleccionada = document.getElementById("moneda").value;

    const divisaIndex = nombresAbreviados.indexOf(divisaSeleccionada);
    
    function calcular(monto, divisa) {
        return monto * divisa.tasa;
    }

    const resultado = calcular(monto, divisas[divisaIndex]);

    let resultadoFormateado = resultado.toLocaleString('es-ES');
    
    
    
    

    document.getElementById("resultado").innerText = `El resultado de tu conversión es: ${resultado} ${nombresAbreviados[divisaIndex]}`;
    historial.unshift({ monto: monto.toLocaleString('es-ES'), resultado: resultadoFormateado, divisa: nombresAbreviados[divisaIndex] });
    if (historial.length > 10) {
        historial.pop();}

        mostrarHistorial();
}

function mostrarHistorial() {
    let historialDiv = document.getElementById('historial');
    historialDiv.innerHTML = '<h3>Historial de Conversiones:</h3>';

    historial.forEach((item, index) => {
        historialDiv.innerHTML += `<p>${index + 1}. ${"$"+item.monto} pesos son ${"$"+item.resultado} ${item.divisa}</p>`;
    });


    document.getElementById("conversion-form").reset();
}

    