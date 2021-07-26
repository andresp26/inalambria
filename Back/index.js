var express = require('express') //llamamos a Express
var app = express()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.json());
var port = process.env.PORT || 3001  // establecemos nuestro puerto

const sales = [
    {
        "items": [
            {
                "item": {
                    "id": "945",
                    "price": 10,
                    "description": "taladro"
                },
            }
        ],
        "location": {
            "id": "1"
        },
        "department": {
            "id": "2"
        },
        "seller": {
            "id": "1"
        }
    },
    {
        "items": [
            {
                "item": {
                    "id": "123",
                    "price": 200,
                    "description": "computador"
                },
            }
        ],
        "location": {
            "id": "1"
        },
        "department": {
            "id": "2"
        },
        "seller": {
            "id": "1"
        }
    },
    {
        "items": [
            {
                "item": {
                    "id": "550",
                    "price": 300,
                    "description": "portatil Mac"
                },
            }
        ],
        "location": {
            "id": "1"
        },
        "department": {
            "id": "1"
        },
        "seller": {
            "id": "2"
        }
    },
    {
        "items": [
            {
                "item": {
                    "id": "111",
                    "price": 30,
                    "description": "baterias AAA"
                },
                "item": {
                    "id": "222",
                    "price": 50,
                    "description": "Cinta"
                },
            }
        ],
        "location": {
            "id": "1"
        },
        "department": {
            "id": "1"
        },
        "seller": {
            "id": "3"
        }
    },
    {
        "items": [
            {
                "item": {
                    "id": "146",
                    "price": 20,
                    "description": "Bombillo LED"
                },
                "item": {
                    "id": "867",
                    "price": 86,
                    "description": "Lampara LED"
                },
            }
        ],
        "location": {
            "id": "2"
        },
        "department": {
            "id": "1"
        },
        "seller": {
            "id": "3"
        }
    }
]


app.get('/', function (req, res) {
    res.json({ response: sales })
});

app.get('/sales', function (req, res) {

    const { location, seller, department, amount } = req.query;
    console.log(req.query)
    console.log('location')
    let result = sales;
    if (location)
        result = sales.filter(x => x.location.id == location);
    if (seller)
        result = sales.filter(x => x.seller.id == seller);
    if (department)
        result = sales.filter(x => x.department.id == department);
    if (amount) {
        result = sales.filter(function (x) {
            let suma = 0;
            x.items.forEach(element => {
                suma+= element.item.price
                console.log(element)
            });
            console.log(suma)
           return  suma <= amount
            }
        );
    }
    console.log(result)
    res.json({ response: result })
});


app.listen(port, () => console.log("Servidor listo ..."))