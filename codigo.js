
// Pantalla 1
let pantalla1 = document.getElementById("pantalla-1");
let h4 = document.getElementById('h4');
let cantComensales=document.getElementById("comensales");
let checkEmpanada=document.getElementById("check-empa");
let checkPizza = document.getElementById("check-pizza");
let valorEmpanada=document.getElementById("valorEmpanada");
let valorPizza = document.getElementById("valorPizza");
valorEmpanada.addEventListener('keyup', habilitarSiguiente);
valorPizza.addEventListener('keyup', habilitarSiguiente);
let buttonSig1 = document.getElementsByClassName("button-sig-1");
let requeridop = document.getElementsByClassName("requerido-p")[0];
let requeridoe = document.getElementsByClassName("requerido-e")[0];

// transition 1 (empanadas)

let transition1 = document.getElementById("transition-empa");
let cantComensalesEmpa = document.getElementById("cant-comensales-empa");
cantComensalesEmpa.addEventListener('keyup', habilitarConfirmarComensales);
let transition1error = document.getElementById("transition-empa-error");
let buttonComensalesEmpa = document.getElementById("button-transition-empa");

//transition 2 (pizzas)

let transition2 = document.getElementById("transition-pizza");
let difComensales;
let inputComensalesP;
let chekcomensalesP;
let cantComensalesP=0;
let buttonComensalesPizza = document.getElementById("button-transition-pizza");

//pantalla 2 (seleccion empanadas)

let seleccionEmpanadas = document.getElementById("seleccionEmpa");
let customName = document.querySelector('.custom');

//pantalla 2Bis (seleccion pizzas)

let seleccionPizzas = document.getElementById("seleccionPizza");

//objetos

function PedidoComensal (nombre, listaEmpanadas, totalEmpanadas, comensaleP, totalPagar){
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

let comensales=[];
let resumenPedido=[];
let listaFinalE =[Empanada];
let listaFinalP = [Pizza];
let totalFinalPagar = 0;
let ListaFinalClean=[];

// Pantalla 1

function sumar(contador) {
    let cont = contador.previousSibling.valueAsNumber;
    cont = cont + 1;

    if (cont <= 15) {
        contador.previousSibling.valueAsNumber = cont;
        let bichito = document.createElement('i');
        bichito.classList.add("fa-solid", "fa-user-astronaut", "fa-xl")
        document.getElementById('user').appendChild(bichito);
    }
}

function restar(contador) {
    let user = document.getElementById('user');
    if (contador.nextSibling.valueAsNumber < 1) {
        return;
    } else {
        contador.nextSibling.valueAsNumber = contador.nextSibling.valueAsNumber - 1;
        user.removeChild(user.lastElementChild)
    }
}

function prodCheck(prod){
    if(prod.value == "check-pizza"){
        if( prod.checked){
            prod.previousElementSibling.children[0].src = "img/pizza-activ.png";
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
            prod.previousElementSibling.children[0].src = "img/empa-activ.png";
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
    }
}

// transition 1

function transition(x){

    pantalla1.style.display = "none";
    h4.style.display = "none";

    if(x == "2Bis"){
        seleccionEmpanadas.style.display = "none";
        transition2.style.display = "flex";
        seleccionPizzas.style.display = "flex";
        seleccionPizzas.style.filter = "blur(4px)";
        seleccionPizza.scrollIntoView({behavior: 'smooth'}, true);

        rellenarComensales();

    }else{

        if(!checkPizza.checked && checkEmpanada.checked){

            seleccionEmpanadas.style.display = "flex";

        } else if(checkPizza.checked && !checkEmpanada.checked){

            seleccionPizzas.style.display = "flex";

        } else {
            transition1.style.display = "flex";
            seleccionEmpanadas.style.display = "flex";
            seleccionEmpanadas.style.filter = "blur(4px)";
        }
    }


}

function habilitarConfirmarComensales(){

    if(cantComensalesEmpa.value!=0){

        if(cantComensalesEmpa.value > cantComensales.value){
            buttonComensalesEmpa.setAttribute('disabled',"");
            transition1error.innerText="mmm, algo anda mál. El total de gorditos es "+ cantComensales.value +".\r\n ¿Alguien se está infiltrando?"
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
        }

    } else{
        cantComensalesEmpa.value--

        if (cantComensalesEmpa.value == 0) {
            transition("2Bis");
        }
    }

    scrollToTop();
}

function scrollToTop(){

    seleccionEmpanadas.scrollIntoView({behavior: 'smooth'}, true);
    document.getElementById("nombre").value=" ";
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

    if (comensales.length<cantComensales.value){
        let dif =  (cantComensales.value)-(comensales.length);

        difComensales.innerText= "Me faltan " + dif +" gorditos que comen pizza, ¿no?";

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

    let error = new Array(inputComensalesP.length);


    for(let i=0 ; i < inputComensalesP.length; i++){
        if(inputComensalesP[i].value==null || inputComensalesP[i].value==""){
            error[i] = true;
        }else{
            error[i] = false;
        }
    }

    if(error.includes(true)){
        buttonComensalesPizza.setAttribute('disabled',"");
        difComensales.style.color="#3fd960";
    }else{
        buttonComensalesPizza.removeAttribute('disabled');
        difComensales.style.color="white";
    }
}

function comensalPizza(el){

    resumenPedido.forEach(element => {
        if(element.nombre == el.parentElement.previousElementSibling.innerHTML){
            element.comensaleP = true;
            cantComensalesP++;
        }else{
            element.comensaleP = false;
            cantComensalesP--;
        }
    });
    
}

function siguientePantalla2Bis(){
    for (let i=0; i < inputComensalesP.length; i++){
        const pedidoComensal = new PedidoComensal(null, [], 0, false, 0); // nombre, array de empanadas, total de empanadas, comensal Pizza,  total a pagar //
        pedidoComensal.nombre = inputComensalesP[i].value;
        pedidoComensal.comensaleP = true;

        resumenPedido.push(pedidoComensal);

        cantComensalesP++;
    }

    transition2.style.display = "none";
    seleccionPizza.style.filter = "none";
}

// custom y rellenar pedido

function addcustom(el){
    let prod = el.parentElement.parentElement.id
    const node = document.getElementById("li-custom");
    const clone = node.cloneNode(true);

    if (prod == "seleccionEmpa"){
        document.getElementById("sabores-E").appendChild(clone);
    } else if (prod == "seleccionPizza"){
        document.getElementById("sabores-P").appendChild(clone);
    }

}

function personalizarCustom(el){
    el.setAttribute("name", el.value);
    el.parentElement.nextElementSibling.children[1].name=el.value
}

function rellenoPedido(el){

    if(el == "seleccionEmpa"){

        const pedidoComensal = new PedidoComensal(null, [], 0, false, 0); // nombre, array de empanadas, total de empanadas, comensal Pizza,  total a pagar //

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
    seleccionEmpanadas.style.display="none";
    seleccionPizzas.style.display="none";
    document.getElementById("resumen").style.display = "flex";

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

}

//Pantalla 3

function pantalla3(){
    const contenedorempa = document.querySelector(".resumen-empanadas");
    const contenedorPizza = document.querySelector(".resumen-pizza");
    const contenedorcomen = document.querySelector(".resumen-comensales");
    const contenedortotal = document.querySelector(".total");
    let fragmento = document.createDocumentFragment();

    if(checkEmpanada.checked && !checkPizza.checked){
        const h3E = document.createElement('H3');
        h3E.classList.add("h3.resumen");
        h3E.innerHTML='<h3 class="resumen">Empanadas</h3>';
        contenedorempa.appendChild(h3E)
    }else if(checkPizza.checked && !checkEmpanada.checked){
        const h3P = document.createElement('H3');
        h3P.classList.add("h3.resumen");
        h3P.innerHTML='<h3 class="resumen">Pizza</h3>';
        contenedorPizza.appendChild(h3P);
    }else{
        const h3E = document.createElement('H3');
        h3E.classList.add("h3.resumen");
        h3E.innerHTML='<h3 class="resumen">Empanadas</h3>';
        contenedorempa.appendChild(h3E)

        const h3P = document.createElement('H3');
        h3P.classList.add("h3.resumen");
        h3P.innerHTML='<h3 class="resumen">Pizza</h3>';
        contenedorPizza.appendChild(h3P);
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
        itemComensal.innerHTML = '<label>'+element.nombre+'</label><span><p>$</p><input type="number" class="number n-resumen" value="'+element.totalPagar+'"></span>'.trim();
        fragmento.appendChild(itemComensal)
    });
    contenedorcomen.appendChild(fragmento);

    const itemTotal = document.createElement('LI');
    itemTotal.classList.add("li-resumen")
    itemTotal.innerHTML = '<label><h3 class="totalh3">TOTAL A PAGAR</h3></label><span><p>$</p><input type="number" class="number n-resumen" value="'+totalFinalPagar+'"></span>'.trim();
    contenedortotal.appendChild(itemTotal);
}
