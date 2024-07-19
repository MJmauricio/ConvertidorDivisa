//! CONVERSION DE DIVISAS 
function convertirDivisas() {

    const div1 = 1100;   // Tasa de conversión para Dólar
    const div2 = 1300;   // Tasa de conversión para Euro
    const div3 = 1000;   // Tasa de conversión para Franco suizo
    const div4 = 166;    // Tasa de conversión para Real
    
    
    let monto;
    do { 
        monto = parseFloat(prompt("Indica el monto que deseas convertir")); 
    } while (isNaN(monto) || monto <= 0);
    
    
    let divisa;
    do {
        divisa = parseInt(prompt("Perfecto, selecciona la moneda a la cual deseas convertir:\n1. Dólar\n2. Euro\n3. Franco suizo\n4. Real"));
    } while (![1, 2, 3, 4].includes(divisa));
    
     
    function Calcular(monto, operacionConversion) {
        switch (operacionConversion) {
            case 1:
                return monto * div1;   //? Conversión a Dólar
            case 2:
                return monto * div2;   //? Conversión a Euro
            case 3:
                return monto * div3;   //? Conversión a Franco suizo
            case 4:
                return monto * div4;   //? Conversión a Real
            default:
                return "Operación no válida";
        }
    }
    
    let resultado = Calcular(monto, divisa);
    alert("El resultado de tu conversión es: " + resultado);
    convertirDivisas();
    }
    
    convertirDivisas();
    
    
    