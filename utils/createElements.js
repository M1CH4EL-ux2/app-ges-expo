export function insertElementsInHTML(values) {
    let tempt = ''
    const valuesColumnPix = []
    const valuesColumnCash = []
    const valuesColumnCard = []
    // console.log('inApp ' + values)

    const createColumnPix = () => {
        for(let index = 0; index < values.length; index++) {
            if(values[index].options === 'PIX') {
                valuesColumnPix.push(`<td>R$${values[index].values}</td>`)
            }
        }
    }
    
    const createColumnCash = () => {
        for(let index = 0; index < values.length; index++) {
            if(values[index].options === 'Dinheiro') {
                valuesColumnCash.push(`<td>R$${values[index].values}</td>`)
            }
        }
    }
    
    const createColumnCard = () => {
        for(let index = 0; index < values.length; index++) {
            if(values[index].options === 'Cartão') {
                valuesColumnCard.push(`<td>R$${values[index].values}</td>`)
            }
        }
    }

    createColumnPix()
    createColumnCash()
    createColumnCard()

    console.log(valuesColumnCard)
    console.log(valuesColumnPix)
    console.log(valuesColumnCash)

    for (let index = 0; index < values.length; index++) {
        tempt = tempt + `<td>R$${values[index].values}</td>`
    }

    return `<html>
    <head>
        <style>
            body {
                font-family: sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
    
            table {
                margin: 0 auto;
            }
    
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
                padding: .5rem;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Tabela de valores</h1>
        <h2>Data: dd/mm/aa</h2>
        <table>
            <tr>
                <td>PIX</td>
                <td>Cartão</td>
                <td>Dinheiro</td>
            </tr>
            <tr>
                ${tempt}
            </tr>
            <tr>
                <td>R$200,00</td>
                <td>R$220,00</td>
                <td>R$180,00</td>
            </tr>
        </table>
    </body>
    </html>
    `
}
