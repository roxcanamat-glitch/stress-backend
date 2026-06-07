const estadosValidos = ["Muy mal", "Mal", "Normal", "Bien", "Muy bien"];

const validateMood = (data) => {
  const ansiedadNum = Number(data.ansiedad);
  const estresNum = Number(data.estres);
  const { estadoAnimo } = data;

  if (isNaN(ansiedadNum) || ansiedadNum < 0 || ansiedadNum > 24) {
    return "Ansiedad debe estar entre 0 y 24";
  }

  // if (isNaN(estresNum) || estresNum < 0 || estresNum > 24) {
  //   return "Estrés debe estar entre 0 y 24";
  // }

  if (!estadosValidos.includes(estadoAnimo)) {
    return "Estado de ánimo no válido";
  }

  return null;
};

module.exports = validateMood;