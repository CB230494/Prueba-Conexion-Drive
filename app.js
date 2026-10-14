// ==========================================================
// CONFIGURACIÓN
// ==========================================================

// PEGAR AQUÍ LA URL DEL GOOGLE APPS SCRIPT PUBLICADO.
// Debe terminar en /exec
// Ejemplo:
// https://script.google.com/macros/s/XXXXXXXXXXXX/exec

const API_URL = "PEGAR_AQUI_LA_URL_DEL_APPS_SCRIPT";


// ==========================================================
// ELEMENTOS HTML
// ==========================================================

const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("tablaDatos");
const btnActualizar = document.getElementById("btnActualizar");


// ==========================================================
// GUARDAR PERSONA
// ==========================================================

formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const delegacion = document.getElementById("delegacion").value.trim();

    if (!nombre || !cedula || !delegacion) {
        mostrarMensaje("Complete todos los campos.", "error");
        return;
    }

    mostrarMensaje("Guardando...", "");

    try {
        const datos = new URLSearchParams();
        datos.append("nombre", nombre);
        datos.append("cedula", cedula);
        datos.append("delegacion", delegacion);

        const respuesta = await fetch(API_URL, {
            method: "POST",
            body: datos
        });

        const resultado = await respuesta.json();

        if (!resultado.ok) {
            throw new Error(resultado.mensaje);
        }

        mostrarMensaje("Registro guardado correctamente.", "exito");
        formulario.reset();
        await cargarPersonas();

    } catch (error) {
        console.error(error);
        mostrarMensaje("Error: " + error.message, "error");
    }
});


// ==========================================================
// CARGAR PERSONAS
// ==========================================================

async function cargarPersonas() {
    try {
        const url = API_URL + "?accion=listar&t=" + Date.now();
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        if (!resultado.ok) {
            throw new Error(resultado.mensaje);
        }

        mostrarTabla(resultado.datos);

    } catch (error) {
        console.error("Error al consultar:", error);

        tabla.innerHTML = `
            <tr>
                <td colspan="3">
                    No fue posible consultar los datos.
                </td>
            </tr>
        `;
    }
}


// ==========================================================
// MOSTRAR TABLA
// ==========================================================

function mostrarTabla(personas) {
    tabla.innerHTML = "";

    if (!personas || personas.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="3">
                    No hay registros.
                </td>
            </tr>
        `;
        return;
    }

    personas.forEach(persona => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${escaparHTML(persona.nombre)}</td>
            <td>${escaparHTML(persona.cedula)}</td>
            <td>${escaparHTML(persona.delegacion)}</td>
        `;

        tabla.appendChild(fila);
    });
}


// ==========================================================
// MENSAJES
// ==========================================================

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;
}


// ==========================================================
// PROTECCIÓN BÁSICA AL MOSTRAR TEXTO
// ==========================================================

function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto || "";
    return div.innerHTML;
}


// ==========================================================
// BOTÓN ACTUALIZAR
// ==========================================================

btnActualizar.addEventListener("click", cargarPersonas);


// ==========================================================
// CARGAR AL ABRIR LA PÁGINA
// ==========================================================

document.addEventListener("DOMContentLoaded", cargarPersonas);
