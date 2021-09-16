import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@modules/cars/useCases/listSpecification/ListSpecificationController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import {ensureAdmin} from '../middlewares/ensureAdmin'

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificaitonController = new ListSpecificationController();

specificationRoutes.post("/", createSpecificationController.handle);

specificationRoutes.get("/", ensureAuthenticated,ensureAdmin, listSpecificaitonController.handle);

export {specificationRoutes};