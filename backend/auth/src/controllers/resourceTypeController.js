
const resourceType = require('../models/resourceType');

async function getResourceTypeById(id){

    try {
        return await resourceType.findById(id);
    } catch (e) {
        return null;
    }
}

module.exports = {
    async index(req, res) {
        const {resourceTypeId} = req.params;
        if(resourceTypeId){
            const resourceType = await getResourceTypeById(resourceTypeId);
            if (resourceType === null) {
                return res.status(400).send({status: false, msg: `Resource type id ${resourceTypeId} doesn't exists!`});
            }
            return res.status(200).json(resourceType)
        }
        const resourceTypes = await resourceType.find().sort('-createdAt');
        res.status(200).send(resourceTypes);
    },
    async store(req, res) {
        const { type } = req.body;
        const resourceType = require('../models/resourceType');
        const create = await resourceType.create({ type });

        return res.status(201).json(create);
    },
    async delete(req,res){
        const { resourceTypeId } = req.params;
        const resourceType = await getResourceTypeById(resourceTypeId);
        if(resourceType === null){
            return res.status(400).send( {status: false, msg: `Resource type id ${resourceTypeId} doesn't exists!`});
        }
        const deleted = await resourceType.remove();

        if(deleted){
            return res.status(200).send({status: true, msg: `Resource type id ${resourceTypeId} removed!`});
        } else {
            return res.status(400).send({status: false, msg: `Error to remove resource type id ${resourceTypeId}`});
        }
    },
    async update(req, res) {
        const { resourceTypeId } = req.params;
        const {
            type
        } = req.body;
        let update = {};
        if(type){
            update.type = type;
        }
        const resourceType = await getResourceTypeById(resourceTypeId);
        if(resourceType === null){
            return res.status(400).send( {status: false, msg: `Resource type id ${resourceTypeId} doesn't exists!`});
        }
        const updated = await resourceType.updateOne({
            $set: update
        });

        const resourceTypeUpdate = await getResourceTypeById(resourceTypeId);
        if(updated.ok){
            return res.status(200).send({status: true, resourceTypeUpdate: resourceTypeUpdate});
        } else {
            return res.status(200).send({status: false, msg: `Error to update resource type id ${resourceTypeId}`});
        }
    }
};
