import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            "brand": "Car brand",
            "category_id": "category_id",
            "daily_rate": 250,
            "description": "Carro description",
            "fine_amount": 100,
            "name": "Car1",
            "license_plate": "JVT-3111"
        });

        const cars = await listCarsUseCase.execute({});
        
        expect(cars).toEqual([car]);

    });

    it("should be able to list all available cars by brand",async ()=>{
        const car = await carsRepositoryInMemory.create({
            "brand": "Car brand test2",
            "category_id": "category_id2",
            "daily_rate": 250,
            "description": "Carro2 description",
            "fine_amount": 100,
            "name": "Car2",
            "license_plate": "JVT-31111"
        });

        const cars = await listCarsUseCase.execute({ brand:"Car_brand_test"});
        
        console.log(cars);
        expect(cars).toEqual([car]);
    });


    it("should be able to list all available cars by name",async ()=>{
        const car = await carsRepositoryInMemory.create({
            "brand": "brand 3",
            "category_id": "category_id2",
            "daily_rate": 250,
            "description": "Carro2 description",
            "fine_amount": 100,
            "name": "Car3",
            "license_plate": "JVF-31111"
        });

        const cars = await listCarsUseCase.execute({ name:"Car3"});
        
        console.log(cars);
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category",async ()=>{
        const car = await carsRepositoryInMemory.create({
            "brand": "brand 4",
            "category_id": "12345",
            "daily_rate": 250,
            "description": "Carroz description",
            "fine_amount": 100,
            "name": "Car4",
            "license_plate": "JVF-31111"
        });

        const cars = await listCarsUseCase.execute({ category_id:"12345"});
        
        console.log(cars);
        expect(cars).toEqual([car]);
    });


});