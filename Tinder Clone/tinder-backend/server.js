import express from "express";
import mongoose from "mongoose";
import Cards from './dbCards.js';
import Cors from 'cors';

//App config
const app = express();
const port = process.env.PORT || 8001;

//Middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(
  "mongodb+srv://kashish:kashish@cluster0.i7od8.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//API Endpoints
app.get("/", (req, res) => res.status(200).send("HELLO WORLD!!"));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./tinder-clone/build'))
}
//Listener
app.listen(port, () => console.log(`Listening on localhost ${port}`));
