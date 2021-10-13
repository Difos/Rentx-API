import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/erros/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";


let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });
    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Car",
            description: "Description",
            daily_rate: 100,
            license_plate: "ABC-1233",
            fine_amount: 60,
            brand: "Brand",
            category_id:"category"
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to creat a car if with exists license plate",async ()=>{
        
        await createCarUseCase.execute({
            name: "Car 1",
            description: "Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id:"category"
        });


        await expect(
            createCarUseCase.execute({
                name: "Car 2",
                description: "Description",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id:"category"
            })
        ).rejects.toEqual(new AppError("Car already exists!"));
    });

    it("should be able to create car with available true by default",async ()=>{
        const car =  await createCarUseCase.execute({
            name: "Car Available",
            description: "Description",
            daily_rate: 100,
            license_plate: "ABC-12x14",
            fine_amount: 60,
            brand: "Brand",
            category_id:"category"
        });
        
        expect (car.available).toBe(true);
    });
});