import {Router} from 'express';

import {categoriesRoutes} from './categories.routes';
import {specificationRoutes} from './specification.routes';
import {usersRoutes} from "./users.routes";
import {carsRoutes} from "./cars.routes";
import { authenticateRoutes } from './authenticate.routes';
import { rentalsRoutes } from './rentals.routes';

const router = Router();

router.use("/categories",categoriesRoutes);
router.use("/specification",specificationRoutes);
router.use("/users",usersRoutes);
router.use("/cars",carsRoutes);
router.use("/rentals",rentalsRoutes);
router.use(authenticateRoutes);

export{router};