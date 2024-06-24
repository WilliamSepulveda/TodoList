const ObtenerDatos = async() =>{
    let datos = await fetch("https://6674179975872d0e0a950e53.mockapi.io/todoList");
    datos = await datos.json();
    return datos;
};

const obetenerDatoId = async(id) =>{
    let datos = await fetch(`https://6674179975872d0e0a950e53.mockapi.io/todoList/${id}`)
    datos = await datos.json();
    return datos; 
}

export const estructura = async()=>{
    let resultado = document.querySelector("#mDS2");
    resultado.innerHTML = "";

    let info1 = document.querySelector("#info1");
    let info2 = document.querySelector("#info2");
    let info3 = document.querySelector("#info3");

    let enEspera = 0;
    let listo = 0;
    let total_tareas = 0;

    let datos = await ObtenerDatos();
    datos.forEach(function (tarea){
        let NombreTarea = tarea.tarea;
        let Idtarea = tarea.id;

        let status = tarea.status;
        let plantilla = "";
        if (status === "enEspera") {
            total_tareas++;
            enEspera++;
            plantilla = `
                <article class="espera">
                    <span class="tareas">${NombreTarea}</span>
                    <div class="imagenes_chek_delete">
                        <div class="contenedor_chek">
                            <img onclick="finalizado(this)" id="${Idtarea}" src="https://www.svgrepo.com/show/500802/check.svg" alt="Finished">
                        </div>
                        <div class="contenedor_delete">
                            <img onclick="eliminarElemento(this)" id="${Idtarea}" src="https://www.svgrepo.com/show/491509/trash.svg" alt="Delete">
                        </div>
                    </div>
                </article>`;
        } else if (status === "listo") {
            total_tareas++;
            listo++;
            plantilla = `
                <article class="contenedor_finish">
                    <del><span class="span_task">${NombreTarea}</span></del>
                    <div class="imagenes_chek_delete">
                        <div class="contenedor_chek">
                            <img onclick="finalizado(this)" id="${Idtarea}" src="https://www.svgrepo.com/show/500802/check.svg" alt="Finished">
                        </div>
                        <div class="contenedor_delete">
                            <img onclick="eliminarElemento(this)" id="${Idtarea}" src="https://www.svgrepo.com/show/491509/trash.svg" alt="Delete">
                        </div>
                    </div>
                </article>`;
        }
        info1.innerHTML = total_tareas;
        info2.innerHTML = enEspera;
        info3.innerHTML = listo;
        resultado.innerHTML += plantilla;
    });
    
};


export const Addboton = async (tarea) => {
    console.log("agregando" + tarea );

    let datos = await ObtenerDatos();
    console.log(datos);

    let nuevaPlantilla ={
    "tarea": tarea,
    "status": "enEspera"
    };

    await fetch("https://6674179975872d0e0a950e53.mockapi.io/todoList", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaPlantilla)
});
};


export const eliminar = async (id) => {
    await fetch(`https://6674179975872d0e0a950e53.mockapi.io/todoList/${id}`, {
        method: 'DELETE'
    });
};

export const status = async (id) => {
    let datos = await obetenerDatoId(id);
    console.log(datos);

    let status = datos.status;
    let statusF = "";

    if (status == "enEspera") {
        statusF = "listo";
    } else if (status == "listo") {
        statusF = "enEspera";
    }

    datos.status = statusF;

    await fetch(`https://6674179975872d0e0a950e53.mockapi.io/todoList/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
};