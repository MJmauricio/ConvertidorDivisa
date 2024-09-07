const monedaEl_one = document.getElementById('moneda-uno');
const monedaEl_two = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');
const historialDiv = document.getElementById('historial');
let historial = [];

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
            historial = []; 
            mostrarHistorial(); 
            Swal.fire(
                '¡Borrado!',
                'El historial ha sido eliminado.',
                'success'                   
            );
        }
    });
});


function cotizar() {
    const moneda_one = monedaEl_one.value;
    const moneda_two = monedaEl_two.value;
    const cantidad1 = parseFloat(cantidadEl_one.value);

    if (isNaN(cantidad1) || cantidad1 <= 0) {
        Swal.fire('Por favor, ingresa una cantidad válida.');
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`)
        .then(res => res.json())
        .then(data => {
            const taza = data.rates[moneda_two];
            
            cambioEl.innerText = `1 ${moneda_one} = ${taza} ${moneda_two}`;
            const cantidad2 = (cantidad1 * taza).toFixed(2);
            cantidadEl_two.value = cantidad2;

            document.getElementById("resultado").innerText = `El resultado de tu conversión es: ${cantidad2} ${moneda_two}`;

            agregarAlHistorial(cantidad1, cantidad2, moneda_one, moneda_two);
        });
}


function agregarAlHistorial(cantidad1, cantidad2, moneda1, moneda2) {
    historial.unshift({
        monto: cantidad1.toLocaleString('es-ES'),
        resultado: cantidad2,
        moneda_origen: moneda1,
        moneda_destino: moneda2
    });

    if (historial.length > 10) {
        historial.pop(); 
    }

    mostrarHistorial();
}


function mostrarHistorial() {
    historialDiv.innerHTML = '<h3>Historial de Conversiones:</h3>';

    historial.forEach((item, index) => {
        historialDiv.innerHTML += `<p>${index + 1}. ${item.monto} ${item.moneda_origen} son ${item.resultado} ${item.moneda_destino}</p>`;
    });
}


document.getElementById('cotizador').addEventListener('click', cotizar);


tazaEl.addEventListener('click', () => {
    const temp = monedaEl_one.value;
    monedaEl_one.value = monedaEl_two.value;
    monedaEl_two.value = temp;
    cotizar(); 
});
