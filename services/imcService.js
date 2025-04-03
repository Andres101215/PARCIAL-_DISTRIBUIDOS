// imcService.js

function calcularIMC(peso, altura) {
    return Number((peso / (altura * altura)).toFixed(2));
}

function getIMCRecommendation(imc) {
    if (imc < 18.5) {
        return { categoria: "Bajo peso", recomendacion: "Aumentar ingesta calórica con proteínas y carbohidratos saludables." };
    } else if (imc >= 18.5 && imc < 24.9) {
        return { categoria: "Peso normal", recomendacion: "Mantener una alimentación equilibrada y actividad física regular." };
    } else if (imc >= 25 && imc < 29.9) {
        return { categoria: "Sobrepeso", recomendacion: "Reducir carbohidratos refinados y aumentar fibra y proteínas." };
    } else {
        return { categoria: "Obesidad", recomendacion: "Dieta baja en carbohidratos y grasas, combinada con ejercicio." };
    }
}

// Función para calcular calorías diarias recomendadas
function calcularCalorias(altura, peso, edad, genero) {
    if (genero === "Masculino") {
        return Math.round(10 * peso + 6.25 * altura * 100 - 5 * edad + 5);
    } else {
        return Math.round(10 * peso + 6.25 * altura * 100 - 5 * edad - 161);
    }
}

// Función para generar la dieta según el IMC
function generarDieta(imc, calorias) {
    let dieta = { verduras: [], carbohidratos: [], proteinas: [], grasas: [] };

    if (imc < 18.5) {
        dieta.carbohidratos = ["Arroz", "Pasta", "Pan integral"];
        dieta.proteinas = ["Pollo", "Pescado", "Huevos"];
        dieta.grasas = ["Aguacate", "Nueces", "Aceite de oliva"];
    } else if (imc >= 18.5 && imc < 24.9) {
        dieta.verduras = ["Espinaca", "Brócoli", "Zanahoria"];
        dieta.carbohidratos = ["Quinoa", "Batata"];
        dieta.proteinas = ["Pollo", "Lentejas"];
        dieta.grasas = ["Almendras", "Aceite de coco"];
    } else if (imc >= 25 && imc < 29.9) {
        dieta.verduras = ["Lechuga", "Pepino", "Tomate"];
        dieta.carbohidratos = ["Avena", "Legumbres"];
        dieta.proteinas = ["Pavo", "Tofu"];
        dieta.grasas = ["Aceite de oliva"];
    } else {
        dieta.verduras = ["Espárragos", "Calabacín", "Apio"];
        dieta.carbohidratos = ["Frijoles", "Garbanzos"];
        dieta.proteinas = ["Pechuga de pollo", "Claras de huevo"];
        dieta.grasas = ["Aceite de coco (mínimo)"];
    }

    return { calorias, dieta };
}

module.exports = { calcularIMC, getIMCRecommendation, calcularCalorias, generarDieta };
