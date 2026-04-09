// 🔥 VARIABLES
let totalGanancias = 0
let totalAnimales = 0
let huevosTotal = 0
let carneTotal = 0
let lecheTotal = 0
let totalOperaciones = 0
let totalIngresos = 0
let totalGastos = 0
let registroProduccion = []

const animalConfig = {
    gallina: { huevos: 25, carne: 2, leche: 0 },
    vaca: { huevos: 0, carne: 200, leche: 20 },
    cerdo: { huevos: 0, carne: 90, leche: 0 },
    domestico: { huevos: 0, carne: 0, leche: 0 }
}

let statsPorAnimal = {
    gallina: { cantidad: 0, ganancia: 0 },
    vaca: { cantidad: 0, ganancia: 0 },
    cerdo: { cantidad: 0, ganancia: 0 },
    domestico: { cantidad: 0, ganancia: 0 }
}

let grafica = null
let graficaAnimal = null

// 🔥 GLOSARIO (SOLO UNA VEZ)
const definiciones = {
    ROI: ["Retorno de inversión", "Ej: inviertes 100 y ganas 150"],
    Ganancia: ["Ingresos - gastos", "Ej: 500 - 300 = 200"],
    Engorde: ["Aumento de peso", "Ej: alimentar ganado"],
    Pastoreo: ["Alimentación en campo", "Ej: vacas comiendo pasto"],
    Inventario: ["Total de animales", "Ej: 20 vacas"],
    "Conversión alimenticia": ["Relación alimento/peso", "Ej: 5kg → 1kg"],
    Rentabilidad: ["Capacidad de generar dinero", "Ej: negocio rentable"],
    "Producción lechera": ["Cantidad de leche", "Ej: 15L diarios"],
    Hato: ["Grupo de animales", "Ej: conjunto de vacas"],
    Forraje: ["Alimento natural", "Ej: pasto"],

    Cría: ["Cuidado inicial", "Ej: terneros"],
    Recría: ["Etapa de crecimiento", "Ej: desarrollo"],
    Ceba: ["Engorde final", "Ej: antes de venta"],
    Destete: ["Separación de madre", "Ej: ternero"],
    Parición: ["Nacimiento", "Ej: parto"],
    Vacunación: ["Prevención", "Ej: vacunas"],
    Sanidad: ["Salud animal", "Ej: control médico"],
    Corrales: ["Área cerrada", "Ej: manejo"],
    Establo: ["Lugar de animales", "Ej: vacas"],
    Ordeño: ["Sacar leche", "Ej: vaca"],

    "Alimento balanceado": ["Comida preparada", "Ej: concentrado"],
    Suplemento: ["Refuerzo alimenticio", "Ej: vitaminas"],
    "Peso vivo": ["Peso del animal", "Ej: 300kg"],
    Canal: ["Peso post sacrificio", "Ej: carne"],
    Rendimiento: ["Producción total", "Ej: litros"],
    Productividad: ["Eficiencia", "Ej: más producción"],
    Ganadería: ["Cría de animales", "Ej: vacas"],
    Agricultura: ["Cultivo", "Ej: maíz"],
    "Sistema extensivo": ["Libre", "Ej: campo"],
    "Sistema intensivo": ["Controlado", "Ej: establo"],

    "Rotación de potreros": ["Cambio de terreno", "Ej: pastoreo"],
    Potrero: ["Terreno", "Ej: campo"],
    Semoviente: ["Animal", "Ej: ganado"],
    Bovino: ["Vacas", "Ej: ganado"],
    Porcino: ["Cerdos", "Ej: granja"],
    Avícola: ["Aves", "Ej: gallinas"],
    Caprino: ["Cabras", "Ej: producción"],
    Ovino: ["Ovejas", "Ej: lana"],
    Bioseguridad: ["Control sanitario", "Ej: higiene"],
    Finca: ["Terreno", "Ej: granja"],

    Agropecuario: ["Campo + ganado", "Ej: producción"],
    Sostenibilidad: ["Producción responsable", "Ej: cuidar ambiente"],
    Insumos: ["Recursos", "Ej: alimento"],
    Costos: ["Gastos", "Ej: inversión"],
    Ingresos: ["Dinero", "Ej: ventas"],
    Utilidad: ["Ganancia neta", "Ej: beneficio"],
    Mercado: ["Venta", "Ej: clientes"],
    Comercialización: ["Proceso venta", "Ej: negocio"],
    Trazabilidad: ["Seguimiento", "Ej: historial"],
    "Producción animal": ["Generación", "Ej: leche"]
}

// 🔥 MOSTRAR DEFINICIÓN (ARREGLADO)
function mostrarDef(t) {
    let d = definiciones[t]

    if (!d) {
        document.getElementById("infoGlosario").innerHTML = `
            <h3>${t}</h3>
            <p>No hay definición disponible.</p>
        `
        return
    }

    document.getElementById("infoGlosario").innerHTML = `
        <h3>${t}</h3>
        <p><b>Definición:</b> ${d[0]}</p>
        <p><b>Ejemplo:</b> ${d[1]}</p>
    `
}

// 🔥 CERRAR MODAL AL HACER CLICK AFUERA
window.onclick = function(e) {
    let modal = document.getElementById("modalGlosario")
    if (e.target === modal) modal.style.display = "none"
}

// 🔥 ANIMACIÓN
function animarValor(id, valorFinal) {
    let el = document.getElementById(id)
    if (!el) return

    let inicio = 0
    let incremento = valorFinal / 20

    let intervalo = setInterval(() => {
        inicio += incremento
        if (inicio >= valorFinal) {
            inicio = valorFinal
            clearInterval(intervalo)
        }
        el.innerText = Number.isInteger(valorFinal)
            ? Math.floor(inicio)
            : inicio.toFixed(2)
    }, 20)
}

// 🔥 ACTUALIZAR STATS
function actualizarEstadisticas() {
    animarValor('totalAnimales', totalAnimales)
    animarValor('gananciaTotal', totalGanancias)
    animarValor('huevosTotal', huevosTotal)
    animarValor('carneTotal', carneTotal)
    animarValor('lecheTotal', lecheTotal)
    animarValor('totalOperaciones', totalOperaciones)
    animarValor('ingresosTotales', totalIngresos)
    animarValor('gastoTotal', totalGastos)
}

// 🔥 TABLA
function renderTabla() {
    const tabla = document.getElementById('tablaVentas')
    tabla.innerHTML = ''

    registroProduccion.forEach((r, i) => {
        let fila = tabla.insertRow()
        fila.innerHTML = `
            <td>${r.animal}</td>
            <td>${r.cantidad}</td>
            <td>${r.huevos}</td>
            <td>${r.carne}</td>
            <td>${r.leche}</td>
            <td>${r.ingreso.toFixed(2)}</td>
            <td>${r.gasto.toFixed(2)}</td>
            <td>${r.ganancia.toFixed(2)}</td>
            <td><button onclick="eliminarRegistro(${i})">Eliminar</button></td>
        `
    })
}

// 🔥 CALCULAR
function calcular() {
    let animal = document.getElementById("animal").value
    let cantidad = +document.getElementById("cantidad").value
    let precio = +document.getElementById("precio").value
    let gasto = +document.getElementById("gasto").value

    if (!cantidad || cantidad <= 0) return alert("Cantidad inválida")

    let config = animalConfig[animal]

    let huevos = cantidad * config.huevos
    let carne = cantidad * config.carne
    let leche = cantidad * config.leche

    let ingreso = cantidad * precio
    let ganancia = ingreso - gasto

    totalGanancias += ganancia
    totalIngresos += ingreso
    totalGastos += gasto
    totalAnimales += cantidad
    huevosTotal += huevos
    carneTotal += carne
    lecheTotal += leche
    totalOperaciones++

    registroProduccion.push({
        animal, cantidad, huevos, carne, leche,
        ingreso, gasto, ganancia
    })

    localStorage.setItem("registroProduccion", JSON.stringify(registroProduccion))

    document.getElementById("resultado").innerHTML =
        `💰 Ganancia: $${ganancia.toFixed(2)}`

    renderTabla()
    actualizarEstadisticas()
}