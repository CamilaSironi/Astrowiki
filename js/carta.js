'use strict'

document.addEventListener("DOMContentLoaded", iniciarPag);

function iniciarPag(){

let btnmenu = document.getElementById("btnMenu");
btnmenu.addEventListener("click", function(){
    desplegar()});

function desplegar(){
    document.getElementById("menu").classList.toggle("navigation");
}

let arreglo = [
    {
        "nombre": "Juan",
        "sexo": "Masculino",
        "email": "juan@gmail.com",
        "fecha": "19/10/1998",
        "hora": "12:35",
        "lugar": "Madariaga",
        "familiar1": "primo",
        "familiar2": "cuñada",
        "familiar3": "madre"
    }
]

mostrarTabla(arreglo);

let captcha;

generarCaptcha(captcha);

let btn1 = document.getElementById("generador");
btn1.addEventListener("click", function(){
    captcha = generarCaptcha()});

function generarCaptcha(){
    captcha ="";
    const posibles = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    document.getElementById("ingresa").value="";
    document.getElementById("valida").innerHTML="";
    for (let i = 0; i <= 5; i++) {
        captcha = captcha+posibles[Math.floor(Math.random()*(posibles.length))];
    }
    document.getElementById("Captchagenerado").innerHTML = captcha;
    return captcha;
}

let btn2 = document.getElementById("validador");
btn2.addEventListener("click", function(){
    validarCaptcha()});

function validarCaptcha(){
    let ingresa = document.getElementById("ingresa").value;
    console.log("ingreso: "+ingresa);
    console.log("captcha: "+captcha);
    if (ingresa==captcha){
        document.getElementById("valida").innerHTML = "El captcha ingresado es válido. Puede enviar el formulario.";
        form.addEventListener("submit", function(event){
            event.preventDefault()
          });
    }
    else {
        document.getElementById("valida").innerHTML = "El captcha ingresado es inválido. Inténtelo de nuevo.";
    }
}

let miembro = {};
let nombre, sexo, email, fecha, hora, lugar;
let form = document.getElementById("form");
form.addEventListener("submit", agregar);

function agregar() {
    let formData = new FormData(form);
    nombre = formData.get('nombre');
    sexo = formData.get("sexo")
    email = formData.get("email");
    fecha = formData.get("fecha");
    hora = formData.get("hora");
    lugar = formData.get("lugar");

    miembro = {
        "nombre": nombre,
        "sexo": sexo,
        "email": email,
        "fecha": fecha,
        "hora": hora,
        "lugar": lugar,
        "familiar1": " ",
        "familiar2": " ",
        "familiar3": " "
    }

    arreglo.push(miembro);
    mostrarTabla();
    generarCaptcha(captcha);
}

let fam1, fam2, fam3;

let botonAdd = document.getElementById("btnAddFamiliares");
botonAdd.addEventListener("click", function(){
    agregarFamiliares()});

function agregarFamiliares(){
  miembro.familiar1 = "padre";
  miembro.familiar2 = "tio";
  miembro.familiar3 = "hermana";
  mostrarTabla();
}  

let btn3 = document.getElementById("borrar");
btn3.addEventListener("click", function(){
    borrarTodo()});

function borrarTodo(){
    arreglo = [];
    mostrarTabla();
    console.table(arreglo);
}

function mostrarTabla() {
    let tabla = document.getElementById("tablaCarta");
    tabla.innerHTML = "";
    tabla.innerHTML = "<thead><tr><td> Nombre </td><td> Sexo </td><td> E-mail </td><td> Fecha de nacimiento </td><td> Hora de nac </td><td> Lugar de nacimiento </td><td> Familiar 1 </td><td> Familiar 2 </td><td> Familiar 3 </td></tr></thead>"
    for(let i = 0; i<arreglo.length; i++){
      tabla.innerHTML = tabla.innerHTML + "<tr><td>" + arreglo[i].nombre + "</td><td>" + arreglo[i].sexo + "</td><td>" + arreglo[i].email + "</td><td>" + arreglo[i].fecha + "</td><td>" + arreglo[i].hora + "</td><td>" + arreglo[i].lugar + "</td><td>" + arreglo[i].familiar1+ "</td><td>" + arreglo[i].familiar2+ "</td><td>" + arreglo[i].familiar3 + "</td></tr>";
    }
   }
}