import express from "express"
import userRoutes from './user.routes.js'
import mainRoutes from './main.routes.js'
import mongoose from "mongoose"
import errorHandler from "./middleware/errors.js"
import postsRoutes from  './post.routes.js'
import universityRoutes from  './university.routes.js'
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
mongoose.connect("mongodb://127.0.0.1/test",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("db connected")).catch((err)=> console.log(err))
const app = express();
app.use(cookieParser())
const port = 4000;
app.set('view engine', "ejs")
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use('/v1' ,mainRoutes)
app.use('/v1/user' ,userRoutes)
 app.use('/v1/post' ,postsRoutes)
 app.use('/v1/university' ,universityRoutes)
 
app.use(errorHandler)
app.listen(port, () =>{
    console.log(`you're on port ${port}`)
})