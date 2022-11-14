function priority(nivel) {
  if (nivel <= 99) {
    return "normal";
  }
  if (nivel >= 100 && nivel <= 125) {
    return "baja";
  }
  if (nivel > 125) {
    return "alta";
  }
}

module.exports = { priority };
