const valores = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const signos = ["♠", "♥", "♦", "♣"];

const mazo = inicializarMazo();
mezclarMazo(mazo);

let cantidadJugadores, cantidadCartas;

let faltanConfiguraciones = true;

while (faltanConfiguraciones) {
  cantidadJugadores = parseInt(prompt("¿Cuántos jugadores participarán?"));
  cantidadCartas = parseInt(prompt("¿Cuántas cartas debería recibir cada jugador?"));
  
  if (cantidadJugadores*cantidadCartas > mazo.length) {
    alert(`¡No puedes lidiar con más de ${mazo.length} cartas!`);
    continue;
  }
  
  faltanConfiguraciones = false;
}

const mazosJugadores = repartirCartas(mazo, cantidadJugadores, cantidadCartas);
let cadenaMostrar = '';
mazosJugadores.forEach(mazo => {
  cadenaMostrar = cadenaMostrar.concat(mazo.join(",")+'\n');
});

alert(`El mazo ha sido barajado y este es el mazo de cada jugador: ${cadenaMostrar}`);

// Crea una carta para cada signo y cada número y devuelve el resultado
function inicializarMazo() {
  const mazoCompleto = [];
  
  signos.forEach(signo => {
    valores.forEach(val => {
      mazoCompleto.push(val+signo);
    });
  });
  
  return mazoCompleto;
};

// Baraja el mazo usando splice()
function mezclarMazo(mazo) {
  for (let indiceCarta = 0; indiceCarta < mazo.length; indiceCarta++) {
    const nuevaPosicion = Math.floor(Math.random() * mazo.length);
    const carta = mazo[indiceCarta];
    
    // Remueve la carta de su posición actual
    mazo.splice(indiceCarta, 1);
    
    // Mueve la carta a la nueva posición
    mazo.splice(nuevaPosicion, 0, carta);
  }
};

// Entrega cartas del mazo dependiendo de la cantidad de jugadores y una cantidad específica de cartas por jugador
function repartirCartas(mazo, cantidadJugadores, cartasPorJugador) {
  const mazosJugadores = [];
  
  // Crea un sub-array para el mazo de cada jugador
  for (let indiceJugador = 0; indiceJugador < cantidadJugadores; indiceJugador++) {
    mazosJugadores.push([]);
  }
  
  for (let iteradorCarta = 0; iteradorCarta < cartasPorJugador; iteradorCarta++) {
    for (let indiceJugador = 0; indiceJugador < cantidadJugadores; indiceJugador++) {
      const cartaJugador = mazo.pop();
      mazosJugadores[indiceJugador].push(cartaJugador);
    }
  }
  
  return mazosJugadores;
}
