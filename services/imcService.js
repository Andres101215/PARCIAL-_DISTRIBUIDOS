// Función para calcular IMC
const calcularIMC = (peso, altura) => {
    if (!peso || !altura) return null;
    return (peso / (altura * altura)).toFixed(2);
};

// Función para obtener categoría y recomendación
const getIMCRecommendation = (imc) => {
    if (imc < 18.5) {
        return { categoria: "Bajo peso", recomendacion: "Subir de peso con una dieta balanceada." };
    } else if (imc >= 18.5 && imc < 24.9) {
        return { categoria: "Normal", recomendacion: "Mantener peso con una alimentación saludable." };
    } else if (imc >= 25 && imc < 29.9) {
        return { categoria: "Sobrepeso", recomendacion: "Bajar de peso con ejercicio y alimentación controlada." };
    } else {
        return { categoria: "Obesidad", recomendacion: "Bajar de peso con asesoramiento médico y actividad física." };
    }
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    calcularIMC,
    getIMCRecommendation
};
