import { estructura,Addboton,eliminar,status } from "../js/modules/api.js";

await estructura();

let Agregarbtn = document.querySelector(".buscador");

Agregarbtn.addEventListener("change", async ()=>{
    let tarea = document.querySelector("#input");
    tarea = tarea.value;

    await Addboton(tarea);
    await estructura();
});


const eliminarElemento =async (Elemento) =>{
    let id = Elemento.id;

    await eliminar(id);
    await estructura();
};
document.eliminarElemento = eliminarElemento;

const finalizado = async (Elemento)=>{
    let id = Elemento.id;

    await status(id);
    await estructura();
};
document.finalizado = finalizado;
let container = document.querySelector("#date");

function actualizarFechaHora() {
    let fechaHoraActual = new Date();
    let añoActual = fechaHoraActual.getFullYear();
    let mesActual = fechaHoraActual.getMonth() + 1;
    let diaActual = fechaHoraActual.getDate();
    let horaActual = fechaHoraActual.getHours();
    let minutosActuales = fechaHoraActual.getMinutes();
    let segundosActuales = fechaHoraActual.getSeconds();

    let fecha = diaActual + "/" + mesActual + "/" + añoActual;
    let hora = horaActual + ":" + minutosActuales + ":" + segundosActuales;

    container.innerHTML = fecha + " - " + hora;
}

actualizarFechaHora();
setInterval(actualizarFechaHora, 1000);