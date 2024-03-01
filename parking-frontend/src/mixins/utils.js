export const utils = {

    brazilCurrency(value) {
        let formattedValue = parseFloat(value.replace(/[^\d]/g, '').padStart(3, '0')) / 100
        return formattedValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2, maximumFractionDigits: 2
        })
    },

    convertToFloat(value) {
        return Number(value.replace(/\./g, '').replace(',', '.'))
    },

}