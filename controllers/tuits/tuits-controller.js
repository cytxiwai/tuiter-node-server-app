import posts from './tuits.js';

let tuits = posts



const TuitsController = (app) => {
    //retreive data from server
    app.get('/api/tuits', findTuits);

   app.post('/api/tuits', createTuit);

   app.put('/api/tuits/:tid', updateTuit);

 app.delete('/api/tuits/:tid', deleteTuit);

}

const findTuits = (req, res) =>{
        res.json(tuits);}

const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime() + '';
    newTuit.likes = 0;
    newTuit.liked = false;
    tuits.push(newTuit);
    res.json(newTuit);
}

const deleteTuit = (req, res) => {
  const tuitdIdToDelete = req.params.tid;
  tuits = tuits.filter((t) =>
    t._id.toString() !== tuitdIdToDelete);
  res.sendStatus(200);  //respond the server with success HTTP Code 200
}

const updateTuit = (req, res) => {
    const tuitUpdates = req.body
    const tid = req.params.tid
    const tuitIndex = tuits.findIndex(t => t._id.toString() === tid)
    if (tuitIndex >= 0){
        tuits[tuitIndex] = {...tuits[tuitIndex], ...tuitUpdates}
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
}


export default TuitsController;