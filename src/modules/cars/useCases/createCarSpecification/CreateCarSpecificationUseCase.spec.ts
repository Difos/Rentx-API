import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/erros/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;
describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory);
    });

    it("should be not be able to create a new specification for a no-existent car", async () => {
        expect(async() => {
            const car_id = "1234";
            const specifications_id = ["54321"];
            await createCarSpecificationUseCase.execute({
                car_id: car_id, specifications_id
            })
        }).rejects.toBeInstanceOf(AppError);
    });


    it("should be not be able to create a new specification for car", async () => {
        const car = await carsRepositoryInMemory.create({ 
            name: "Car",
            description: "Description",
            daily_rate: 100,
            license_plate: "ABC-1233",
            fine_amount: 60,
            brand: "Brand",
            category_id:"category"
        });

        const specification = await specificationsRepositoryInMemory.create({ 
            description: "Description",
            name:"teste specification triste fim"
        });

        const specifications_id = [specification.id];

        const speficiationsCars = await createCarSpecificationUseCase.execute({ 
            car_id: car.id, specifications_id
        });

        expect(speficiationsCars).toHaveProperty("specifications");
        expect(speficiationsCars.specifications.length).toBe(1);
    });
})