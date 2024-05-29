const Ceiit = require("../models/ceiit.models").Ceiit;

async function addObject(req, res){
	const object = req.body.ob;
    const ubica = req.body.ubi;
	const estado = req.body.esta;

	try {
		const newObject = await new Ceiit({
			NOMBRE:object,
            Lugar : ubica,
			isAvailable : estado,
		}).save();

		res.json({
			obj: newObject


		})
	} catch (err) {
		console.log(err);
	}
}
async function updateObject(req,res){
	const objectName = req.body.ob;
    const ubica = req.body.ubi;
    
	try{
		const updateOb = await Ceiit.updateOne(
            { NOMBRE: objectName }, // filtro o condición
            {
                Lugar: ubica
            }
        );

        if(updateOb.nModified === 0){ // si no se modificó ningún documento
            return res.status(404).json({ mensaje: "No se encontró el objeto" });
        }

		res.json({
			obj: updateOb
		});
	}catch(err){
		console.log(err)
		res.status(500).json({mensaje : "Hubo un error al actualizar el objeto"})
	}
}

async function deleteObject(req,res){
	const object = req.body.ob;
	try{
		const deleteO = await Ceiit.deleteOne({
			NOMBRE:object
		});
        if(!deleteO){
			res.status(401).json({mensaje: "No se encontro el objecto"})
		}
		res.json({
			obj : deleteO
		})
	}catch(err){
		console.log(err)
		res.status(500).json({mensaje : "Hubo un error al borrar el objecto"})
	}
}
async function readObject(req,res){
	const object = req.body.ob;

    
	try{
		const updateOb = await Ceiit.findOne({
			NOMBRE:object
		
		});
        if(!updateOb){
			res.status(401).json({mensaje: "No se encontro el objecto"})
		}
		res.json({
			obj : updateOb
		})
	}catch(err){
		console.log(err)
		res.status(500).json({mensaje : "Hubo un error al buscar el objecto"})
	}
}

module.exports = {
	addObject,readObject,deleteObject,updateObject
};
