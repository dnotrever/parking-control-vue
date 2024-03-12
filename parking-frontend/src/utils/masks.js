import IMask from 'imask'

export const masks = {

    phone: (element) => {
        IMask( element, { mask: '(00) 00000-0000' } )
    },

    // cpf: (element) => {
    //     IMask( element, { mask: '000.000.000-00' } )
    // },

    // rg: (element) => {
    //     IMask( element, { mask: '00.000.000-0' } )
    // },

    // cep: (element) => {
    //     IMask( element, { mask: '00.000-000' } )
    // },

    // numeric: (element, min, max) => {
    //     IMask( element, { mask: Number, thousandsSeparator: '.', autofix: 'pad' } )
    // },

    // string: (element) => {
    //     IMask( element, { mask: /^[A-Za-z\\s]$/ } )
    // },

    // model: (element) => {
    //     IMask( element, { mask: null } )
    // },

}