const mongoose = require('mongoose');

//conexión a la mongoDB
mongoose.connect('mongodb+srv://Grupo-08:grupo08@cursadanodejs.ls9ii.mongodb.net/Node-js')
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(error => console.error('Error al conectar a mongoDb', error));

//Esquema
const superheroSchema = new mongoose.Schema( {
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0},
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador:  String
}, {collection: 'Grupo-08' });

//Modelo
const SuperHero = mongoose.model('SuperHero', superheroSchema);

async function insertSuperHero () {
    const hero = new SuperHero( {
        nombreSuperHeroe: 'Batman',
        nombreReal: 'Bruce Wayne',
        edad: 26,
        planetaOrigen: 'Tierra',
        debilidad: 'Dependiente de la tecnologia',
        poderes: ['Genio científico', 'Detective experto', 'Luchador excepcional'],
        aliados: ['Robin', 'James Gordon', 'Alfred Pennyworth'],
        enemigos: ['Joker', 'Pingüino', 'Dos Caras', 'Enigma'],
        creador: 'Leandro'
    });
    await hero.save();
    console.log('Superhéroe insertado:', hero);
}

//Actualización de documento
async function updateSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.updateOne(
        { nombreSuperHeroe: nombreSuperHeroe },
        { $set: { edad: 30 } }
    );
    console.log('Resultado de la actualización', result); 
}

//updateSuperHero('Batman');


//Eliminación de documento
async function deleteSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });
    console.log('Superhéroe eliminado', result); 
}

//deleteSuperHero('Batman');


//Buscar documentos
async function findSuperHeroes() {
    const heroes = await SuperHero.find({ planetaOrigen: 'Tierra' });
    console.log('Resultado de la actualización', heroes); 
}

insertSuperHero();
//findSuperHeroes();
//updateSuperHero();
//deleteSuperHero('Batman')

