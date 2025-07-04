const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// function to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes....</h2>";
    // fetch data from the API
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    // convert the response to JSON
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        //  console.log(meals);
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML =
            `<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p> Belongs to <span>${meal.strCategory}</span> Catergory </p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // adding EventListner to recipe button
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        })
        recipeContainer.appendChild(recipeDiv);
    });

};
// Function to fetch ingredients and measurenments
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`

        }
        else {
            break;
        }

    }
    return ingredientsList;
}
// popup 
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredienstList">${fetchIngredients(meal)}</ul>
<div class="recipeInstructions">
<h3>Instructions:</h3>
<p>${meal.strInstructions}</P>
</div>
    `


    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "None";
});
searchBtn.addEventListener('click', (e) => {
    // prevent default form submission behavior
    e.preventDefault();
    // get the value from the search box and remove extra spaces
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    // console.log("Button Clicked");
});
