export const ad_compra_acciones_tabla = (arrCompraAcciones) => {

    let arr = []
    let sum = 0
    for (let i = 0; i < arrCompraAcciones.length; i++) {
        sum += arrCompraAcciones[i].valor
        arr.push(sum)
    }

    return arr
}