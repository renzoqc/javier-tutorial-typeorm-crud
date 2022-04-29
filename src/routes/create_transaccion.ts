import express from "express";
import { Cliente } from "../entities/Cliente";
import { Transaccion, TransaccionTypes } from "../entities/Transacciones";

const router = express.Router();

router.post("/api/cliente/:clienteId/transaccion", async (req, res) => {
    const { clienteId } = req.params;

    const { type, amount } = req.body;

    const cliente = await Cliente.findOneBy({id: parseInt(clienteId)});

    if(!cliente){
        return res.json({
            msg: "Cliente no encontrado"
        })
    }

    const transaccion = Transaccion.create({
        amount,
        type,
        cliente
    });

    await transaccion.save()
    
    if (type === TransaccionTypes.DEPOSITO) {
        cliente.balance = cliente.balance + amount
    }
    else if (type === TransaccionTypes.RETIRO){
        cliente.balance = cliente.balance - amount
    }

    await cliente.save();
    
    return res.json({
        msg: "Transaccion exitosa"
    })
})

export { router as createTransaccionRouter }