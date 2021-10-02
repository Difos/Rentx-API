import  request from "supertest";
import {v4 as uuid} from "uuid";
import {hash} from "bcryptjs";
import { app } from "../../../../shared/infra/http/app";
import { Connection } from "typeorm";

import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", ()=>{
  
  beforeAll(async()=>{
    connection = await createConnection();

    await connection.runMigrations();


    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
        `insert into USERS(id,name,email,password,"isAdmin",created_at, driver_license)
        values('${id}','admin','admin@gmail.com','${password}',true, 'now()','xxxxx');`);

  });



  it("should be able to create a new category",async ()=>{


    const responseToken = await request(app).post("/sessions")
    .send({
      email:"admin@gmail.com",
      password:"admin"
    });

    const { token } = responseToken.body;

    console.log(responseToken.body);

    const response = await request(app)
    .get("/categories")
    .send({ 
      name:"Categoty supertest", 
      description:"Category supertest"
    }).set({
      Autorization : `Bearer ${token}`
    })

    expect(response.status).toBe(201);
  })
});