window.addEventListener("load", iniciar);

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
    idAux = sessionStorage.getItem("aux");
    cover = document.createElement("img");
    div2 = document.createElement("div");
    cover.src = myObj[idAux-1]['foto'];
    cover.style = "width: 35%";
    div2.style = "width: 65%; display: flex; flex-direction: column; align-items: center; justify-content: center;";
    document.getElementById("elJuego").appendChild(cover);
    document.getElementById("elJuego").appendChild(div2);
    div2.innerHTML = `
    <h1>${myObj[idAux-1]['nombre']}</h1>
    <h2>Género: ${myObj[idAux-1]['categoria']}</h2>
    <h2>Plataformas:</h2>
    <ul>
    `;
    for(i=0; i<myObj[idAux-1]['plataforma'].length; i++){
        div2.innerHTML += `
        <li class="h3">${myObj[idAux-1]['plataforma'][i]}</li>
        `;
    }
    div2.innerHTML += `
    </ul>
    <h2>Precio: ${myObj[idAux-1]['precio']}€</h2>
    <button class="btn btn-primary alacesta">A la cesta</button>
    `;
    document.getElementsByClassName("alacesta")[0].addEventListener("click", meterJuego);
}
function home(){
    window.open("inicio.html", "_self");
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
          aux += idAux;
        }else{
          aux += ","+idAux;
        }
        sessionStorage.setItem("cesta"+sessionStorage.getItem("actualUser"), aux);
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