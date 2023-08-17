import express, { response } from 'express'
import cors from 'cors'
import { getUser, getRow, addUser, checkUser, signUp, signIn, getProjects, getDetails} from './database.js'

const app = express()
app.use(express.json())
app.use(cors());


// Login 
app.post('/signup', async(req, res) => {
  const {username, email, password, organization} = req.body 
  try{
    await signUp(username, email, password, organization);
    res.json({message:"Added User Successfully"})
  }
  catch(e){
    res.json({message: "User Already Registered"})
  }
})


app.post("/signin", async (req, res) => {
  try {
    const {email, password } = req.body;
    const users = await signIn(email, password);
    res.send(users);
  } catch (e) {
    res.status(401).send({ message: "Wrong Credentials" });
  }
});




// Get Projects 
app.post("/get-projects", async(req, res) => {
  try{
  const {email} = req.body
  const project = await getProjects(email)
  res.send(project)
  }catch(e){
    res.send("Error")
  }
})

// Get API, SDK, UA 
app.post("/get-details", async(req, res) => {
  try{
  const {email, project_type} = req.body
  const project = await getDetails(email, project_type)
  res.send(project)
  }catch(e){
    res.send("Error")
  }
})



app.get("/users", async (req, res) => {
  const users = await getUser()
  res.send(users)
});

app.post("/users", async (req, res) => {
  try{
    const { project, project_type, project_role, organization_name,industry_domains, funnel_stages, manage, id , email} = req.body;
  await addUser(project, project_type, project_role, organization_name,industry_domains, funnel_stages, manage, id, email);
  res.json({ message: "Added Project Successfully" });
  }
  catch(e){
    res.send({e})
  }
});

app.post("/check-project", async (req, res) => {
  try{
    const {project } = req.body;// Use query parameters instead of req.body for GET request
  const update = await checkUser(project);
  const details = update[0].project
  res.json({details});
  }
  catch(e){
    res.send({details: ""})
  }
});

app.get('/', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err)
    } else {
      res.send(data)
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});


