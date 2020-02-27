var comprob = false;
function validar() {
    var usuario = document.getElementById('Usuario').value;
    var contraseña = document.getElementById('password').value;
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(usuario)){
        comprob = true;
    }else if (/[0-9]{9}/.test(usuario)){
        comprob = true;
    }else {
        alert("Error de formato.");
        comprob = false;
    }

    //if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8}$/.test(contraseña)){
    if(/^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8}$/.test(contraseña)){
        comprob = true;
    }else{
        alert("Contraseña incorrecta.");
        comprob = false;
    }
    comprarInicioSesion();
}

function mostrarContraseña(){
    var contraseña = document.getElementById("password");
    if(contraseña.type == "password"){
        contraseña.type = "text";
    }else{
        contraseña.type = "password";
    }
}


function inicializar(){
    var btn;
    btn = document.getElementById("botones");
    btn.addEventListener("click", validar);
    if(getCookie("logeado") == "Logeado Correctamente"){
        PaginaWeb();
    }
}

function pasarPag(){
    document.getElementById("logOut").innerHTML = "<a href='index.html'><input class='boton' type='button' id='eliminar' value='Cerrar Sesion'></a>";
    document.getElementById("eliminar").addEventListener("click", eliminarCookie);

}


function eliminarCookie(){
    var x = document.cookie;
    deleteCookie(x);
}

//COOKIES

function setCookie(nombre, valor, tiempo){
    var d = new Date();
    d.setTime(d.getTime()+tiempo*24*60*60*1000);
    var tiempo = "expires="+d.toUTCString();
    document.cookie = nombre+"="+valor+";"+tiempo+";path=/";
}

function getCookie(nombre){
    var nom= nombre+"=";
    var array = document.cookie.split(";");
    for(var i=0;i<array.length;i++){
        var c = array[i];
        while(c.charAt(0)==" "){
            c = c.substring(1);
        }
        if(c.indexOf(nombre) == 0){
            return c.substring(nom.length, c.length);
        }
    }
    return "";
}

function deleteCookie(nombre){
    setCookie(nombre,"",0);

}

function cerrarSesion(){
    deleteCookie("logeado");
    document.getElementById("ocultar").style.display = "block";
    document.getElementById("password").value = '';
}

function comprarInicioSesion(){
    var usuario = document.getElementById('Usuario').value;
    var contraseña = document.getElementById('password').value;
    if(usuario == getCookie("email") && contraseña == getCookie("contraseña")){
        var x = "Logeado Correctamente";
        tiempo = 1;
        setCookie("logeado",x,tiempo);
        PaginaWeb();
    }
}

function PaginaWeb(){
    if(getCookie("logeado") == "Logeado Correctamente"){
        document.getElementById("pag").innerHTML = "<h4>Estas correctamente registrado, "+getCookie("nombre") + "</h4><br> <button class='boton' onclick='cerrarSesion()'>Cerrar Sesion</button>";
        document.getElementById("ocultar").style.display = "none";
    }
}
