let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');

const PORT = 3001;

let pool = new pg.Pool({
    user: 'avnadmin',
    host: 'pg-a9bf945-ngokhaibook.d.aivencloud.com',
    database: 'defaultdb',
    password: 'AVNS_ijnWwQZyokE74LJCJ0Y',
    port: 26325,
    max: 10
});

pool.connect((err, db, done) => {
    if(err) {
        return console.log(err);
    }
    else {
        db.query('SELECT * FROM public.books', (err, table) => {
            done();
            if(err) {
                return console.log(err);
            }
            else {
                console.log(table.rows);
            }
        });
    }
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(function(req, res, next) {
    respond.header("Access-Control-Allow-Origin", "*");
    respond.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));