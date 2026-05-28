const porcentajes = document.querySelectorAll(".porcentaje");
const totalPorcentaje = document.getElementById("totalPorcentaje");

// Bloquear números en nombre cliente
document.getElementById("cliente").oninput = function () {
    this.value = this.value.replace(/\d/g, "");
};

// Actualizar suma automática
porcentajes.forEach(input => {
    input.addEventListener("input", actualizarSuma);
});

function actualizarSuma() {
    let suma = 0;

    porcentajes.forEach(input => {
        suma += Number(input.value) || 0;
    });

    totalPorcentaje.textContent = suma + "%";

    if (suma === 100) {
        totalPorcentaje.style.color = "green";
    } else {
        totalPorcentaje.style.color = "#d63c2d";
    }
}

// Función principal
function calcular() {

    const cliente = document.getElementById("cliente").value.trim();
    const capital = Number(document.getElementById("capital").value);
    const rentabilidades = document.querySelectorAll(".rentabilidad");
    const errores = document.getElementById("errores");
     rentabilidades.forEach(input => {
        console.log("rentabilidad", input.value);
    });
   

    let mensajes = [];
    let suma = 0;

    errores.innerHTML = "";

    // Validar nombre
    if (cliente === "") {
        mensajes.push("• Debes ingresar nombre del cliente.");
    }

    // Validar capital
    if (capital <= 0 || isNaN(capital)) {
        mensajes.push("• El capital total a invertir debe ser mayor que 0.");
    }

    // Validar porcentajes
    porcentajes.forEach((input, i) => {

        let valor = Number(input.value);

        if (valor < 0 || valor > 100 || isNaN(valor)) {
            mensajes.push("• El % asignado al instrumento " + (i + 1) + " debe estar entre 0 y 100.");
        }

        suma += valor || 0;
    });

    // Validar rentabilidad
    rentabilidades.forEach((input, i) => {

        let valor = Number(input.value);

        if (valor <=0  || isNaN(valor)) {
            mensajes.push("• La rentabilidad del instrumento " + (i + 1) + " debe ser mayor que 0");
        }

    });

    // Validar suma 100
    if (suma !== 100) {
        mensajes.push("• La suma total de asignaciones debe ser exactamente 100%.");
    }

    // Mostrar errores
    if (mensajes.length > 0) {

        errores.style.background = "#ffe8e8";
        errores.style.color = "#d12d2d";
        errores.style.borderLeft = "5px solid red";

        errores.innerHTML =
            "<strong>Corrige los siguientes errores:</strong><br><br>" +
            mensajes.join("<br>");

    } else {

        let rentabilidadTotal = 0;

        porcentajes.forEach((p, i) => {

            let porcentaje = Number(p.value);
            let rent = Number(rentabilidades[i].value);

            rentabilidadTotal += (porcentaje / 100) * rent;

        });

        let ganancia = capital * (rentabilidadTotal / 100);
        let totalFinal = capital + ganancia;

        errores.style.background = "#e8fff0";
        errores.style.color = "#1a7a38";
        errores.style.borderLeft = "5px solid green";

        errores.innerHTML =
            "<strong>Resultado Presupuesto Marketing</strong><br><br>" +
            "Cliente: " + cliente + "<br>" +
            "Presupuesto mensual: $" + capital.toLocaleString("es-CL") + " CLP<br>" +
            "Clicks estimados totales: " + rentabilidadTotal.toFixed(0) + "<br>" +
            "Inversión proyectada: $" + ganancia.toLocaleString("es-CL") + " CLP<br>" +
            "Total estimado final: $" + totalFinal.toLocaleString("es-CL") + " CLP";
    }
}

// Ejecutar al cargar
actualizarSuma();