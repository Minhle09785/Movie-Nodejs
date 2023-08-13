const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');


// Connect to DB
db.connect();

const app = express();
const port = 3000;

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({	
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// HTTP logger
 app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
/* 
app.post('/loginnn', async (req, res) => {
    const {name, password} = req.body;
   
    Account.findOne({
        name : name,
        password : password
    })
    .then(data =>
      {
        if(data){
            res.json("Tai khoan nay da ton tai!");
        }else{
            Account.create({
                name : name,
                password : password
            });
            Account.findOne({
                name: name,
                password: password
            })
        }
      }
    ).then(data => {
        res.json("tao tai khoan thanh cong")
    }).catch(err => {
        res.status(500).json("Tao tai khoan that ban");
    })
}) */

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
