const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataque-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataque-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputPochimon
let inputTlacuamon
let inputFenixmon
let inputGary
let inputPoff
let inputMedusa
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = "./asset/mokemapa.png"
let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 400

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa -20 
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa 
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Pochimon = new Mokepon('Pochimon', './asset/0e8b0e87648a7acb7f873e6a0a84cbd4.png', 5, "./asset/cabeza_pochimon.png")

let Tlacuamon = new Mokepon('Tlacuamon', './asset/2e3ca932df4672fb7cdc453b21f8e52e.png', 5, "./asset/cabeza_tlacuamon.png")

let Fenixmon = new Mokepon('Fenixmon', './asset/2faf9d5dd164ca305c6a03ea3bb26a8e.png', 5, "./asset/cabeza_fenixmon.png")

let Gary = new Mokepon("Gary", "./asset/gary.png", 5, "./asset/gary.png")

let Poff = new Mokepon("Poff", "./asset/poff.png", 5, "./asset/poff.png")

let Medusa = new Mokepon("Medusa", "./asset/medusa.png", 5, "./asset/medusa.png")

const Pochimon_ataques = [
    { nombre: "💧", id:"boton-agua"},
    { nombre: "💧", id:"boton-agua"},
    { nombre: "💧", id:"boton-agua"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🌿", id:"boton-tierra"},
]

Pochimon.ataques.push(...Pochimon_ataques)

const Tlacuamon_ataques = [
    { nombre: "💧", id:"boton-agua"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🌿", id:"boton-tierra"},
]

Tlacuamon.ataques.push(...Tlacuamon_ataques)

const Fenixmon_ataques = [
    { nombre: "🌿", id:"boton-tierra"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🌿", id:"boton-tierra"},
]

Fenixmon.ataques.push(...Fenixmon_ataques)

const Gary_ataques = [ 
    { nombre: "🌿", id:"boton-tierra"},
    { nombre: "💧", id:"boton-agua"},
    { nombre: "🌿", id:"boton-tierra"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🌿", id:"boton-tierra"},
]

Gary.ataques.push(...Gary_ataques)

const Poff_ataques = [
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "💧", id:"boton-agua"},
    { nombre: "🌿", id:"boton-tierra"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "💧", id:"boton-agua"},
]

Poff.ataques.push(...Poff_ataques)

const Medusa_ataques = [
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🔥", id:"boton-fuego"},
    { nombre: "🌿", id:"boton-tierra"},
    { nombre: "🌿", id:"boton-tierra"},
    { nombre: "💧", id:"boton-agua"},
]

Medusa.ataques.push(...Medusa_ataques)


mokepones.push(Pochimon,Tlacuamon,Fenixmon, Gary, Poff, Medusa)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputPochimon = document.getElementById('Pochimon')
    inputTlacuamon = document.getElementById('Tlacuamon')
    inputFenixmon = document.getElementById('Fenixmon')
    inputGary = document.getElementById('Gary')
    inputPoff = document.getElementById('Poff')
    inputMedusa = document.getElementById('Medusa')

    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}
function unirseAlJuego() {
    fetch("http://192.168.1.75:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function(respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
     
    if (inputPochimon.checked) {
        spanMascotaJugador.innerHTML = inputPochimon.id
        mascotaJugador = inputPochimon.id
    } else if (inputTlacuamon.checked) {
        spanMascotaJugador.innerHTML = inputTlacuamon.id
        mascotaJugador = inputTlacuamon.id
    } else if (inputFenixmon.checked) {
        spanMascotaJugador.innerHTML = inputFenixmon.id
        mascotaJugador = inputFenixmon.id
    } else if (inputGary.checked) {
        spanMascotaJugador.innerHTML = inputGary.id
        mascotaJugador = inputGary.id
    } else if (inputPoff.checked) {
        spanMascotaJugador.innerHTML = inputPoff.id
        mascotaJugador = inputPoff.id
    } else if (inputMedusa.checked) {
        spanMascotaJugador.innerHTML = inputMedusa.id
        mascotaJugador = inputMedusa.id
    }  else {
        alert('Selecciona una mascota')
        return
    }
    sectionSeleccionarMascota.style.display = 'none'
   
    selecionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
    
}

function selecionarMokepon(mascotaJugador) {
    fetch("http://192.168.1.75:8080/MOKEPONN/" + jugadorId, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonTierra = document.getElementById('boton-tierra')
     botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true 
            }
            if (ataqueJugador.length === 5) {
            enviarAtaques()  
            }
        })
    })
    

} 

function enviarAtaques() {
    fetch("http://192.168.1.75:8080/MOKEPONN/" + jugadorId + "/ataques", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           ataques: ataqueJugador 
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}
function obtenerAtaques() {
    fetch("http://192.168.1.75:8080/MOKEPONN/" + enemigoId + "/ataques")
        .then(function(res) {
            if (res.ok) {
                res.json()
                    .then(function({ ataques }) {
                        if (ataques.length === 5 ) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre,
    ataquesMokeponEnemigo = enemigo.ataques,
    secuenciaAtaque() 
}

function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}
function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        }else if (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA") {
            indexAmbosOponentes (index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") {
            indexAmbosOponentes (index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA") {
            indexAmbosOponentes (index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes (index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("ESTO FUE UN EMPATE")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICIDADES HAS GANADO")
    } else {
        crearMensajeFinal("LO SIENTO, HAS PERDIDO")
    }
}

function crearMensaje(resultado) {
    
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    
    sectionMensajes.innerHTML = resultadoFinal

    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect (0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0, 
        0, 
        mapa.width,
        mapa.height,
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
    fetch("http://192.168.1.75:8080/MOKEPONN/" + jugadorId + "/posicion", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x, 
            y,
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function ({ enemigos }) {
            
                mokeponesEnemigos = enemigos.map(function(enemigo) {
                    console.log(enemigos);
                    let mokeponEnemigo = null;
                    
                    // Validar que 'enemigo.mokepon' exista antes de acceder a 'nombre'
                    const mokeponNombre = (enemigo.mokepon && enemigo.mokepon.nombre) ? enemigo.mokepon.nombre : "";
            
            
            // .then(function ({ enemigos }) {
                
                //mokeponesEnemigos = enemigos.map(function(enemigo) {
                    //console.log(enemigos)
                    //let mokeponEnemigo = null
                    //const mokeponNombre = enemigo.mokepon.nombre || ""
                    
                    if (mokeponNombre === "Pochimon") {
                        mokeponEnemigo = new Mokepon('Pochimon', './asset/0e8b0e87648a7acb7f873e6a0a84cbd4.png', 5, "./asset/cabeza_pochimon.png", enemigo.id)
                    } else if (mokeponNombre === "Tlacuamon") {
                        mokeponEnemigo = new Mokepon('Tlacuamon', './asset/2e3ca932df4672fb7cdc453b21f8e52e.png', 5, "./asset/cabeza_tlacuamon.png", enemigo.id)
                    } else if (mokeponNombre === "Fenixmon") {
                        mokeponEnemigo = new Mokepon('Fenixmon', './asset/2faf9d5dd164ca305c6a03ea3bb26a8e.png', 5, "./asset/cabeza_fenixmon.png", enemigo.id)
                    } else if (mokeponNombre === "Gary") {
                        mokeponEnemigo = new Mokepon("Gary", "./asset/gary.png", 5, "./asset/cabeza_gary.png", enemigo.id)
                    } else if (mokeponNombre === "Poff") {
                        mokeponEnemigo = new Mokepon("Poff", "./asset/poff.png", 5, "./asset/poff.png", enemigo.id)
                    } else if (mokeponNombre === "Medusa") {
                        mokeponEnemigo = new Mokepon("Medusa", "./asset/medusa.png", 5, "./asset/medusa.png", enemigo.id)
                    }

                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y

                    return mokeponEnemigo

                    })
                
                })
            
        }
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
            case "ArrowRight":
            moverDerecha()
            break;
        default:
            break;
    }
}
function iniciarMapa() {
    mascotaJugadorObjeto = obtenerMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugadorObjeto);
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", sePresionoUnaTecla)

    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo 
    ) {
        return 
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detectó una colision: ")

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)