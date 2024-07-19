function calculateMacros() {
    // Get form inputs
    let weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value);
    let age = parseInt(document.getElementById('age').value);
    let sex = document.getElementById('sex').value;
    let activityLevel = document.getElementById('activityLevel').value;
    let goal = document.getElementById('goal').value;

    // Calculate TDEE
    let tdee = calculateTDEE(weight, height, age, sex, activityLevel);
    
    // Calculate macros based on goal
    let macros = calculateMacrosBasedOnGoal(tdee, weight, goal);

    // Display results
    displayResults(macros);
}

function calculateTDEE(weight, height, age, sex, activityLevel) {
    let bmr;
    if (sex === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (sex === 'female') {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let activityFactor;
    switch (activityLevel) {
        case 'sedentary':
            activityFactor = 1.2;
            break;
        case 'lightlyActive':
            activityFactor = 1.375;
            break;
        case 'moderatelyActive':
            activityFactor = 1.55;
            break;
        case 'veryActive':
            activityFactor = 1.725;
            break;
        case 'extraActive':
            activityFactor = 1.9;
            break;
        default:
            activityFactor = 1.2;
    }

    return bmr * activityFactor;
}

function calculateMacrosBasedOnGoal(tdee, weight, goal) {
    let macros = {};
    switch (goal) {
        case 'loseWeight':
            macros.calories = tdee * 0.8;
            macros.protein = 2.2 * weight;
            macros.fat = 0.25 * macros.calories / 9;
            macros.carbohydrates = (macros.calories - (macros.protein * 4) - (macros.fat * 9)) / 4;
            break;
        case 'maintainWeight':
            macros.calories = tdee;
            macros.protein = 2.2 * weight;
            macros.fat = 0.3 * macros.calories / 9;
            macros.carbohydrates = (macros.calories - (macros.protein * 4) - (macros.fat * 9)) / 4;
            break;
        case 'gainMuscle':
            macros.calories = tdee * 1.2;
            macros.protein = 2.2 * weight;
            macros.fat = 0.3 * macros.calories / 9;
            macros.carbohydrates = (macros.calories - (macros.protein * 4) - (macros.fat * 9)) / 4;
            break;
        default:
            macros = {};
    }

    return macros;
}

function displayResults(macros) {
    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>Results</h2>
        <p><strong>Calories (Approximate):</strong> ${macros.calories.toFixed(2)}</p>
        <p><strong>Protein:</strong> ${macros.protein.toFixed(2)} grams</p>
        <p><strong>Fat:</strong> ${macros.fat.toFixed(2)} grams</p>
        <p><strong>Carbohydrates:</strong> ${macros.carbohydrates.toFixed(2)} grams</p>
        <p style="color: red; font-style: italic;">* Note: The calorie calculation is approximate and may vary based on individual factors.</p>
    `;
}

