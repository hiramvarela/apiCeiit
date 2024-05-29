const Loan = require("../models/loan.models.js").Loan;

async function loanObject(req, res){
    const id = req.body.id;
	const tuit = req.body.tuiti;
	const nameObj = req.body.no;
    const da = req.body.dat;
    const numS = req.body.ns;
    const canti = req.body.cant;

	try {
		const newLoan = await new Loan({
            id:id,
			tuition:tuit,
			nameObject: nameObj,
            date : da,
            numSerial: numS,
            cantidad : canti
		}).save();

		res.json({
			obj: newLoan


		})
	} catch (err) {
		console.log(err);
	}
}


async function loanUpdateObject(req,res){
	const loanId = req.body.id;
	const tuit = req.body.tuiti;
	const nameObj = req.body.no;
    const da = req.body.dat;
    const numS = req.body.ns;
    const canti = req.body.cant;

	try{
		const updatedLoan = await Loan.updateOne(
            { id: loanId }, // filtro o condición
            {
                // campos a actualizar
                tuition: tuit,
                nameObject: nameObj,
                date: da,
                numSerial: numS,
                cantidad: canti
            }
        );

        if(updatedLoan.nModified === 0){ // si no se modificó ningún documento
            return res.status(404).json({ mensaje: "No se encontró el préstamo con el ID proporcionado" });
        }

		res.json({
			obj: updatedLoan
		});
	}catch(err){
		console.log(err)
		res.status(500).json({mensaje : "Hubo un error al actualizar el préstamo"})
	}
}


async function loanDeleteObject(req,res){
	const id = req.body.id;
	try{
		const loan = await Loan.deleteOne({
			id:id
		});
        if(!loan){
			res.status(401).json({mensaje: "No se encontro el prestamo"})
		}
		res.json({
			obj : loan
		})
	}catch(err){
		console.log(err)
		res.status(500).json({mensaje : "Hubo un error al borrar el prestamo"})
	}
}
async function loanReadObject(req,res){
	const id = req.body.id;

    
	try{
		const readLoan = await Loan.findOne({
			id:id
		
		});
        if(!readLoan){
			res.status(401).json({mensaje: "No se encontro el prestamo"})
		}
		res.json({
			obj : readLoan
		})
	}catch(err){
		console.log(err)
		res.status(500).json({mensaje : "Hubo un error al buscar el prestamo"})
	}
}

module.exports = {

	loanObject, loanDeleteObject,loanReadObject,loanUpdateObject

};