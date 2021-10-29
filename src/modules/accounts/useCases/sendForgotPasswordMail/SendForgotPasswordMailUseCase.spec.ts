import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/erros/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let usersTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {

        usersRepositoryInMemory = new UserRepositoryInMemory();
        usersTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider);
    });

    it("should be able to send a forgot mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "8111",
            email: "qwqwe1@truco.com",
            name: "Equatorial Guinea",
            password: "123x123"
        });

        await sendForgotPasswordMailUseCase.execute("qwqwe1@truco.com");
        expect(sendMail).toHaveBeenCalled();
    });

    it("should not able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("1231s@truco.com")
        ).rejects.toEqual(new AppError("User not found!"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "812111",
            email: "qwqwa11e1@truco.com",
            name: "Equatorialasd Guinea",
            password: "12123"
        });

        await sendForgotPasswordMailUseCase.execute("qwqwa11e1@truco.com")
        
        expect(generateTokenMail).toBeCalled();
    });


})