'use strict'

    const url = "https://64af121ec85640541d4e1e17.mockapi.io/usuarios/";
    let captcha;

    let btnmenu = document.getElementById("btnMenu");
    btnmenu.addEventListener("click", () => { // desplega el menu en version mobile
        document.getElementById("menu").classList.toggle("navigation"); 
    });

    mostrarTabla();
    generarCaptcha();

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
    btn2.addEventListener("click", () => { //fc que valida el captcha
        let ingresa = document.getElementById("ingresa").value;
        console.log("ingreso: "+ingresa);
        console.log("captcha: "+captcha);
        if (ingresa==captcha){
            document.getElementById("valida").innerHTML = "El captcha ingresado es válido. Puede enviar el formulario.";
            form.addEventListener("submit", (event) => {
                event.preventDefault();
            });
        }
        else {
            document.getElementById("valida").innerHTML = "El captcha ingresado es inválido. Inténtelo de nuevo.";
        }
    });

    let form = document.getElementById("form");
    form.addEventListener("submit", subirData);

    async function subirData(){
        try {
        let formData = new FormData(form); 
        let miembro = Object.fromEntries(formData); 
        let res = await fetch(url, { 
                    method: 'POST',
                    body: JSON.stringify(miembro), 
                    headers: {'Content-Type': 'application/json'}
                    })
        console.log(res.status);
        mostrarTabla();
        generarCaptcha();
        }
        catch (error) {
            console.log(error);
        }
    }

    async function mostrarTabla() {
        let tabla = document.getElementById("tablaCarta");
        tabla.innerHTML = "";
        let res = await fetch(url); 
        let arr = await res.json();
        if (arr.length === 0){
            let defaultJson = {
                "nombre": "Juan Ramírez",
                "sexo": "Masculino",
                "email": "juanramirez@gmail.com",
                "fecha": "12/05/1997",
                "hora": "12:05",
                "lugar": "Necochea",
                "familiar1": "Primo",
                "familiar2": "Hermano",
                "familiar3": "Madre"
            }
            let res = await fetch(url, { 
                method: 'POST',
                body: JSON.stringify(defaultJson), 
                headers: {'Content-Type': 'application/json'}
                })
            console.log(res.status);
        }
        let res1 = await fetch(url); 
        arr = await res1.json();
        tabla.innerHTML = "<thead><tr><td> Nombre </td><td> Sexo </td><td> E-mail </td><td> Fecha de nacimiento </td><td> Hora de nac </td><td> Lugar de nacimiento </td><td> Familiar 1 </td><td> Familiar 2 </td><td> Familiar 3 </td></tr></thead>"
        for(let i = 0; i<arr.length; i++){ 
            tabla.innerHTML = tabla.innerHTML + "<tr id="+arr[i].id+"><td>" + arr[i].nombre + "</td><td>" + arr[i].sexo + "</td><td>" + arr[i].email + "</td><td>" + arr[i].fecha + "</td><td>" + arr[i].hora + "</td><td>" + arr[i].lugar + "</td><td>" + arr[i].familiar1+ "</td><td>" + arr[i].familiar2+ "</td><td>" + arr[i].familiar3 + "</td><div class='renglonbtns'><button class='btn' type='button' onClick={borrar("+arr[i].id+")}>Borrar</button><button class='btn' type='button' onClick={editar("+arr[i].id+")}>Editar</button><button class='btn' type='button' onClick={agregaFam("+arr[i].id+")}>Agrega 3 familiares al azar</button></div></tr>";
        }
    }

    async function borrar(id){
        try{
            let res = await fetch(url+id,{
                method: "DELETE"
            })
            console.log(res.status);
            mostrarTabla();
        }
        catch (error) {
            console.log(error);
        }
    }

    function editar(id){
        const linea = document.getElementById(id);
        const tds = linea.querySelectorAll("td");
        tds.forEach(td => {
            td.setAttribute('contenteditable', true);
        })
        if(document.getElementById('btnGuardar'+id) == null){
            let btnGuardar = document.createElement('div');
            btnGuardar.innerHTML = "<button class='btn' id='btnGuardar"+id+"' type='button' onClick={guardar("+id+")}>Guardar</button>";
            linea.appendChild(btnGuardar);
        }
    }
        
    async function guardar(id){
        const nuevo = [];
        const linea = document.getElementById(id);
        const tds = linea.querySelectorAll("td");
        tds.forEach(td => {
                nuevo.push(td.innerHTML);
        })
        let newJson = {
            "nombre": nuevo[0],
            "sexo": nuevo[1],
            "email": nuevo[2],
            "fecha": nuevo[3],
            "hora": nuevo[4],
            "lugar": nuevo[5],
            "familiar1": nuevo[6],
            "familiar2": nuevo[7],
            "familiar3": nuevo[8]
        }
        let res = await fetch(url+id, {
            method: "PUT",
            body: JSON.stringify(newJson),
            headers: {'Content-Type': 'application/json'}
        })
        console.log(res.status);
        mostrarTabla();
        }

    async function agregaFam(id){
        let payload = {
            familiar1: "padre",
            familiar2: "tio",
            familiar3: "hermana"
        }
        let res = await fetch(url+id, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'}
        })
        console.log(res.status);
        mostrarTabla();
    }

