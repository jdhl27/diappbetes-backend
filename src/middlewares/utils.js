function generatePDF() {
  const num = Math.floor(Math.random() * 4);
  let array = [];
  for (let i = 0; i < num; i++) {
    array.push(
      "http://jornadasciberseguridad.riasc.unileon.es/archivos/ejemplo_esp.pdf"
    );
  }
  return array;
}

module.exports = { generatePDF };
