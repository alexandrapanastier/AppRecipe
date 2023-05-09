import {Response, Request} from 'express';
import {Category} from '../entity/Category';
import dataSource from '../utils';

const categoryController = {
    create: async (req: Request, res: Response): Promise<void> => {
        const {name} = req.body;
        const category = new Category();
        category.name = name;
        try {
            await dataSource.manager.save(category);
            res.sendStatus(201);
            res.send("Category created");
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            res.send("Error creating category");
        }
    },
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const categories = await dataSource.manager.find(Category);
            res.send(categories);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            res.send("Error getting categories");
        }
    },
    update: async (req: Request, res: Response): Promise<void> => {
        const {name} = req.body;
        const category = new Category();
        category.name = name;
        try {
            await dataSource.manager.save(category);
            res.sendStatus(200);
            res.send("Category updated");
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            res.send("Error updating category");
        }
    },
    delete: async (req: Request, res: Response): Promise<void> => {
        const {id} = req.params;
        try {
            await dataSource.manager.delete(Category, id);
            res.sendStatus(200);
            res.send("Category deleted");
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            res.send("Error deleting category");
        }
    }
};

export default categoryController;