import { Response, Request } from "express";
import dataSource from "../utils";
import { Recipe } from "../entity/Recipe";
import { Ingredient } from "../entity/Ingredient";
import { Category } from "../entity/Category";

const recipeController = {
create: async (req: Request, res: Response): Promise<void> => {
      
  try {
    const { title, description, instructions, categories, ingredients } = req.body;
    console.log(categories)
    const ingredientRepository = dataSource.manager.getRepository(Ingredient);
    const categoryRepository = dataSource.manager.getRepository(Category);

    const ingredientEntities = await Promise.all(
      ingredients.map(async ({ name, quantity, unit }: { name: string, quantity: number, unit: string }) => {
        let ingredientEntity = await ingredientRepository.findOne({ where: { name } });
        if (!ingredientEntity) {
          ingredientEntity = new Ingredient();
          ingredientEntity.name = name;
          ingredientEntity.quantity = quantity;
          ingredientEntity.unit = unit;
          await ingredientRepository.save(ingredientEntity);
        }
        return { name, quantity, unit, entity: ingredientEntity };
      })
    );
    
    const recipe = new Recipe();
    recipe.title = title;
    recipe.description = description;
    recipe.instructions = instructions;
    recipe.ingredients = ingredientEntities.map(({ entity }) => entity);
    
    if (categories && (Boolean(categories.length))) {
      const categoryEntities = await Promise.all(categories.map(async (name: string) => {
        let categoryEntity = await categoryRepository.findOne({ where: { name } });
        if (!categoryEntity) {
          categoryEntity = new Category();
          categoryEntity.name = name;
          await categoryRepository.save(categoryEntity);
        }
        return categoryEntity;
      }));
      recipe.categories = categoryEntities;
    }

    await dataSource.manager.save(recipe);

    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create recipe" });
  }
},


    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const recipes = await dataSource.manager.find(Recipe, { relations: ["ingredients", "categories"] });
            res.send(recipes);
        } catch (error) {
            console.log(error);
            res.send("Error getting recipes");
        }
    },
    update: async (req: Request, res: Response): Promise<void> => {
        const { title, description, ingredients, categories } = req.body;
        const recipe = new Recipe();
        recipe.title = title;
        recipe.description = description;
        recipe.ingredients = ingredients;
        recipe.categories = categories;
        try {
            await dataSource.manager.save(recipe);
            res.send("Recipe updated");
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            res.send("Error updating recipe");
        }
    },
    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            await dataSource.manager.delete(Recipe, id);

            res.send("Recipe deleted");
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            res.send("Error deleting recipe");
        }
    }

};

export default recipeController;
