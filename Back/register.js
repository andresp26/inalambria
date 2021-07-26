var express = require('express') //llamamos a Express
var app = express()               
 
var port = process.env.PORT || 3001  // establecemos nuestro puerto


let users = [
    {
        name: 'asdsdas',
        email: 'asdsa@amgil.com',
        lastName: 'sasdasdasd',
        dob: '2021-07-13T05:00:00.000Z',
        password: 'Zndresp12*'
     }
];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();  
});
app.use(express.json());

app.get('/', function(req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })   
});

app.post('/register', function(req, res) {
    console.log(req.body) 
    users.push(req.body)
    res.json({status:"OK", mensaje: 'Usuario creado' })   
});

app.post('/user', function(req, res) {
    console.log(req.body)
    const user =  users.find(x => x.email == req.body.email && x.password == req.body.password);
    if (user) {
        res.json({status:"OK", usuario: user })
    } else {
       res.json({status:"fail", usuario: null })
    }
});

app.listen(port, () => console.log("Servidor listo ..."))