import { Request, Response } from 'express';
import { Ingredient } from '../entity/Ingredient';
import dataSource from '../utils';

const ingredientController = {
    create: async (req: Request, res: Response): Promise<void> => {
        const { name, quantity, unit } = req.body;
        const ingredient = new Ingredient();
        ingredient.name = name;
        ingredient.quantity = quantity;
        ingredient.unit = unit;
        try {
            await dataSource.manager.save(ingredient);
            res.sendStatus(201);
            res.send("Ingredient created");
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            res.send("Error creating ingredient");
        }
    },
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const ingredients = await dataSource.manager.find(Ingredient);
            res.send(ingredients);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            res.send("Error getting ingredients");
        }
    },
    update: async (req: Request, res: Response): Promise<void> => {
        const { name, quantity, unit } = req.body;
        const ingredient = new Ingredient();
        ingredient.name = name;
        ingredient.quantity = quantity;
        ingredient.unit = unit;
        try {
            await dataSource.manager.save(ingredient);
            res.sendStatus(200);
            res.send("Ingredient updated");
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            res.send("Error updating ingredient");
        }
    },
    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            await dataSource.manager.delete(Ingredient, id);
            res.sendStatus(200);
            res.send("Ingredient deleted");
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            res.send("Error deleting ingredient");
        }
    }
};

export default ingredientController;