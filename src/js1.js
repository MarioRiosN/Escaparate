window.addEventListener("load", iniciar);
function iniciar(){
    document.getElementById("arcade").addEventListener("click", abrirFiltrado);
    document.getElementById("estrategia").addEventListener("click", abrirFiltrado);
    document.getElementById("accion").addEventListener("click", abrirFiltrado);
    document.getElementById("aventura").addEventListener("click", abrirFiltrado);
    document.getElementById("rpg").addEventListener("click", abrirFiltrado);
    document.getElementById("deportes").addEventListener("click", abrirFiltrado);
    document.getElementById("buscar").addEventListener("click", abrirFiltradoTexto);
    document.getElementById("voz").addEventListener("click", escucha);
    document.getElementById("cesta").addEventListener("click", cesta);
    for(i=0; i<document.getElementsByClassName("verJuego").length; i++){
        document.getElementsByClassName("verJuego")[i].addEventListener("click", verJuego);
    }
    for(i=0; i<document.getElementsByClassName("alacesta").length; i++){
      document.getElementsByClassName("alacesta")[i].addEventListener("click", meterJuego);
    }
    const url = "juegos.json";
    fetch (url) 
        .then (respuesta => respuesta.json()) 
        .then (json => cargarJSON(json))
        .catch(e => console.log(e));
}
function cargarJSON(myObj){
    recomDelDia = parseInt(Math.random()*31);
    sessionStorage.setItem("recom", recomDelDia);
    document.getElementById("recomDia").src=myObj[recomDelDia]['foto'];
    document.getElementById("recomDia").parentNode.children[1].children[1].id = myObj[recomDelDia]['id'];
}

function abrirFiltrado(){
    filtro = this.id;
    sessionStorage.setItem("filtro", filtro);
    window.open("filtrado.html", "_self");
}

function abrirFiltradoTexto(){
    filtro = document.getElementById("textoBusqueda").value;
    sessionStorage.setItem("filtro", filtro);
    window.open("filtrado.html", "_self");
}

function verJuego(){
    aux = this.id;
    sessionStorage.setItem("aux", aux);
    window.open("product.html","_self");
}

function escucha() {
    const salida = document.getElementById("textoBusqueda");
    const SpeechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.start();
    recognition.onstart = function () {
      salida.value = "Escuchando...";
    };
    recognition.onspeechend = function () {
      salida.value = "Has terminado de hablar..";
      recognition.stop();
    };
    recognition.onresult = function (e) {
      var transcript = e.results[0][0].transcript;
      var confidence = e.results[0][0].confidence;
      if(confidence >= 0.5){
      document.getElementById("textoBusqueda").value= transcript;
      }else{
        document.getElementById("textoBusqueda").value= "No oigo na de na de los nanases"
      }
    };
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
        aux += this.parentNode.children[1].id;
      }else{
        aux += ","+this.parentNode.children[1].id;
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