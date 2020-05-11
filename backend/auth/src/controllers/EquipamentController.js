const Equipament = require('../models/Equipament');


async function getEquipamentById(id){
    try {
        return await Equipament.findById(id);
    } catch (e) {
        return null;
    }
}

module.exports = {
    async index(req, res) {
        const {equipamentId} = req.params;
        if(equipamentId){
            const equipament = await getEquipamentById(equipamentId);
            if (equipament === null) {
                return res.status(400).send({status: false, msg: `Equipament id ${equipamentId} doesn't exists!`});
            }
            return res.status(200).json(equipament)
        }
        const equipaments = await Equipament.find().sort('-createdAt');
        return res.status(200).json(equipaments);
    },
    async store(req, res) {
        const {
            description, type, brand
        } = req.body;

        const equipament = await Equipament.create({
            description,
            type,
            brand,
        });

        return res.status(201).json(equipament);
    },
    async delete(req, res) {
        const {equipamentId} = req.params;
        const equipament = await getEquipamentById(equipamentId);
        if (equipament === null) {
            return res.status(400).send({status: false, msg: `Equipament id ${equipamentId} doesn't exists!`});
        }
        const deleted = await equipament.remove();

        if (deleted) {
            return res.status(200).send({status: true, msg: `Equipament id ${equipamentId} removed!`});
        } else {
            return res.status(400).send({status: false, msg: `Error to remove Equipament id ${equipamentId}`});
        }
    },
    async update(req, res) {
        const {equipamentId} = req.params;
        const {
            description, type, brand
        } = req.body;
        const equipament = await getEquipamentById(equipamentId);
        if (equipament === null) {
            return res.status(400).send({status: false, msg: `Equipament id ${equipamentId} doesn't exists!`});
        }
        const updated = await equipament.updateOne({
            $set: {
                description,
                type,
                brand
            }
        });


        const equipamentUpdate = await getEquipamentById(equipamentId);
        if (updated.ok) {
            return res.status(200).send({status: true, equipamentUpdate});
        } else {
            return res.status(200).send({status: false, msg: `Error to update equipament id ${equipamentId}`});
        }
    }
};
