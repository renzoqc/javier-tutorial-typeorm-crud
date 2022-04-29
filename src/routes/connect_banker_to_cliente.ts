import express from "express";
import { Cliente } from "../entities/Cliente";
import { Banker } from "../entities/Banker";

const router = express.Router();

router.put("/api/banquero/:banqueroId/cliente/:clienteId", async (req, res) => {
    const { banqueroId, clienteId} = req.params;

    const cliente = await Cliente.findOneBy({id: parseInt(clienteId)})
    const banquero = await Banker.findOneBy({id: parseInt(banqueroId)})

    if(!banquero || !cliente) {
        return res.json({
            msg: "Relación banquero - cliente no encontrada"
        })
    }

    //funciona con la entidad que tiene el JoinTable
    banquero.clientes = [cliente] //añadimos cliente a la matriz de clientes


    await banquero.save();

    return res.json({
        msg: "banquero conectado al cliente"
    })
})
    

export { router as conectBanqueroToClienteRouter }