import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategories/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import {ensureAuthenticated} from '../middlewares/ensureAuthenticated';
import {ensureAdmin} from '../middlewares/ensureAdmin';
import { Router } from 'express';
import multer from 'multer';


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRoutes.post("/",ensureAuthenticated, createCategoryController.handle);

categoriesRoutes.get("/",ensureAuthenticated, listCategoryController.handle);

categoriesRoutes.post("/import", upload.single("file"),
ensureAuthenticated, 
ensureAdmin,
importCategoryController.handle);

export { categoriesRoutes };
