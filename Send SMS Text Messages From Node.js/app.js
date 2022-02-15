const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

const nexmo = new Nexmo({
    apiKey : '[Enter your api key]',
    apiSecret : '[Enter your api secret key]'
}, {debug:true});

//Init app
const app = express();

//Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//public folder setup
app.use(express.static(__dirname + '/public'));

//body parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req,res) => {
    // res.send(req.body);
    // console.log(req.body);
    
    nexmo.message.sendSms(
        '[Enter your virtual number ex:918888888888]', req.body.number, req.body.text, { type: 'unicode' },
        (err, responseData) => {
            if(err){
                console.log(err);
            }else{
                console.dir(responseData);
                const data = {
                    id : responseData.messages[0]['message-id'],
                    number: responseData.message[0]['to']
                }

                io.emit('smsStatus', data);
            }
        }
    )
})

const port = 3000;
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

const io = socketio(server);
io.on(`connection`, (socket) => {
    console.log('Connected');
    io.on(`disconnect`, () => {
        console.log('Disconnected');
    })
})