export const formatoMoneda = ({number, decimales=0}) => {

    if (!number){
        return '$ 0'
    }

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales,

    });

    return formatter.format(number).replace(/^(\D+)/, '$ ' + (number < 0 ? "-" : ""))
}