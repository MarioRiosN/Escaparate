window.addEventListener("load", iniciar);

function iniciar(){
    document.getElementById("home").addEventListener("click", home);
    document.getElementById("cerrarSesion").addEventListener("click", close);
    document.getElementById("borrar").addEventListener("click", vaciarCesta);
    const url = "juegos.json";
    fetch (url) 
        .then (respuesta => respuesta.json()) 
        .then (json => cargarJSON(json))
        .catch(e => console.log(e));
}
    
function cargarJSON(myObj){
    precioCesta = 0;
    document.getElementById("titulo").innerText = `Cesta de ${sessionStorage.getItem("actualUser")}`;
    arrayJuegos = sessionStorage.getItem("cesta"+sessionStorage.getItem("actualUser")).split(",");
    document.getElementById("juegos").innerHTML = "";
    for(i=0; i<arrayJuegos.length; i++){
        document.getElementById("juegos").innerHTML +=`
        <div class="card bg-light my-3" style="width: 20rem; height: fit-content">
            <img src="${myObj[arrayJuegos[i]-1]['foto']}" class="card-img-top" />
            <div class="card-body">
                <h5 class="card-title">${myObj[arrayJuegos[i]-1]['nombre']}</h5>
                <h6>Precio: ${myObj[arrayJuegos[i]-1]['precio']}€</h6>
            </div>
        </div>
        `;
        precioCesta += parseFloat(myObj[arrayJuegos[i]-1]['precio']);
    }
    document.getElementById("pago").innerText = `Precio total: ${precioCesta}€`;
}

function home(){
    window.open("inicio.html", "_self");
}
function close(){
    sessionStorage.setItem("logeado", false);
    sessionStorage.setItem("actualUser", "");
    window.open("inicio.html", "_self");
}

function vaciarCesta(){
    sessionStorage.setItem("cesta"+sessionStorage.getItem("actualUser"), "");
    window.open("cesta.html", "_self");
}