export function insertElementsInHTML(values) {
    let tempt = ''
    console.log(values)

    for (let index = 0; index < values.length; index++) {
        tempt = tempt + `<h1>${values[index]}</h1>`
    }

    return `<html>
      <body>
        ${tempt}
      </body>
    </html>`
}

// Devi-se preparar a logica parar dividir cada valor em sua respectiva coluna

/*
MODELO

<html>
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
            <td>R$150,60</td>
            <td>R$150,60</td>
            <td>R$150,60</td>
        </tr>
        <tr>
            <td>R$200,00</td>
            <td>R$22    0,00</td>
            <td>R$180,00</td>
        </tr>
    </table>
</body>
</html>
*/