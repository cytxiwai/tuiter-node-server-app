import people from './users.js'

let users = people

const UserController = (app) => { //use express instance app to declare HTTP get
    app.get('/api/users', findUsers)   //request pattern /api/users to call a function
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}



const findUsers = (req, res) => {
  const type = req.query.type  // retrieve type parameter from query

  if(type) {
    const usersOfType = users
      .filter(u => u.type === type)
    res.json(usersOfType)
    return
  }
  res.json(users)
}

const findUserById = (req, res) => {
    const userId = req.params.uid;     // get uid from request parameter map
    const user = users.find(u => u._id === userId);  // find user in users array whose _id
    res.json(user)
}

const createUser = (req, res) => {
    const newUser = req.body;
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    res.json(newUser);
}

const deleteUser = (req, res) => {
    const userId = req.params['uid'];   // get user ID from path parameter uid
    users = users.filter(user => user._id !== userId);
    res.sendStatus(200);
}

const updateUser = (req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;
    users = users.map((u) => u._id === userId ?
        {...u, ...updates} : u);
        res.sendStatus(200);
}

export default UserController;