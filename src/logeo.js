window.addEventListener("load", iniciar);
function iniciar(){
    document.getElementById("home").addEventListener("click", home);
    document.getElementById("logeo").addEventListener("click", logeo);
    if(sessionStorage.getItem("logeado")=="true"){
        window.open("cesta.html","_self");
    }
}

function logeo(){
    const url = "usuarios.json";
    fetch (url) 
        .then (respuesta => respuesta.json()) 
        .then (json => cargarJSON(json))
        .catch(e => console.log(e));
}

function cargarJSON(myObj){
    user = document.getElementById("exampleInputEmail1").value;
    pass = document.getElementById("exampleInputPassword1").value;
    if(sessionStorage.getItem("logeado")=="false"){
        for(i=0; i<myObj.length && sessionStorage.getItem("logeado")=="false";i++){
            if(myObj[i]['nombre']== user && myObj[i]['password']==pass){
                sessionStorage.setItem("logeado", true);
                sessionStorage.setItem("actualUser", user);
                window.open("inicio.html", "_self");
            }
        }
        if(sessionStorage.getItem("logeado")=="false"){
            document.getElementById("aviso").innerHTML = "<p>Nombre o contraseña incorrectos</p>";
        }
    }
}

function home(){
    window.open("inicio.html", "_self");
}