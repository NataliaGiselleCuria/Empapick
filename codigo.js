
var cantComensales=document.getElementById("comensales").value;
var valorPorEmpanada=document.getElementById("valorEmpanada").value;
const buttonSig1=document.getElementsByClassName("button-sig-1");
const valorprecio = document.querySelector('.precio');
const customName = document.querySelector('.custom');
const resumenPedido=[];
var listaFinal =[Empanada];
var totalFinalPagar = 0;
var ListaFinalClean=[];

// Pantalla 1 

function sumar(contador) {
    console.log(contador)
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

function habilitarSiguiente(){
    cantComensales=document.getElementById("comensales").value;
    valorPorEmpanada=document.getElementById("valorEmpanada").value;
    if(cantComensales!=0 && valorPorEmpanada!=0){
        buttonSig1[0].removeAttribute('disabled');  
      } else { 
        buttonSig1[0].setAttribute('disabled',"");
    }
}

valorprecio.addEventListener('keyup', habilitarSiguiente);

function SiguientePantalla1() {
    cantComensales = document.getElementById("comensales").value;
    valorPorEmpanada = document.getElementById("valorEmpanada").value;
    document.getElementById("seleccion").style.display = "flex";
    document.getElementById("pantalla-1").style.display = "none";
    document.getElementById('h4').style.display = "none";
}

//Pantalla 2

function PedidoComensal (nombre, listaEmpanadas, totalEmpanadas, totalPagar){
    this.nombre=nombre;
    this.listaEmpanadas=listaEmpanadas;
    this.totalEmpanadas=totalEmpanadas;
    this.totalPagar=totalPagar;
}

function Empanada(nombre, cantidad) {
    this.nombre = nombre;
    this.cantidad = cantidad;
} 

function siguientePantalla2(){  

    rellenoPedido();
    cantComensales--
    if (cantComensales == 0) {
        setFinalizar();
    }
    scrollToTop();  
}

function rellenoPedido(){
    
    const pedidoComensal = new PedidoComensal(null, [], 0, 0);     // nombre, array de empanadas, total de empanadas, total a pagar //
    var inputs = document.getElementsByClassName("empanada");

    pedidoComensal.nombre = document.getElementById("nombre").value;
    
    for (let index = 0; index < inputs.length; ++index) {
        var empanada = new Empanada(null, 0);
        empanada.nombre = inputs[index].name;
        empanada.cantidad = inputs[index].value;
        pedidoComensal.totalEmpanadas += inputs[index].valueAsNumber;
        pedidoComensal.listaEmpanadas.push(empanada);
    }
    
    pedidoComensal.totalPagar= (pedidoComensal.totalEmpanadas*valorPorEmpanada);
    totalFinalPagar+=pedidoComensal.totalPagar;
    resumenPedido.push(pedidoComensal);

}

function scrollToTop(){
    var access = document.getElementById("seleccion");
    access.scrollIntoView({behavior: 'smooth'}, true);
    document.getElementById("nombre").value=" ";
    var inputs = document.getElementsByClassName("empanada");
    for (let index = 0; index < inputs.length; ++index){
        inputs[index].value=0;
    }
}

function addcustom(el){
    const node = document.getElementById("li-custom");
    const clone = node.cloneNode(true);
    document.getElementById("sabores").appendChild(clone); 
}

function personalizarCustom(el){
    el.setAttribute("name", el.value);
    el.parentElement.nextElementSibling.children[1].name=el.value
}

//customName.addEventListener('keyup', personalizarCustom);
   

function setFinalizar() {
    var boton = document.getElementById("button-seleccion");
    boton.innerText = "Finalizar";
    document.getElementById("resumen").style.display = "flex";
    document.getElementById("seleccion").style.display = "none";

    listaFinal = resumenPedido[0].listaEmpanadas

    for (var i = 1; i < resumenPedido.length; i++) {
        const empanadas = resumenPedido[i].listaEmpanadas;
        for (let index = 0; index < empanadas.length; index++) {   
            if(listaFinal[index]==undefined){
                listaFinal.push(empanadas[index]);
            }else{
                listaFinal[index].cantidad = parseInt(empanadas[index].cantidad, 10) + parseInt(listaFinal[index].cantidad, 10);
            }
        };
    }

    ListaFinalClean = listaFinal.filter(empanadas => empanadas.cantidad > 0);
    pantalla3();
}

//Pantalla 3

function pantalla3(){
    const contenedorempa = document.querySelector(".resumen-empanadas");
    const contenedorcomen = document.querySelector(".resumen-comensales");
    const contenedortotal = document.querySelector(".total");
    const fragmento = document.createDocumentFragment();

    ListaFinalClean.forEach(element => {
         const itemSabor = document.createElement('LI');
         itemSabor.classList.add("li-resumen")
         itemSabor.innerHTML = '<label>'+element.nombre+'</label><span><input type="number" class="number n-resumen" value="'+element.cantidad+'"></span>'.trim();
        fragmento.appendChild(itemSabor)
    });

    contenedorempa.appendChild(fragmento);

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
