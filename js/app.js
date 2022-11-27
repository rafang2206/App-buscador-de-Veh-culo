// VARIABLES;
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;


//objeto que nos relacione los datos de los campos
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}


// EVENTOS;
document.addEventListener('DOMContentLoaded', e =>{
    // FUNCION QUE INTERACTUA CON EL ARRAY Y GENERA EL HTML DE LOS AUTOS
    agregandoCarro(autos);
    // FUNCION PARA GENERAR LOS AÑOS DE LOS VEHÍCULOS DENTRO DEL CAMPO SELECT
    agregarAños(autos);
    resultado.classList.add('hidden');
})

//EVENTO DE LOS INPUT
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});
year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
});
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
});
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});



// FUNCIONES;
function agregandoCarro(autos){
    limipiarHtml()
    autos.forEach(auto => {
        const autoHtml = document.createElement('P');
        const {marca, modelo, year, puertas, color, transmision} = auto;
        autoHtml.textContent = `
            ${marca} ${modelo} año: ${year} puertas: ${puertas} transmisión: ${transmision} color: ${color} precio: ${auto.precio}
        `;
        resultado.appendChild(autoHtml);
        resultado.classList.remove('hidden');
    })
}

function limipiarHtml(){
    resultado.textContent = '';    
}

function agregarAños(){
    for(let i = max; i >= min; i--){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

function filtrarAuto(){
    const resultado = autos.filter(filtrarMarcas).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo)
    .filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
    
    if(resultado.length){
        agregandoCarro(resultado);
    }else{
        noResultado();
    }
}

function noResultado(){
    limipiarHtml()
    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados intenta con otros terminos'
    resultado.appendChild(noResultado);
}

function filtrarMarcas(auto){
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === parseInt(datosBusqueda.year);
    }
    return auto;
}

function filtrarMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= parseInt(datosBusqueda.minimo);
    }
    return auto;
}

function filtrarMaximo(auto){
    if(datosBusqueda.maximo){
        return auto.precio <= parseInt(datosBusqueda.maximo);
    }
    return auto;
}

function filtrarPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === parseInt(datosBusqueda.puertas);
    }
    return auto;
}

function filtrarTransmision(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}


function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return auto;
}