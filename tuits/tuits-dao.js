import tuitsModel from './tuits-model.js';
import mongoose  from 'mongoose';

export const findTuits = async () => {
    const allTuits = await tuitsModel.find()
    return allTuits
}
export const createTuit = async (tuit) => {
    const actualTuit = await tuitsModel.create(tuit)
    return actualTuit
}

export const deleteTuit = async (tid) => {
    const convertedId = mongoose.Types.ObjectId(tid);
    console.log(typeof(convertedId))
    const status = await tuitsModel.deleteOne({_id: convertedId})
    return status
}

export const updateTuit = async (tid, tuit) => {
    const status = await tuitsModel.updateOne({_id: tid}, {$set: tuit})
    return status
}