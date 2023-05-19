import express from "express"
import userRoutes from './user.routes.js'
import mainRoutes from './main.routes.js'
import mongoose from "mongoose"
import errorHandler from "./middleware/errors.js"
import postsRoutes from  './post.routes.js'
import universityRoutes from  './university.routes.js'
import cors from "cors"
import internshipRoutes from "./internship.route.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import notificationRoutes from './notification.route.js'

mongoose.connect("mongodb://127.0.0.1/test",{
    useNewUrlParser: true,
}).then(()=> console.log("db connected")).catch((err)=> console.log(err))
const app = express();
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.set('view engine', "ejs")
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))



const port = 4000;


app.use('/' ,mainRoutes)
app.use('/user' ,userRoutes)
 app.use('/post' ,postsRoutes)
 app.use('/university' ,universityRoutes)
 app.use('/internship' ,internshipRoutes)
 app.use('/notification' ,notificationRoutes)
 app.use(errorHandler)

app.listen(port, () =>{
    console.log(`you're on port ${port}`)
})