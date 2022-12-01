import * as tuitsDao from '../../tuits/tuits-dao.js';
import mongoose from 'mongoose';

const TuitsController = (app) => {
    //retreive data from server
    app.get('/api/tuits', findTuits);

   app.post('/api/tuits', createTuit);

   app.put('/api/tuits/:tid', updateTuit);

 app.delete('/api/tuits/:tid', deleteTuit);

}

const findTuits = async (req, res) =>{    //now it's asynchronous function
        const tuits = await tuitsDao.findTuits();   //retrieve tuits from database
        res.json(tuits);}

const createTuit = async (req, res) => {
    const newTuit = req.body;
    //newTuit._id = (new Date()).getTime() + '';  ID created by database instead
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.dislikes = 0;
    newTuit.disliked = false;
    newTuit.replies = 0;
    newTuit.retuits = 0;
    newTuit.username = "Teena C";
    newTuit.handle = "@teenac";
    newTuit.time = "just now";
    newTuit.image = "img.png";
    //tuits.push(newTuit); not using array anymore
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit);
}

const deleteTuit = async (req, res) => {
  const tuitdIdToDelete = req.params.tid;
  const status = await tuitsDao.deleteTuit(tuitdIdToDelete);  //status reports success or failure to delete record from database
 // tuits = tuits.filter((t) =>                     no longer using array
   // t._id.toString() !== tuitdIdToDelete);
  res.json(status);  //respond the server with success HTTP Code 200
}

const updateTuit = async (req, res) => {
    const tuitUpdates = req.body
    const tid = req.params.tid
    /*const tuitIndex = tuits.findIndex(t => t._id.toString() === tid)
    if (tuitIndex >= 0){
        tuits[tuitIndex] = {...tuits[tuitIndex], ...tuitUpdates}
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }*/

    const status = await tuitsDao.updateTuit(tid, tuitUpdates);
    res.json(status);
}


export default TuitsController;