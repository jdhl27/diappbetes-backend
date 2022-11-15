function generatePDF() {
  const num = Math.floor(Math.random() * 4);
  let array = [];
  const names = [
    "formula_julio.pdf",
    "recomendaciones1.pdf",
    "examenes.pdf",
    "importante.pdf",
    "formula_medica.pdf",
    "tenerencuenta.pdf",
  ];
  for (let i = 0; i < num; i++) {
    array.push({
      name: names[Math.floor(Math.random() * names.length)],
      url: "http://jornadasciberseguridad.riasc.unileon.es/archivos/ejemplo_esp.pdf",
    });
  }
  return array;
}

module.exports = { generatePDF };
