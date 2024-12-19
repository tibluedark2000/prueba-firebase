export const formatoFecha = (time) => {


    if (!time){
        return ''
    }

    let date = new Date(time)
    // const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    let dia = date.getDate();
    let mes = date.getMonth();
    let year = date.getFullYear();

    // let hora = date.getHours() + ":" + date.getMinutes();

    let texto = dia + " " + months[mes] + " " + year

    return texto


}