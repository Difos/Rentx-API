import { Specification } from "../../infra/typeorm/entities/Specification";
import { SpecificationRepository } from "../../infra/typeorm/repositories/SpecificationRepository";
import {inject,injectable} from "tsyringe";

@injectable()
class ListSpecificationUseCase {
   constructor(@inject("SpecificationRepository") private specificationRepository : SpecificationRepository) {}

   async execute():Promise<Specification[]>{
       const specifications = await this.specificationRepository.list();

       return specifications;
   }
}

export {ListSpecificationUseCase};