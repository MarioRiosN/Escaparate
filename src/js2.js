window.addEventListener("load", iniciar);
var audio = new Audio('../sound/noti.mp3');
function iniciar(){
    document.getElementById("home").addEventListener("click", home);
    document.getElementById("cesta").addEventListener("click", cesta);
    const url = "juegos.json";
    fetch (url) 
        .then (respuesta => respuesta.json()) 
        .then (json => cargarJSON(json))
        .catch(e => console.log(e));   
}
function cargarJSON(myObj){
    recomDelDia = parseInt(Math.random()*31);
    cambio = false;
    sessionStorage.setItem("recom", recomDelDia);
    document.getElementById("recomDia").src=myObj[recomDelDia]['foto'];
    document.getElementById("recomDia").parentNode.children[1].children[1].id = myObj[recomDelDia]['id'];
    for(i=0; i<myObj.length; i++){
        if(sessionStorage.getItem("filtro") == myObj[i]['categoria'].toLowerCase() || myObj[i]['nombre'].toLowerCase().includes(sessionStorage.getItem("filtro").toLowerCase()) || myObj[i]['categoria'].toLowerCase() == sessionStorage.getItem("filtro").toLowerCase()){
            document.getElementById("mostrar").innerHTML += `
            <div class="card bg-light my-3" style="width: 20rem; height: fit-content">
                <img src="${myObj[i]['foto']}" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">${myObj[i]['nombre']}</h5>
                    <h6>Precio: ${myObj[i]['precio']}€</h6>
                    <button id="${myObj[i]['id']}" class="btn btn-primary verJuego">Ver</a></button>
                    <button class="btn btn-primary alacesta">A la cesta</button>
                </div>
            </div>`;
            cambio = true;
        }
    }
    if(!cambio){
        document.getElementById("mostrar").innerHTML = `<h1 class="m-3">Su búsqueda no dio resultados</h1>`;
    }
    for(i=0; i<document.getElementsByClassName("verJuego").length; i++){
        document.getElementsByClassName("verJuego")[i].addEventListener("click", verJuego);
    }
    for(i=0; i<document.getElementsByClassName("alacesta").length; i++){
        document.getElementsByClassName("alacesta")[i].addEventListener("click", meterJuego);
    }
}

function home(){
    window.open("inicio.html", "_self");
}
function verJuego(){
    aux = this.id;
    sessionStorage.setItem("aux", aux);
    window.open("product.html","_self");
}
function cesta(){
    window.open("login.html","_self");
}
function meterJuego(){
    if(sessionStorage.getItem("logeado") == "false"){
      window.open("login.html","_self");
    }else{
      aux = sessionStorage.getItem("cesta"+sessionStorage.getItem("actualUser"));
      if(aux == ""){
        aux += this.parentNode.children[2].id;
      }else{
        aux += ","+this.parentNode.children[2].id;
      }
      sessionStorage.setItem("cesta"+sessionStorage.getItem("actualUser"), aux);
      audio.play();
      Notification.requestPermission()
                    .then( resultado => {
                        if (resultado == 'granted'){
                        const notificacion = new Notification('Te notificamos...', {
                        icon: '../images/logo.png',
                        body: 'Un juego añadido a la cesta',
                        });
                    }
            })
    }
}