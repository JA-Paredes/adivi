$(function () {
    $("#select").prop('selectedIndex', 0); // Reiniciar el select al primer valor al recargar.
    $("#respu").val(""); // Vaciar el campo de respuesta al recargar.
    $("#select").change(intentos);
    $("#inputresp").change(validar);
    $("#reset").click(reset);
});


// Función que devuelve el número aleatorio entre 0 y 100

function aleatorio() {

    var min = 0;
    var max = 100;
    return Number(Math.floor((Math.random() * (max - min + 1))) + min);

}

/* Función encargada de fijar los intentos gastados y los iniciales del usuario. Además se encarga de llamar a la función que "cambia" la página para borrar el select .A esta función sólo es necesario llamarla una vez. */

function intentos() {

    random = aleatorio();
    console.log(random);
    numin = Number($("#select").val());
    gastados = 1;
    cambio(numin);

}

// Esta es la función anteriormente comentada en el html. Quita el select para que el usuario no pueda hacer trampa. Sólo es necesario llamarla una vez, y de ello se encarga la función intentos().

function cambio(num) {

    $("#texto").html("Te quedan " + num + " intentos.  ");
    $("#respuesta").show();

}

/* Función principal, es la que compara los valores del usuario con la generada aleatoriamente. Es llamada mediante la función validar(). Tanto los cambios al número de intentos disponibles como de los gastados se aumentan y/o reducen al hacer cada comprobación. */

function principal(respu) {

    $("#recuento").show();
    $("#solucion").show();
    
   
    // Aquí entramos si se acierta
    if (respu === random) {
            $("#solucion").html(" ¡Era el " + random + " , felicidades, lo has logrado al intento número " + gastados + "!");
            numin -= 1;
            $("#texto").html("Te quedaban " + numin + " intento/s.  ");
            $("#respuesta,#recuento").hide();
        }
    // numin es 1 porque si llega a 0 de la forma en la que está programado, el usuario tendría un intento más. Se entra si el usuario se queda sin intentos.
    else if (numin === 1) { 

        $("#solucion").html("¡Has perdido, era el " + random + "! no has podido adivinarlo en " + gastados + " intento/s.");
        $("#texto").html("¡Te has quedado sin intentos!");
        $("#respuesta,#recuento").hide();        
    } 
    
    // Mientras se tengan intentos se entra a este else.
    else {

        if (respu > random) {
            $("#solucion").html(" ¡Te has pasado! El número es menor...");
            numin -= 1;
            gastados += 1;
            $("#texto").html("Te quedan " + numin + " intentos.  ");
            mayor(respu);
        } else if (respu < random) {
            $("#solucion").html(" ¡Te has quedado corto! El número es mayor...");
            numin -= 1;
            gastados += 1;
            $("#texto").html("Te quedan " + numin + " intentos.  ");
            menor(respu);
            
        
        } 
    }

    $("#inputresp").val(""); //Vaciar el campo de input entre respuesta y respuesta para facilidad del usuario.

}

// Validador que comprueba dos condiciones; que el valor introducido sea un número y que esté en el rango del juego, de 0 a 100. Si el valor es correcto llama a la función principal. 

function validar() {
    var respu = Number($("#inputresp").val());
    var letras = $("#inputresp").val();
    if (isNaN(respu)) {
        $("#solucion").show();
        $("#solucion").html('¿Desde cuándo "' + letras + '" es un número? ¡No te quedes conmigo!');
    } else if (respu > 100 | respu < 0) {
        $("#solucion").show();
        $("#solucion").html("¡El juego es entre 0 y 100!");
    } else {
        principal(respu);
    }
}

// Función que resetea la página al estado inicial por si el usuario se rinde a mitad de una partida.

function reset() {

    location.reload();

}

/* Estas dos funciones (mayor y menor) hacen lo mismo, pero una para el número mayor y otra para el menor. Cuando estaba probando el funcionamiento de la página, me dí cuenta de que a veces es complicado saber los números que habías introducido anteriormente, por lo que creé una función que mostraba los valores ya utilizados, pero te liabas igual o más. Así que diseñé dos funciones, que lo que hacen es almacenar los valores más próximos que el usuario introduce tanto por arriba como por abajo de la solución. Así, cuando vas realizando intentos, estas dos funciones van acotando el resultado y es mucho más sencillo e intuitivo jugar. */

var i = 0;
var compa = [];

function mayor(numero) {

    compa.push(numero);
    if (compa[i] < compa[i - 1]) {
        $("#mayor").html(compa[i]);
    } else if (compa[i - 1] == null) {
        $("#mayor").html(numero);
    }
    i++;
}

var j = 0;
var compa2 = [];

function menor(numero) {

    compa2.push(numero);
    if (compa2[j] > compa2[j - 1]) {
        $("#menor").html(compa2[j]);
    } else if (compa2[j - 1] == null) {
        $("#menor").html(numero);
    }
    j++;
}
