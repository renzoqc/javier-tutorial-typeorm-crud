import { createConnection } from "typeorm";
import express, { application } from "express";
import { Cliente } from "./entities/Cliente";
import { Banker } from "./entities/Banker";
import { Transaccion } from "./entities/Transacciones";
import { createClienteRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransaccionRouter } from "./routes/create_transaccion";
import { conectBanqueroToClienteRouter } from "./routes/connect_banker_to_cliente";
import { deleteClienteRouter } from "./routes/delete_cliente";
import { fetchClienteRouter } from "./routes/fetch_clientes";

const app = express()

const main = async () => {
    try {
        const connection = await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "veritaserum",
            database: "postgres",
            entities: [Cliente, Banker, Transaccion],
            synchronize: true
        })
        console.log('Conectado a postgres')
        app.use(express.json()) //nos permite analizar el body de cualquier solicitud que hayamos hecho
        app.use(createClienteRouter)
        app.use(createBankerRouter)
        app.use(createTransaccionRouter)
        app.use(conectBanqueroToClienteRouter)
        app.use(deleteClienteRouter)
        app.use(fetchClienteRouter)

        app.listen(8080, () => {
            console.log("Ahora está corriendo en el puerto 8080")
        })
    } catch (error) {
        console.error(error.message)
        //throw new Error("No se puede conectar a la DB")
    }
}

main()