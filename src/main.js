const express = require('express'); //tích hợp express vào
const app = express(); //tạo một biến chính
// const expressSession = require('express-session');
const { engine } = require('express-handlebars');
const morgan = require('morgan')
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;


//body parser
//show data from form
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));

//use morgan to show method HTTP
app.use(morgan('combined'))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//listen port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
