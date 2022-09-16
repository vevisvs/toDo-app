/* seleccionar las variables */

const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id;
let listado;

//fecha
const dataFecha = new Date()
fecha.innerHTML = dataFecha.toLocaleDateString('es-MX', {weekday: 'long', month: 'short', day: 'numeric'})


/* agregar tareas */
function agregarTarea(tarea, id, realizado, eliminado){

    if(eliminado){return};

    const REALIZADO = realizado ? check : uncheck
    const LINE = realizado ? lineThrough : ''

    const elemento =   `<li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i></li>`

    lista.insertAdjacentHTML("beforeend", elemento)
}

// tareas realizadas:
function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    listado[element.id].realizado = listado[element.id].realizado ? false : true
}

//tareas eliminadas:
function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    listado[element.id].eliminado = true
}


//eventos:
botonEnter.addEventListener('click', () => {
    const tarea = input.value 
    if(tarea){
        agregarTarea(tarea, id, false, false)
        listado.push({ //guarda en el array
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
    }
    localStorage.setItem('toDo-app', JSON.stringify(listado))
    input.value = '';
    id++
})

document.addEventListener('keyup', (event) => {
    if(event.key == 'Enter'){
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea, id, false, false)
            listado.push({ //guarda en el array
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
        }
        localStorage.setItem('toDo-app', JSON.stringify(listado))
        input.value = '';
        id++
    }
})

lista.addEventListener('click', (event) => {
    const element = event.target
    const elementData = element.attributes.data.value 
    if(elementData == 'realizado'){
        tareaRealizada(element)
    }else if (elementData == 'eliminado'){
        tareaEliminada(element)
    }
    localStorage.setItem('toDo-app', JSON.stringify(listado))
})

//localStorage (get item)
let data = localStorage.getItem('toDo-app')
if(data){
    listado = JSON.parse(data)
    id = listado.length
    cargarLista(listado)
}else{
    listado = [] //si no encuentra informacion, resetea los valores
    id = 0
}

function cargarLista(DATA) {
    DATA.forEach(function(i){
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
    });
}


