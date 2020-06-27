var api = require('./src/api.js').app;
const fs = require('fs');
const shoesFilepath = './src/shoes.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/shoes', function (request, response) {
  response.json(getShoes());
});

api.get('/shoes/:id', function (request, response) {
  let shoe = getShoeById(request.params.id);
  if (shoe) response.json(shoe);
  response.json('not found');
});

api.put('/shoes', function (request, response) {
  response.json(request.body);
  saveShoe(request.body);
  
});

api.post('/shoes', function (request, response) {
  let shoes = [];
  try {
    shoes = JSON.parse(fs.readFileSync(shoesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  var selshoe=getShoeById(request.body.id);
  if (selshoe != null) {
    var pos=0;
    for(var i=0; i<shoes.length;i++){
      if(shoes[i].id==request.body.id) pos=i;
    }
    shoes[pos]=request.body;
  };
  try {
    fs.writeFileSync(shoesFilepath, JSON.stringify(shoes));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }




  // cautam daca exista indexul de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  // salvam in fisier produsele actualizate
  response.json('Shoe was saved succesfully');
});

api.delete('/shoes/:index', function (request, response) {
  let shoes = [];
  try {
    shoes = JSON.parse(fs.readFileSync(shoesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  var pos=0;
  for(var i=0; i<shoes.length;i++){
    if(shoes[i].id==request.params.index) pos=i;
  }
  shoes.splice(pos, 1);
  if (shoes==null) console.log();
  else{
  try {
    fs.writeFileSync(shoesFilepath, JSON.stringify(shoes));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}
   response.json('User with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getShoes() {
  let shoes = [];
  try {
    shoes = JSON.parse(fs.readFileSync(shoesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return shoes;
}

function saveShoe(shoe) {
  let shoes = getShoes();// citire json din fisier
  let maxId = getMaxId(shoes);
  shoe.id = maxId+1;// generare id unic
  shoes.push(shoe);// adaugare masina noua in array
  try {
    fs.writeFileSync(shoesFilepath, JSON.stringify(shoes));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(shoes) {
  let max = 0;
  for (var i=0; i<shoes.length;i++) {
    if(max < shoes[i].id) {
      max = shoes[i].id;
    }
  }
  return max;
}

function getShoeById(id){
  let shoes = getShoes();// citire json din fisier
  let selectedShoe = null;
  for(var i=0; i<shoes.length; i++) {
    if(id == shoes[i].id) selectedShoe = shoes[i];
  }
  return selectedShoe;
}