const estadosValidos = ["Muy mal", "Mal", "Normal", "Bien", "Muy bien"];

const validateMood = (data) => {
  const ansiedadNum = Number(data.ansiedad);
  const estresNum = Number(data.estres);
  const { estadoAnimo } = data;

  if (isNaN(ansiedadNum) || ansiedadNum < 0 || ansiedadNum > 10) {
    return "Ansiedad debe estar entre 0 y 10";
  }

  if (isNaN(estresNum) || estresNum < 0 || estresNum > 10) {
    return "Estrés debe estar entre 0 y 10";
  }

  if (!estadosValidos.includes(estadoAnimo)) {
    return "Estado de ánimo no válido";
  }

  return null;
};

module.exports = validateMood;