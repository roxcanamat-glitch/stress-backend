const estadosValidos = ["Muy mal", "Mal", "Normal", "Bien", "Muy bien"];

const validateMood = (data) => {
    const ansiedadNum = Number(data.ansiedad);

    if (isNaN(ansiedadNum) || ansiedadNum < 0 || ansiedadNum > 24) {
        return "Ansiedad debe estar entre 0 y 24";
    }

    if (!estadosValidos.includes(data.estadoAnimo)) {
        return "Estado de ánimo no válido";
    }

    return null;
};

module.exports = validateMood;
