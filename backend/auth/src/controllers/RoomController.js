
const Room = require('../models/Room');

async function getRoomById(id){

    try {
        return await Room.findById(id);
    } catch (e) {
        return null;
    }
}


module.exports = {
    async index(req, res) {
        const rooms = await Room.find().sort('-createdAt');
        res.status(200).send(rooms);
    },
    async store(req, res) {
        const {
            description, type, capacity
        } = req.body;

        const room = await Room.create({
            description,
            type,
            capacity,
        });

        return res.status(200).json(room);
    },
    async delete(req,res){
        const { roomId } = req.params;
        const room = await getRoomById(roomId);
        if(room === null){
            return res.status(400).send( {status: false, msg: `Room id ${roomId} doesn't exists!`});
        }
        const deleted = await room.remove();

        if(deleted){
            return res.status(200).send({status: true, msg: `Room id ${roomId} removed!`});
        } else {
            return res.status(400).send({status: false, msg: `Error to remove Room id ${roomId}`});
        }
    },
    async update(req, res){
        const { roomId } = req.params;
        const {
            description, type, capacity
        } = req.body;
        const room = await getRoomById(roomId);
        if(room === null){
            return res.status(400).send( {status: false, msg: `Room id ${roomId} doesn't exists!`});
        }
        const updated = await room.updateOne({
            $set: {
                description,
                type,
                capacity
            }
        });

        const roomUpdate = await getRoomById(roomId);
        if(updated.ok){
            return res.status(200).send({status: true, roomUpdate});
        } else {
            return res.status(200).send({status: false, msg: `Error to update room id ${roomId}`});
        }
    }
};
