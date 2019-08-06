var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// GET /api/owners
app.get('/api/owners',function(req,res,next){
    return res.send(owners);
});
// GET /api/owners/:id

app.get('/api/owners/:id',function(req,res,next){
    
    const owner = owners.find(function(o){
        return o.id ===parseInt(req.params.id);
       
    });
    console.log(req.params.id);
        if (!owner) return res.status(404).send('Id not found');
        res.send(owner);
});

// POST /api/owners
app.post('/api/owners',function(req,res,next){
    if (!req.body.name || req.body.name.length<2){
        res.status(400).send('Name is required and longer than 2 characters');
        return;
    }
    const ownerAdded={
        id: owners.length + 1,
        name: req.body.name
    };
    owners.push(ownerAdded);
    res.send(ownerAdded);
});
// PUT /api/owners/:id
app.put('/api/owners/:id', function(req, res) {

    const ownerChanged = owners.find(function(o){
        return o.id ===parseInt(req.params.id);
});

// DELETE /api/owners/:id
app.delete('/api/owners/:id', function(req, res) {
    // Look up the owner
    const ownerDeleted = owners.find(function(o){
        return o.id ===parseInt(req.params.id);
    });
    //If not existing, return 404 
     if (!ownerDeleted) return res.status(404).send('the owner with the given ID was not found');
    //delete
    const index = owners.indexOf(ownerDeleted);
    owners.splice(index,1);
    //Return the same owner
    res.send(ownerDeleted);
 });

// GET /api/owners/:id/pets
app.get('/api/owners/:id/pets',function(req,res,next){

    const ownerPets = owners.find(function(o){
        return o.id ===parseInt(req.params.id);
       
    });
    
        if (!ownerPets) return res.status(404).send('the pets with the given ID was not found');
        res.send(ownerPets.pets);
    
    
});

// GET /api/owners/:id/pets/:petId
app.get('/api/owners/:id/pets/:petId',function(req,res,next){

    const ownerOfPets = owners.find(function(owner){
        return owner.id ===parseInt(req.params.id);
       
    });
    
    const ownerPetsId = ownerOfPets.pets.find(function(p){
        return  p.id === parseInt(req.params.petId);
    });

    if (!ownerOfPets) return res.status(404).send('the pets with the given ID was not found');
    if (!ownerPetsId) return res.status(404).send('the pet with the given ID was not found');
    res.send(ownerPetsId);

});
// POST /api/owners/:id/pets

// PUT /api/owners/:id/pets/:petId

// DELETE /api/owners/:id/pets/:petId


app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})