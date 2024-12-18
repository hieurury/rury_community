const express = require('express'); //tích hợp express vào
const app = express(); //tạo một biến chính
const expressSession = require('express-session');
const { engine } = require('express-handlebars');
const morgan = require('morgan')
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const Route = require('./routes/index');
const db = require('./config/dbconnect');
const cookieParser = require('cookie-parser');
const moment = require('moment');

//static file
app.use(express.static(path.join(__dirname, 'public')))
//body parser
//show data from form
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));

//use session
app.use(expressSession({
    secret: process.env.SECRET_KEY,
    resave: false, // Không lưu lại session nếu không có sự thay đổi
    saveUninitialized: false // Không tạo session nếu không có dữ liệu được lưu
}));

//set view engine
app.engine('hbs', engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        sum: (a, b) => a + b,
        count: (data) => data.length,
        time: (timestamp) => {
            return moment(timestamp).fromNow();
        },
    }
}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//use morgan to show method HTTP
app.use(morgan('combined'));
//use route
Route(app);
//connect to database
db.connect();

//listen port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
