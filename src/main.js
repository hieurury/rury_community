const express = require('express'); //tích hợp express vào
const app = express(); //tạo một biến chính
// const expressSession = require('express-session');
const { engine } = require('express-handlebars');
const morgan = require('morgan')
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const Route = require('./routes/index');


//body parser
//show data from form
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));

//set view engine
app.engine('hbs', engine({
    extname: 'hbs',
}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//use morgan to show method HTTP
app.use(morgan('combined'))


//set route
Route(app);

//listen port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
