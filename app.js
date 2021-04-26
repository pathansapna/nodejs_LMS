//declaration
var express = require('express');
var path= require('path')
var  routes = require('./routes')
var expressSession = require('express-session');
var bodyParser = require('body-parser');
fileUpload = require('express-fileupload')
var app = express();
var port = 3000;

//common controllers
var signup = require('./controllers/signup');
var login = require('./controllers/login');
var logout = require('./controllers/logout');

var admin_login = require('./controllers/admin_login');
var admin_signup = require('./controllers/admin_signup');
//admin controllers
var admin = require('./controllers/admin');


//customer controllers
var customer = require('./controllers/customer');
// const router = require('./routes/image-route');

//configure
app.set('view engine', 'ejs');

app.use('/images', express.static(path.join(__dirname + '/images')));


//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({secret: 'my top secret pass', resave: false, saveUninitialized: true}));
app.use('/css', express.static(__dirname + '/css'));
app.use(fileUpload());

app.use('*', function(req, res, next){

	if(req.originalUrl == '/login' || req.originalUrl == '/signup' || req.originalUrl == '/admin_signup' || req.originalUrl == '/admin_login' )
	{
		
		next();
	}
	else
	{
		if(!req.session.admin && !req.session.customer)
		{
			
			res.redirect('/login');
			
			// res.redirect('/admin_signup');
			// res.redirect('/admin_login');
			
			return;
		}
		next();
	}
	
});
var router = require('./routes/image-route');
app.use('/', router);
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);

app.use('/admin_login', admin_login);
app.use('/admin_signup', admin_signup);
//admin routes
app.use('/admin', admin);

//customer routes


app.post('/routes/image-route', (req, res) =>{

	let image;
	let uploadPath;
	if(!req.files || Object.keys(req.files).length === 0){
		return res.status(400).send('No files were uploaded')
	}

	image = req.files.image
	uploadPath =path.join(__dirname + '/images');

	console.log(image);


	image.mv(uploadPath, function(err){
		if(err) return res.status(500).send(err)


		res.send('File uploaded')
	})
})

app.use('/customer', customer);


app.get('/', routes.index);//call for main index page
app.post('/', routes.index);//call for signup post 
app.get('/profile/:id',routes.profile);

//server start
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
