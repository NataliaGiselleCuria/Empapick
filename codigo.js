
// Pantalla 1
let ini = document.getElementById("inicio");
let pantalla1 = document.getElementById("pantalla-1");
let h4 = document.getElementById('h4');
let cantComensales=document.getElementById("comensales");
let checkEmpanada=document.getElementById("check-empa");
let checkPizza = document.getElementById("check-pizza");
let valorEmpanada=document.getElementById("valorEmpanada");
let valorPizza = document.getElementById("valorPizza");
let sumarComensal = document.querySelector('.mas.pantalla1');
let restarComensal = document.querySelector('.menos.pantalla1');
valorEmpanada.addEventListener('keyup', habilitarSiguiente);
valorPizza.addEventListener('keyup', habilitarSiguiente);
let buttonSig1 = document.getElementsByClassName("button-sig-1");
let requeridop = document.getElementsByClassName("requerido-p")[0];
let requeridoe = document.getElementsByClassName("requerido-e")[0];

// transition 1 (empanadas)

let main = document.querySelector('.main');
let transition1 = document.getElementById("transition-empa");
let cantComensalesEmpa = document.getElementById("cant-comensales-empa");
cantComensalesEmpa.addEventListener('keyup', habilitarConfirmarComensales);
let transition1error = document.getElementById("transition-empa-error");
let buttonComensalesEmpa = document.getElementById("button-transition-empa");

//transition 2 (pizzas)

let transition2 = document.getElementById("transition-pizza");
let difComensales;
let inputComensalesP;
let checkcomensalesP;
let cantComensalesP=0;
let buttonComensalesPizza = document.getElementById("button-transition-pizza");
let dif = 0;

//pantalla 2 (seleccion empanadas)

let seleccionEmpanadas = document.getElementById("seleccionEmpa");
let customName = document.querySelector('.custom');

//pantalla 2Bis (seleccion pizzas) , resumen

let seleccionPizzas = document.getElementById("seleccionPizza");
let resumen = document.getElementById("resumen");
let detalleResumen = document.getElementById("resumen-detalle");
let detalleCont = document.getElementById("detalle-cont");

//objetos

function PedidoComensal (id, nombre, listaEmpanadas, totalEmpanadas, comensaleP, totalPagar){
    this.id = id;
    this.nombre = nombre;
    this.listaEmpanadas = listaEmpanadas;
    this.totalEmpanadas = totalEmpanadas;
    this.comensaleP = comensaleP;
    this.totalPagar = totalPagar;
}

function Empanada(nombre, cantidad) {
    this.nombre = nombre;
    this.cantidad = cantidad;
}

function Pizza(nombre, cantidad){
    this.nombre = nombre;
    this.cantidad = cantidad;
}

let idCounter = 0;
let comensales=[];
let resumenPedido=[];
let listaFinalE =[Empanada];
let listaFinalP = [Pizza];
let totalFinalPagar = 0;
let ListaFinalClean=[];


async function cargarSabores() {
    try {
        const response = await fetch('sabores.json');
        const data = await response.json();
        const cargarSaboresEmpa = document.getElementById('cargar-sabores-e');
        const cargarSaboresPizza = document.getElementById('cargar-sabores-p');

        data.empanadas.forEach(sabor => {
            const li = document.createElement('li');
            li.innerHTML = `
                <label class="label-empanada">${sabor.nombre}</label>
                <span>
                    <button type="button" class="menos"><i class="fa-solid fa-minus"></i></button>
                    <input class="number empanada" name="${sabor.nombre}" type="number" value="0" readonly>
                    <button class="mas" type="button"><i class="fa-solid fa-plus"></i></button>
                </span>
            `;
            cargarSaboresEmpa.appendChild(li);
        });

        data.pizzas.forEach(sabor => {
            const li = document.createElement('li');
            li.innerHTML = `
                <label class="label-pizza">${sabor.nombre}</label>
                <span>
                    <button type="button" class="menos"><i class="fa-solid fa-minus"></i></button>
                    <input class="number pizza" name="${sabor.nombre}" type="number" value="0" readonly>
                    <button class="mas" type="button"><i class="fa-solid fa-plus"></i></button>
                </span>
            `;
            cargarSaboresPizza.appendChild(li);
        });

    } catch (error) {
        console.error('Error al cargar sabores:', error);
    }

    agregarEventos();
}

// Cargar los sabores cuando se carga la página
window.onload = cargarSabores;

// Pantalla 1

function setTimeoutOpacity(pantalla,opacity,tiempo){
    setTimeout(function() {     
        pantalla.style.opacity=opacity;
    }, tiempo);
}

function inicio(){
    setTimeoutOpacity(ini,1,10)
    setTimeoutOpacity(ini,0,2000)
   
    setTimeout(function() { 
        pantalla1.style.display="flex";    
        ini.style.display="none";
    }, 3500);
    
    setTimeoutOpacity(pantalla1,1,4000)

}


function agregarEventos() {
    let botonesSumar = document.querySelectorAll('.mas');
    let botonesRestar = document.querySelectorAll('.menos');

    botonesSumar.forEach(boton => boton.addEventListener('click', sumar));
    botonesRestar.forEach(boton => boton.addEventListener('click', restar));
}

inicio();
agregarEventos();

function sumar(event) {
    let button = event.target;
    let input = button.parentElement.previousElementSibling;
    let cont = input.valueAsNumber;
    cont = cont + 1;

   if(input.classList.contains('pantalla1')){
        if (cont <= 15) {
            input.valueAsNumber = cont;

            let bichito = document.createElement('i');
            bichito.classList.add("fa-solid", "fa-user-astronaut", "fa-xl");
            document.getElementById('user').appendChild(bichito);

            habilitarSiguiente();

        } 

   }else {

    input.valueAsNumber = cont;

   }
}

function restar(event) {
    let button = event.target;
    let input = button.parentElement.nextElementSibling;
    let cont = input.valueAsNumber;
    let user = document.getElementById('user');
    cont = cont - 1;
    
    if (cont < 0) {
        return;
    } else {
      
        input.valueAsNumber = cont;
        
        if(input.classList.contains('pantalla1')){
            if (user.lastElementChild) {
                user.removeChild(user.lastElementChild);
            }

            habilitarSiguiente();
        }
    }
}

function prodCheck(prod){
    if(prod.value == "check-pizza"){
        if( prod.checked){
            prod.previousElementSibling.children[0].src = "img/pizza-active.png";
            requeridop.style.display="block";
            requeridop.nextElementSibling.style.color="white";
            requeridop.nextElementSibling.nextElementSibling.children[0].style.color="white"
            valorPizza.style.borderBottom="1px solid #cf27af7a";

        }else{
            prod.previousElementSibling.children[0].src = "img/pizza.png";
            requeridop.style.display="none";
            requeridop.nextElementSibling.style.color="#515151";
            requeridop.nextElementSibling.nextElementSibling.children[0].style.color="#515151"
            valorPizza.style.borderBottom="none";
        }
    }

    if(prod.value == "check-empa"){
        if( prod.checked){
            prod.previousElementSibling.children[0].src = "img/empa-active.png";
            requeridoe.style.display="block";
            requeridoe.nextElementSibling.style.color="white";
            requeridoe.nextElementSibling.nextElementSibling.children[0].style.color="white"
            valorEmpanada.style.borderBottom="1px solid #cf27af7a";
        }else{
            prod.previousElementSibling.children[0].src = "img/empa.png";
            requeridoe.style.display="none";
            requeridoe.nextElementSibling.style.color="#515151";
            requeridoe.nextElementSibling.nextElementSibling.children[0].style.color="#515151"
            valorEmpanada.style.borderBottom="none";
        }
    }
}

function habilitarSiguiente(){

    if(cantComensales.value!=0){
        // comensales.length=((cantComensales.value)-1);
        if((!checkPizza.checked && checkEmpanada.checked) && valorEmpanada.value!=0){
            buttonSig1[0].removeAttribute('disabled');
        }else if((checkPizza.checked && checkEmpanada.checked) && (valorEmpanada.value!=0 && valorPizza.value!=0)){
            buttonSig1[0].removeAttribute('disabled');
        }else if((checkPizza.checked && !checkEmpanada.checked) && valorPizza.value!=0){
            buttonSig1[0].removeAttribute('disabled');
        }else{
            buttonSig1[0].setAttribute('disabled',"");
        }
    }else{
        buttonSig1[0].setAttribute('disabled',"");
    }
}

// transition 1

function transition(x){

    pantalla1.style.opacity="0";

    setTimeout(function() {  
        
        pantalla1.style.display = "none";

        if(x == "2Bis"){
            seleccionEmpanadas.style.opacity="0";
            setTimeout(function() {  
                seleccionEmpanadas.style.display = "none";
                transition2.style.display = "flex";
                setTimeoutOpacity(transition2,1,500);
                seleccionPizzas.style.display = "flex";
                setTimeoutOpacity(seleccionPizzas,1,500);
                seleccionPizzas.style.filter = "blur(4px)";
                seleccionPizza.scrollIntoView({behavior: 'smooth'}, true);

                rellenarComensales();
            }, 500);

        }else{

            if(!checkPizza.checked && checkEmpanada.checked){

                seleccionEmpanadas.style.display = "flex";
                setTimeoutOpacity(seleccionEmpanadas,1,500);
                seleccionEmpanadas.scrollIntoView({behavior: 'smooth'}, true);

            } else if(checkPizza.checked && !checkEmpanada.checked){
                seleccionPizzas.style.display = "flex";
                setTimeoutOpacity(seleccionPizzas,1,500);
                seleccionPizzas.scrollIntoView({behavior: 'smooth'}, true);

            } else {
                transition1.style.display = "flex";
                setTimeoutOpacity(transition1,1,500);
                seleccionEmpanadas.style.display = "flex";
                setTimeoutOpacity(seleccionEmpanadas,1,500);
                seleccionEmpanadas.style.filter = "blur(4px)";
            }
        }

    }, 500);

}

function habilitarConfirmarComensales(){

    if(cantComensalesEmpa.value!=0){

        if(cantComensalesEmpa.value > cantComensales.value){
            buttonComensalesEmpa.setAttribute('disabled',"");
            transition1error.innerText="mmm, en total no eran "+ cantComensales.value +" ?"
        }else{
            transition1error.innerHTML="";
            buttonComensalesEmpa.removeAttribute('disabled');
        }

    }else{
        buttonComensalesEmpa.setAttribute('disabled',"");
    }
}

//Pantalla 2

function siguientePantalla2() {
    transition1.style.display = "none";
    seleccionEmpanadas.style.filter = "none";
}

function bucleEmpa(el){

    let prod = el.parentElement.parentElement.id;

    rellenoPedido(prod);

    if(!checkPizza.checked){
        cantComensales.value --

        if (cantComensales.value == 0) {
            setFinalizar();
        }else{
            scrollToTop();
        }

    } else{
        cantComensalesEmpa.value--

        if (cantComensalesEmpa.value == 0) {
            transition("2Bis");
        }else{
            scrollToTop();
        }
   
    }

}

function scrollToTop(){

    seleccionEmpanadas.scrollIntoView({behavior: 'smooth'}, true);
    let nom = document.getElementById("nombre").value=" ";
    nom.placeholder = "Nombre:";
    let inputs = document.getElementsByClassName("empanada");
    for (let index = 0; index < inputs.length; ++index){
        inputs[index].value=0;
    }
}

//Pantalla 2Bis

function rellenarComensales(){
    let liComensales = document.getElementById("li-comensales");
    let fragmento = document.createDocumentFragment();
    let difCont = document.getElementById("dif-cont");
    difComensales = document.getElementById("dif-comensales");

    comensales.forEach(element=>{
        let itemCom = document.createElement('LI');
        itemCom.innerHTML = '<label id="ncomensal" for="comensalP">'+ element +'</label><span><input id="comensalP" name="comensalP" type="checkbox"class="input-pizza" onclick="comensalPizza(this)"></span>';
        fragmento.appendChild(itemCom)
    })

    liComensales.appendChild(fragmento);

    checkcomensalesP=document.querySelectorAll('#comensalP');

    if (comensales.length<cantComensales.value){
        dif =  (cantComensales.value)-(comensales.length);

        if (dif === 1) {
        difComensales.innerText = "Me falta " + dif + " persona que come pizza, ¿no?";
        } else {
            difComensales.innerText = "Me faltan " + dif + " personas que comen pizza, ¿no?";
        }

        while(dif!=0){
            let itemNom = document.createElement('LI');
            itemNom.innerHTML = '<label for="nombre" class="label-nombre"><i class="fa-solid fa-user-astronaut fa-xl nombre" style="color:#ffffff"></i><input id="nombre" placeholder="Nombre:" name="nombre" class="nombre input-comensal-p"></label>'
            difCont.appendChild(itemNom);
            dif--
        }

        inputComensalesP = document.querySelectorAll(".input-comensal-p");

        for(let i = 0; i < inputComensalesP.length; i++){
            inputComensalesP[i].addEventListener('keyup', habilitarConfirmarComensalesP);
        }
    }
}

function habilitarConfirmarComensalesP(){

    if (inputComensalesP==undefined){

        let check = false;

        for(let i=0 ; i < checkcomensalesP.length; i++){
            if(checkcomensalesP[i].checked){
                check = true;
            }
        }

        if(check){
            buttonComensalesPizza.removeAttribute('disabled');
        }else{
            buttonComensalesPizza.setAttribute('disabled',"");
        }

    }else{

        let error = true;

        for(let i=0 ; i < inputComensalesP.length; i++){
            if(inputComensalesP[i].value==null || inputComensalesP[i].value==""){
                error = true;
            }else{
                error = false;
            }
        }

        if(error){
            buttonComensalesPizza.setAttribute('disabled',"");
            difComensales.style.color="#3fd960";
        }else{
            buttonComensalesPizza.removeAttribute('disabled');
            difComensales.style.color="white";
        }
    }
}

function comensalPizza(el){

    for(let i=0; i < resumenPedido.length; i++){
        if(resumenPedido[i].nombre == el.parentElement.previousElementSibling.innerHTML){
            if(el.checked){ 
            resumenPedido[i].comensaleP = true; 
            }else{
            resumenPedido[i].comensaleP = false;           
            }
        }
    }
    
    habilitarConfirmarComensalesP();
    
}

function siguientePantalla2Bis(){

    if(inputComensalesP==undefined){
        transition2.style.display = "none";
        seleccionPizza.style.filter = "none";

    }else{
        for (let i=0; i < inputComensalesP.length; i++){
            const pedidoComensal = new PedidoComensal(null, [], 0, false, 0); // nombre, array de empanadas, total de empanadas, comensal Pizza,  total a pagar //
            pedidoComensal.nombre = inputComensalesP[i].value;
            pedidoComensal.comensaleP = true;
    
            resumenPedido.push(pedidoComensal);
        }
    
        transition2.style.display = "none";
        seleccionPizza.style.filter = "none";
    }
    
}

// custom 
function agregarEventosAClon(clon) {
    let botonSumar = clon.querySelector('.mas');
    let botonRestar = clon.querySelector('.menos');

    botonSumar.addEventListener('click', function () {
        sumar(botonSumar);
    });

    botonRestar.addEventListener('click', function () {
        restar(botonRestar);
    });
}

function addcustom(el) {
    let prod = el.parentElement.parentElement.id;
    const node = document.getElementById("li-custom");
    const clone = node.cloneNode(true); // Clonar el nodo

    // Limpiar el valor y restablecer los atributos de nombre
    let inputCustom = clone.querySelector('.custom');
    inputCustom.value = '';
    inputCustom.setAttribute("name", 'custom');
    inputCustom.parentElement.nextElementSibling.children[1].name='custom';
    clone.childNodes[3].childNodes[3].value='0';

    // Deshabilitar los botones del clon hasta que se ingrese un nombre
    let botones = clone.querySelectorAll('button');
    botones.forEach(boton => boton.setAttribute('disabled', true));

    if (prod == "seleccionEmpa") {
        document.getElementById("sabores-E").appendChild(clone);
    } else if (prod == "seleccionPizza") {
        document.getElementById("sabores-P").appendChild(clone);
    }

    agregarEventosAClon(clone);
}

function personalizarCustom(el){
    el.setAttribute("name", el.value);
    el.parentElement.nextElementSibling.children[1].name=el.value

    // Habilitar botones si se ha ingresado un nombre
    if (el.value.trim() !== "") {
        let botones = el.parentElement.nextElementSibling.querySelectorAll('button');
        botones.forEach(boton => boton.removeAttribute('disabled'));
    } else {
        let botones = el.parentElement.nextElementSibling.querySelectorAll('button');
        botones.forEach(boton => boton.setAttribute('disabled', true));
    }
}

// rellenar pedido
function rellenoPedido(el){

    if(el == "seleccionEmpa"){

        const pedidoComensal = new PedidoComensal(idCounter++, null, [], 0, false, 0); // id, nombre, array de empanadas, total de empanadas, comensal Pizza,  total a pagar //

        let inputsE = document.getElementsByClassName("empanada");

        pedidoComensal.nombre = document.getElementById("nombre").value;

        for (let i = 0; i < inputsE.length; ++i) {
            let empanada = new Empanada(null, 0);
            empanada.nombre = inputsE[i].name;
            empanada.cantidad = inputsE[i].value;
            pedidoComensal.totalEmpanadas += inputsE[i].valueAsNumber;
            pedidoComensal.listaEmpanadas.push(empanada);
        }

        pedidoComensal.totalPagar= (pedidoComensal.totalEmpanadas*valorEmpanada.value);
        totalFinalPagar+=pedidoComensal.totalPagar;
        resumenPedido.push(pedidoComensal);

        if(checkPizza.checked && checkEmpanada.checked){

            comensales.push(pedidoComensal.nombre);
        }

    }else{

        let inputsP = document.getElementsByClassName("pizza");
        let cantPizza = 0;

        for (let i = 0; i<inputsP.length; i++){
            let pizza = new Pizza(null, 0);
            pizza.nombre = inputsP[i].name;
            pizza.cantidad = inputsP[i].value;
            listaFinalP.push(pizza);

            cantPizza+= inputsP[i].valueAsNumber;
        }

        totalFinalPagar += cantPizza*valorPizza.value;

        resumenPedido.forEach(pedidoComensal => {
            if(pedidoComensal.comensaleP){
                cantComensalesP++
            }
        });

        let divisionPizza = (cantPizza*valorPizza.value)/cantComensalesP;

        resumenPedido.forEach(pedidoComensal => {
            if(pedidoComensal.comensaleP){
                pedidoComensal.totalPagar+= divisionPizza;
            }
        });

        setFinalizar();
    }
}

function setFinalizar() {
    seleccionEmpanadas.style.opacity="0";
    seleccionPizzas.style.opacity="0";

    setTimeout(function() { 
        seleccionEmpanadas.style.display="none";
        seleccionPizzas.style.display="none";
        resumen.style.display = "flex";
        setTimeoutOpacity(resumen,1,500);

        if(checkEmpanada.checked){
            listaFinalE = resumenPedido[0].listaEmpanadas

            for (let i = 1; i < resumenPedido.length; i++) {
                const empanadas = resumenPedido[i].listaEmpanadas;
                for (let index = 0; index < empanadas.length; index++) {
                    if(listaFinalE[index]==undefined){
                        listaFinalE.push(empanadas[index]);
                    }else{
                        listaFinalE[index].cantidad = parseInt(empanadas[index].cantidad, 10) + parseInt(listaFinalE[index].cantidad, 10);
                    }
                };
            }
        
            ListaFinalClean = listaFinalE.filter(empanadas => empanadas.cantidad > 0);
        }

        pantalla3();

    }, 500);
   
}

//Pantalla 3

function pantalla3(){
    const contenedorempa = document.querySelector(".resumen-empanadas");
    const contenedorPizza = document.querySelector(".resumen-pizza");
    const contenedorcomen = document.querySelector(".resumen-comensales");
    const contenedortotal = document.querySelector(".total");
    let fragmento = document.createDocumentFragment();

    resumen.scrollIntoView({behavior: 'smooth'}, true);

    if(checkEmpanada.checked && !checkPizza.checked){
        const h3E = document.createElement('H3');
        h3E.classList.add("h3");
        h3E.classList.add("resumen");
        h3E.innerText='Empanadas';
        contenedorempa.appendChild(h3E)
        contenedorempa.style.marginBottom="25px";

    }else if(checkPizza.checked && !checkEmpanada.checked){
        const h3P = document.createElement('H3');
        h3P.classList.add("h3");
        h3P.classList.add("resumen");
        h3P.innerText='Pizza';
        contenedorPizza.appendChild(h3P);
        contenedorPizza.style.marginBottom="25px";

        const itemComensal = document.createElement('LI');
        itemComensal.classList.add("li-resumen")
        itemComensal.innerHTML = '<label><p>Cada uno</p></label><span><p>$</p><input type="number" class="number n-resumen" value="'+ totalFinalPagar/cantComensales.value +'"></span>'.trim();
        contenedorcomen.appendChild(itemComensal);

    }else{
        const h3E = document.createElement('H3');
        h3E.classList.add("h3");
        h3E.classList.add("resumen");
        h3E.innerText='Empanadas';
        contenedorempa.appendChild(h3E)
        contenedorempa.style.marginBottom="25px";

        const h3P = document.createElement('H3');
        h3P.classList.add("h3");
        h3P.classList.add("resumen");
        h3P.innerText='Pizza';
        contenedorPizza.appendChild(h3P);
        contenedorPizza.style.marginBottom="25px";
    }

    ListaFinalClean.forEach(element => {
        const itemSabor = document.createElement('LI');
        itemSabor.classList.add("li-resumen")
        itemSabor.innerHTML = '<label>'+element.nombre+'</label><span><input type="number" class="number n-resumen" value="'+element.cantidad+'"></span>'.trim();
        fragmento.appendChild(itemSabor)
    });

    contenedorempa.appendChild(fragmento);

    listaFinalP.shift();

    listaFinalP.forEach(element => {
        if(element.cantidad!=0 && element.name!="pizza"){
            const itemPizza = document.createElement('LI');
        itemPizza.classList.add("li-resumen");
        itemPizza.innerHTML = '<label>'+element.nombre+'</label><span><input type="number" class="number n-resumen" value="'+element.cantidad+'"></span>';

        contenedorPizza.appendChild(itemPizza);
        }
        
    });

    resumenPedido.forEach(element => {
        const itemComensal = document.createElement('LI');
        itemComensal.classList.add("li-resumen")
        itemComensal.innerHTML = '<label>'+element.nombre+'</label><span><p>$</p><input type="number" class="number n-resumen re-total" value="'+element.totalPagar+'"></span>'.trim();
        fragmento.appendChild(itemComensal)
    });

    contenedorcomen.appendChild(fragmento);

    const itemTotal = document.createElement('LI');
    itemTotal.classList.add("li-resumen")
    itemTotal.innerHTML = '<label><h3 class="totalh3">TOTAL A PAGAR</h3></label><span><p>$</p><input type="number" class="number n-resumen re-total" value="'+totalFinalPagar+'"></span>'.trim();
    contenedortotal.appendChild(itemTotal);
}

function verDetalleResumen(){
    
    resumen.style.opacity="0"
    
    setTimeout(function() { 

        resumen.style.display="none";
        detalleResumen.style.display="flex";
        setTimeoutOpacity(detalleResumen,1, 500)
        detalleResumen.scrollIntoView({behavior: 'smooth'}, true);

        detalleCont.innerHTML = ''; 

        resumenPedido.forEach(pedidoComensal => {
            const nombre = document.createElement('H3');
            nombre.classList.add("h3");
            nombre.classList.add("resumen");
            nombre.innerText=pedidoComensal.nombre;

            const btnEditar = document.createElement('button');
            btnEditar.innerHTML = 'Editar';
            btnEditar.onclick = () => editarPedido(pedidoComensal.id);

            const ulPedido = document.createElement('UL');

            pedidoComensal.listaEmpanadas.forEach(empanada => {
                if(empanada.cantidad!=0){
                    const liEmpanada = document.createElement('LI');
                    liEmpanada.classList.add("li-resumen");
                    liEmpanada.innerHTML = '<label>'+ empanada.nombre +'</label><span><input type="number" class="number n-resumen" value="'+ empanada.cantidad +'"></span>'.trim();
                    ulPedido.appendChild(liEmpanada);
                }
            });

            if(pedidoComensal.comensaleP){
                const liPizza = document.createElement('LI');
                liPizza.classList.add("li-resumen");
                liPizza.innerHTML = '<label><img src="img/pizza-active.png" alt="icono de pizza"></label class="n-resumen"><span class="re-check"><i class="fa-solid fa-check"></i></span>';
                ulPedido.appendChild(liPizza);

            }else{
                const liPizza = document.createElement('LI');
                liPizza.classList.add("li-resumen");
                liPizza.innerHTML = '<label><img src="img/pizza.png" alt="icono de pizza"></label class="n-resumen"></label><span class="re-check"><i class="fa-solid fa-xmark"></i></i></span>';
                ulPedido.appendChild(liPizza);
            }

            detalleCont.appendChild(nombre);
            detalleCont.appendChild(btnEditar);
            detalleCont.appendChild(ulPedido);
        });
    }, 500);
}

function editarPedido(id) {
    // Buscar el pedido por id
    const pedidoComensal = resumenPedido.find(pedido => pedido.id === id);
    const botonSiguiente = document.getElementById('button-seleccion');
    const eventoOriginal = botonSiguiente.onclick;

    setTimeout(function() { 
        if (pedidoComensal) {
            // Mostrar la pantalla de edición con los datos cargados
            detalleResumen.style.opacity="0"
            detalleResumen.style.display = 'none';
            seleccionEmpanadas.style.display = 'flex';
            seleccionEmpanadas.style.opacity="1"
            

            const inputsE = document.getElementsByClassName("empanada");
            for (let i = 0; i < inputsE.length; ++i) {
                const empanadaName = inputsE[i].name;
                const empanadaSeleccionada = pedidoComensal.listaEmpanadas.find(e => e.nombre === empanadaName);
                inputsE[i].value = empanadaSeleccionada ? empanadaSeleccionada.cantidad : 0;
            }

        // Cambiar el texto y la funcionalidad del botón


        botonSiguiente.innerText = "Finalizar Edición"; 
        botonSiguiente.onclick = function() {
            actualizarPedido(id); // Llamar a la función de actualización

            // Restaurar el comportamiento original después de editar
            botonSiguiente.innerText = "Siguiente";
            botonSiguiente.onclick = eventoOriginal; // Volver al evento original
        };
        }
    }, 500);
}

function actualizarPedido(id) {
    const pedidoComensal = resumenPedido.find(pedido => pedido.id === id);

    if (pedidoComensal) {
        const inputsE = document.getElementsByClassName("empanada");
        pedidoComensal.listaEmpanadas = [];
        pedidoComensal.totalEmpanadas = 0;

        for (let i = 0; i < inputsE.length; ++i) {
            let empanada = new Empanada(inputsE[i].name, inputsE[i].valueAsNumber);
            if (empanada.cantidad > 0) {
                pedidoComensal.listaEmpanadas.push(empanada);
                pedidoComensal.totalEmpanadas += empanada.cantidad;
            }
        }

        // Actualizar la cantidad total en el resumen
        resumenPedido = resumenPedido.map(pedido => pedido.id === id ? pedidoComensal : pedido);

        document.querySelector(".resumen-empanadas").innerHTML = '';
        document.querySelector(".resumen-pizza").innerHTML = '';
        document.querySelector(".resumen-comensales").innerHTML = '';
        document.querySelector(".total").innerHTML = '';

        setFinalizar();
    }
}

function volver(){
   
    detalleResumen.style.opacity="0";
    
    setTimeout(function() { 
        detalleResumen.style.display="none";
        resumen.style.display="flex";
        setTimeoutOpacity(resumen,1,500)
        resumen.scrollIntoView({behavior: 'smooth'}, true);

        while (detalleCont.firstChild) {
            detalleCont.removeChild(detalleCont.firstChild);
        }
    }, 500);
}
