import { Category } from "../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository";
import {getRepository, Repository} from "typeorm";


class CategoriesRepository implements ICategoriesRepository{
    
    private repository : Repository<Category>;

   
    constructor() {
      this.repository = getRepository(Category);
    }
  
    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories; 
    }

    async listById(id : string): Promise<Category> {
        //select * from category where id="id"
        const category = await this.repository.findOne({id});
        return category;
    }

    async findByName(name: string): Promise<Category> {
        //select * from category where name = "name"
       const category = await this.repository.findOne({name});
       return category;
    }
}

export { CategoriesRepository };