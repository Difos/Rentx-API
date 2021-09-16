
import { AppError } from "../../../../shared/erros/AppError";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


class CategoriesRepositoryInMemory implements ICategoriesRepository{

    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(category => category.name === name);

        return category;
    }

    async list(): Promise<Category[]> {
        const all = this.categories;

        return all;
    }
    
    listById(id: string): Promise<Category> {
        throw new AppError("Method not implemented.");
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, { 
            name,description
        });

        this.categories.push(category);
    }
    
}

export {CategoriesRepositoryInMemory};