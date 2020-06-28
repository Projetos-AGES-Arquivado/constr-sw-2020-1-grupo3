const resource = require('../models/resource');

async function getResourceById(id){
    try {
        return await resource.findById(id).populate('resourceType');
    } catch (e) {
        return null;
    }
}

module.exports = {
    async index(req, res) {
        const { resourceId } = req.params;
        if(resourceId){
            const resource = await getResourceById(resourceId);
            if (resource === null) {
                return res.status(400).send(
                    {
                        status: false, 
                        msg: `Resource id ${resourceId} doesn't exists!`
                    }
                );
            }
            return res.status(200).json(resource)
        }
        const resources = await resource.find().populate('resourceType').sort('-createdAt');
        return res.status(200).json(resources);
    },
    async store(req, res) {
        const { resourceType, resourceName } = req.body;
        const modelResource = require('../models/resource');

        const resource = await modelResource.create({
            resourceType,
            resourceName
        });

        return res.status(201).json(resource);
    },
    async delete(req, res) {
        const { resourceId } = req.params;
        const resource = await getResourceById(resourceId);
        if (resource === null) {
            return res.status(400).send(
                {
                    status: false,
                    msg: `Resource id ${resourceId} doesn't exists!`
                }
            );
        }
        const deleted = await resource.remove();

        if (deleted) {
            return res.status(200).send(
                {
                    status: true, 
                    msg: `Resource id ${resourceId} removed!`
                }
            );
        } else {
            return res.status(400).send(
                { 
                    status: false, 
                    msg: `Error to remove resource id ${resourceId}`
                }
            );
        }
    },
    async update(req, res) {
        const { resourceId } = req.params;
        const { resourceType, resourceName } = req.body;

        let update = {};
        if(resourceType){
            update.description = resourceType;
        }
        if(resourceName){
            update.type = resourceName;
        }

        const resource = await getResourceById(resourceId);
        if (resource === null) {
            return res.status(400).send(
                {
                    status: false, 
                    msg: `Resource id ${resourceId} doesn't exists!`
                }
            );
        }
        const updated = await resource.updateOne({
            $set: update
        });


        const resourceUpdate = await getResourceById(resourceId);
        if (updated.ok) {
            return res.status(200).send(
                { status: true, resourceUpdate: resourceUpdate }
            );
        } else {
            return res.status(200).send(
                {
                    status: false, 
                    msg: `Error to update resource id ${resourceId}`
                }
            );
        }
    }
};
