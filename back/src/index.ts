import express from 'express';
import cors from 'cors';
import  recipeController  from './controller/RecipeController';
import  categoryController  from './controller/CategoryController';
import  ingredientController  from './controller/IngredientController'
import dataSource from './utils';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/recipe', recipeController.create);
app.get('/recipe', recipeController.getAll);
app.put('/recipe', recipeController.update);
app.delete('/recipe/:id', recipeController.delete);

app.post('/category', categoryController.create);
app.get('/category', categoryController.getAll);
app.put('/category', categoryController.update);
app.delete('/category/:id', categoryController.delete);

app.post('/ingredient', ingredientController.create);
app.get('/ingredient', ingredientController.getAll);
app.put('/ingredient', ingredientController.update);
app.delete('/ingredient/:id', ingredientController.delete);


const start = async (): Promise<void> => {
    await dataSource.initialize();

  app.listen(5000, () => {
    console.log("Server started");
  });
};

void start();
