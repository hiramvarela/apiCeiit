const Loan = require("../models/loan.models").Loan;
const User = require("../models/user.models").User;
const Ceiit = require("../models/ceiit.models").Ceiit;

async function loanObject(req, res) {
    const { userId, ceiitId, linkOpenLoan, linkCloseLoan } = req.body;

    try {
        const ceiitObject = await Ceiit.findById(ceiitId);

        if (!ceiitObject || !ceiitObject.isAvailable) {
            return res.status(400).json({ mensaje: "El objeto no está disponible" });
        }

        const newLoan = new Loan({
            nameUser: userId,
            nameObj: ceiitId,
            date: Date.now(),
            linkOpenLoan,
            linkCloseLoan
        });

        await newLoan.save();

        ceiitObject.isAvailable = false;
        await ceiitObject.save();

        res.json({
            obj: newLoan
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ mensaje: "Hubo un error al crear el préstamo" });
    }
}

async function loanUpdateObject(req, res) {
    const { loanId, userId, ceiitId, linkOpenLoan, linkCloseLoan } = req.body;

    try {
        const updatedLoan = await Loan.findByIdAndUpdate(
            loanId,
            {
                nameUser: userId,
                nameObj: ceiitId,
                date: Date.now(),
                status: false,
                linkOpenLoan,
                linkCloseLoan
            },
            { new: true }
        );

        if (!updatedLoan) {
            return res.status(404).json({ mensaje: "No se encontró el préstamo con el ID proporcionado" });
        }

        const ceiitObject = await Ceiit.findById(ceiitId);
        ceiitObject.isAvailable = true;
        await ceiitObject.save();

        res.json({
            obj: updatedLoan
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ mensaje: "Hubo un error al actualizar el préstamo" });
    }
}

async function loanDeleteObject(req, res) {
    const { loanId } = req.body;

    try {
        const loan = await Loan.findByIdAndDelete(loanId);

        if (!loan) {
            return res.status(404).json({ mensaje: "No se encontró el préstamo con el ID proporcionado" });
        }

        const ceiitObject = await Ceiit.findById(loan.nameObj);
        if (ceiitObject) {
            ceiitObject.isAvailable = true;
            await ceiitObject.save();
        }

        res.json({
            mensaje: "Préstamo eliminado correctamente"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ mensaje: "Hubo un error al borrar el préstamo" });
    }
}

async function loanReadObject(req, res) {
    const { loanId } = req.body;

    try {
        const readLoan = await Loan.findOne({
            _id: loanId
        }).populate('nameUser', 'name surName')
          .populate('nameObj', 'NOMBRE');

        if (!readLoan) {
            res.status(404).json({ mensaje: "No se encontró el préstamo con el ID proporcionado" });
        } else {
            res.json({
                obj: readLoan
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ mensaje: "Hubo un error al buscar el préstamo" });
    }
}

module.exports = {
    loanObject,
    loanUpdateObject,
    loanDeleteObject,
    loanReadObject
};
