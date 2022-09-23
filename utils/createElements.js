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