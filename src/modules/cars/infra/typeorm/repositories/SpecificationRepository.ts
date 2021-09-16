import { Specification } from "../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../../../repositories/ISpecificationRepository"
import {getRepository, Repository} from "typeorm";

class SpecificationRepository implements ISpecificationRepository {
   
    private repository : Repository<Specification>;

    constructor() {
       
        this.repository = getRepository(Specification);
        
    }
    
    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    async listById(id: string): Promise<Specification> {
        const specifications = await this.repository.findOne({id});
        return specifications;
    }

    async create({name, description}: ICreateSpecificationDTO):Promise<Specification> {
        const specification = this.repository.create({name, description});
        await this.repository.save(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification>{
        const specifications = await this.repository.findOne({name});
        return specifications;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);
     
        return specifications;
    
    }
}

export {SpecificationRepository};