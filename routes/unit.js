var express = require('express');
var router = express.Router();
//var db = require('mongoskin').db('localhost:27017/apprenent');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var Unit = mongoose.model('unit', { 
  imagen: String,
  titulo: String,
  descripcion: String,
  categoria: String,
  icono: String,
  color: String,
  childs: [{ type: String, url: String }]
});


router.post('/:id', function(req, res, next) {
  var data = JSON.parse(req.body);
  console.log("dataaaa",data);

  var unit = new Unit(data);
    
  var upsertData = unit.toObject();
  upsertData.$set = {};
  
  console.log("UPSERTADATAAAA1",upsertData);
  if(upsertData.childs){
    upsertData.childs.forEach(function(value, i){
      if(value==null){
        upsertData.childs[i] = undefined;
      }
      upsertData.$set['childs.'+ i] = value;
    });
  }
  console.log("UPSERTADATAAAA2", upsertData);
  //delete upsertData.contenido;
  upsertData.childs=[];
  Object.keys(data).forEach(function(key){
    if(key.match(/^childs\.[0-9]+/)){
      upsertData.$set[key] = data[key];
    }
  });
  console.log("UPSERTADATAAAA3",upsertData);
  
  var idcheck = { _id: upsertData._id };
  if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
    idcheck = { _id: req.params.id };
  }
  delete upsertData._id;

  console.log("IDCHECKK",idcheck);
  Unit.update(idcheck, upsertData, {upsert: true}, function(err, raw){
    if (err) return console.log("MIUKK",err);
    console.log("RAWWWWW",raw);
    res.send(unit._id);
  });
});




router.get('/all', function(req, res, next) {
  console.log("LISTINGGG ALLL");
  Unit.find({}, '_id', function(err, units){
    if(err){
      console.log("ERROR LISTING!!", err);
      return handleError(err); 
    }
    
    if(units.length < 1){
      demounits.forEach(function(unitdata){
        var unit = new Unit(unitdata);
        unit.save(function(err){
          if (err) return handleError(err);
          console.log("DEFAULTT unit",unit);
        });
      });
      res.send({});
    }else{
      res.send(units);
    }
  });
});  


router.get('/:id', function(req, res, next) {
  console.log("REQUESTING UNIT",req.params.id);
  Unit.findById(req.params.id, function (err, unit) {
    if (err) { 
      console.log("ERRORRR", err); 
      res.send({
                imagen: '../images/1.jpg',
                titulo: "Literatura",
                descripcion: "1º Bachillerato",
                categoria: "Curso",
                icono: "book",
                color: "#d23f31",
                contenido: ["En este curso aprenderemos a leer libros de literatura<br>hola...","lulululululululululu"],
              });
      return console.log(err); 
    }
    
    if(unit){
      console.log("SENDING...", unit);
      res.send(unit);
    } else {
      res.send({
                imagen: '../images/1.jpg',
                titulo: "Literatura",
                descripcion: "1º Bachillerato",
                categoria: "Curso",
                icono: "book",
                color: "#d23f31",
                contenido: ["En este curso aprenderemos a leer libros de literatura<br>hola...","lulululululululululu"],
              });
    }
  });
});
  
  
 var demounits = [];
   
 var demounits3 = [
    {
    imagen: '../images/3.jpg',
    titulo: "Literat<i>ur</i>a",
    descripcion: "1º Bachillerato",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["cont<u>eni</u>do3"],
  }
];
 
var demounits2 = [
    {
    imagen: '../images/3.jpg',
    titulo: "Literat<i>ur</i>a",
    descripcion: "1º Bachillerato",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["cont<b>enid</b>o1","cont<i>enid</i>o2","cont<u>eni</u>do3"],
  },
  {
    imagen: '../images/1.jpg',
    titulo: "Literat<i>ur</i>a",
    descripcion: "1º Bachillerato",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["cont<b>enid</b>o1","cont<i>enid</i>o2","cont<u>eni</u>do3"],
  },
   {
    imagen: '../images/2.jpg',
    titulo: "Literat<b>ur</b>a",
    descripcion: "2º Bachillerato",
    categoria: "Actividad",
    icono: "book",
    color: "#223f31",
    contenido: ["jejeje<i>enid</i>o2","jiijiji<u>eni</u>do3"],
  }
];

var demounits3 = [
  {
    imagen: '../images/1.jpg',
    titulo: "Literat<i>ur</i>a",
    descripcion: "1º Bachillerato",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos a leer libros de literatura<br>hola..."],
  },{
    imagen: '../images/2.jpg',
    titulo: "Matemáticas",
    descripcion: "2º Bachillerato",
    contenido: ["En este curso <b>aprenderemos</b> a sumar y restar..."],
    categoria: "Curso",
    icono: "book",
    color: "#d23f31"
  },{
    imagen: '../images/3.jpg',
    titulo: "Informática",
    descripcion: "1º ASIX",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos a usar el ordenador..."],
  },{
    imagen: '../images/3.jpg',
    titulo: "Tema 1",
    descripcion: "Introduccion a la informatica",
    categoria: "Tema",
    icono: "book",
    color: "#9C27B0",
    contenido: [
      "La informática, también llamada computación en América,1 es una ciencia que estudia métodos, procesos, técnicas, con el fin de almacenar, la arquitectura de computadores, las redes de computadores, la inteligencia artificial y ciertas cuestiones relacionadas con la electrónica. Se puede entender por informática a la unión sinérgica de todo este conjunto de disciplinas. Esta disciplina se aplica a numerosas y variadas áreas del conocimiento o la actividad humana, como por ejemplo: gestión de negocios, almacenamiento y consulta de información, monitorización y control de procesos, industria, robótica, comunicaciones, control de transportes procesar y transmitir información y datos en formato digital. La informática se ha desarrollado rápidamente a partir de la segunda mitad del siglo XX, con la aparición de tecnologías tales como el circuito integrado, Internet y el teléfono móvil...."],
  },{
    imagen: '../images/3.jpg',
    titulo: "Actividad 1",
    descripcion: "Sistemas informaticos",
    categoria: "Actividad",
    icono: "assignment",
    color: "#2196F3",
    contenido: ["Encuentra las diferencias",
          "Los virus informáticos son programas que se introducen en una computadora, sin conocimiento del usuario, Conforme a ello, los sistemas informáticos deben realizar las siguientes tres tareas básicas: a b y c. En los inicios del proceso de información, con la informática sólo se facilitaban los trabajos repetitivos y monótonos del área administrativa. La automatización de esos procesos trajo como consecuencia directa una disminución de los costos y un incremento en la productividad. En la informática convergen los fundamentos de las ciencias de la computación, la programación y metodologías para el desarrollo de software, la arquitectura de computadores, las redes de computadores, la inteligencia artificial y ciertas cuestiones relacionadas con la electrónica. Se puede entender por informática a la unión sinérgica de todo este conjunto de disciplinas. Esta disciplina se aplica a numerosas para ejecutar en él acciones no deseadas."],
  },{
    imagen: '../images/3.jpg',
    titulo: "Actividad 2",
    descripcion: "Sistemas informaticos",
    categoria: "Actividad",
    icono: "assignment",
    color: "#2196F3",
    contenido: ["Encuentra las igualdades"],
  },{
    imagen: '../images/3.jpg',
    titulo: "Tema 2",
    descripcion: "Sistemas informaticos",
    categoria: "Tema",
    icono: "book",
    color: "#9C27B0",
    contenido: [
      "Los sistemas computacionales, generalmente implementados como dispositivos electrónicos, permiten el procesamiento automático de la información. Conforme a ello, los sistemas informáticos deben realizar las siguientes tres tareas básicas: a b y c. En los inicios del proceso de información, con la informática sólo se facilitaban los trabajos repetitivos y monótonos del área administrativa. La automatización de esos procesos trajo como consecuencia directa una disminución de los costos y un incremento en la productividad. En la informática convergen los fundamentos de las ciencias de la computación, la programación y metodologías para el desarrollo de software, la arquitectura de computadores, las redes de computadores, la inteligencia artificial y ciertas cuestiones relacionadas con la electrónica. Se puede entender por informática a la unión sinérgica de todo este conjunto de disciplinas. Esta disciplina se aplica a numerosas y variadas áreas del conocimiento o la actividad humana, como por ejemplo: gestión de negocios, almacenamiento y consulta de información, monitorización y control de procesos, industria, robótica, comunicaciones, control de transportes, investigación, desarrollo de juegos, diseño computarizado, aplicaciones / herramientas multimedia, medicina, biología, física, química, meteorología, ingeniería, arte, etc. Puede tanto facilitar la toma de decisiones a nivel gerencial (en una empresa) como permitir el control de procesos críticos. Actualmente es difícil concebir un área que no use, de alguna forma, el apoyo de la informática. Ésta puede cubrir un enorme abanico de funciones, que van desde las más simples cuestiones domésticas hasta los cálculos científicos más complejos. Entre las funciones principales de la informática."],
  },{
    imagen: '../images/3.jpg',
    titulo: "Actividad 3",
    descripcion: "Sistemas informaticos",
    categoria: "Actividad",
    icono: "assignment",
    color: "#2196F3",
    contenido: ["Encuentra las igualdades bla bla bla"],
  },{
    imagen: '../images/4.jpg',
    titulo: "Latin",
    descripcion: "1º Bachillerato",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos latin..."],
  },{
    imagen: '../images/5.jpg',
    titulo: "Historia",
    descripcion: "4º ESO",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos historia..."],

  },{
    imagen: '../images/6.jpg',
    titulo: "Matematicas",
    descripcion: "1º Bachillerato",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos a sumar..."],
  },{
    imagen: '../images/7.jpg',
    titulo: "Ciencia",
    descripcion: "1º Bachillerato",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos historia..."],            
  },{
    imagen: '../images/8.jpg',
    titulo: "Matematicas",
    descripcion: "4º ESO",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos a restar..."],            
  },{
    imagen: '../images/11.jpg',
    titulo: "Historia del Arte",
    descripcion: "4º ESO",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: [
      "En este curso aprenderemos arte<h3>Pinturas rupestres</h3><img src='/images/5.jpg'><h3>Leonardo Da vinci</h3><img src='/images/7.jpg'><h3>Van Gogh</h3><img src='/images/11.jpg'>"],
  },{
    imagen: '../images/3.jpg',
    titulo: "Actividad 1",
    descripcion: "Artistas de la historia del arte",
    categoria: "Actividad",
    icono: "assignment",
    color: "#2196F3",
    contenido: [
      "<h4>Quien pinto Noche Estrellada?</h4><paper-item>A. Van Gogh</paper-item><paper-item>B. Van Gohg</paper-item><paper-item>C. Van Ghog</paper-item>"
    ],
  },{
    imagen: '../images/9.jpg',
    titulo: "Quimica",
    descripcion: "4º ESO",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos quimica..."],            
  },{
    imagen: '../images/10.jpg',
    titulo: "Ingles",
    descripcion: "4º ESO",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos ingles..."],            
  }
]; 
 
  
  
  
  
var demounits2 = [
  {
    imagen: '../images/1.jpg',
    titulo: "Literatura",
    descripcion: "1º Bachillerato",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos a leer libros de literatura<br>hola..."],
  },
  {
    imagen: '../images/2.jpg',
    titulo: "Matemáticas",
    descripcion: "2º Bachillerato",
    contenido: ["En este curso <b>aprenderemos</b> a sumar y restar..."],
    categoria: "Curso",
    icono: "book",
    color: "#d23f31"
  },
  {
    imagen: '../images/3.jpg',
    titulo: "Informática",
    descripcion: "1º ASIX",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: [
      "En este curso aprenderemos a usar el ordenador...",
      {
        imagen: '../images/3.jpg',
        titulo: "Tema 1",
        descripcion: "Introduccion a la informatica",
        categoria: "Tema",
        icono: "book",
        color: "#9C27B0",
        contenido: [
          "La informática, también llamada computación en América,1 es una ciencia que estudia métodos, procesos, técnicas, con el fin de almacenar, la arquitectura de computadores, las redes de computadores, la inteligencia artificial y ciertas cuestiones relacionadas con la electrónica. Se puede entender por informática a la unión sinérgica de todo este conjunto de disciplinas. Esta disciplina se aplica a numerosas y variadas áreas del conocimiento o la actividad humana, como por ejemplo: gestión de negocios, almacenamiento y consulta de información, monitorización y control de procesos, industria, robótica, comunicaciones, control de transportes procesar y transmitir información y datos en formato digital. La informática se ha desarrollado rápidamente a partir de la segunda mitad del siglo XX, con la aparición de tecnologías tales como el circuito integrado, Internet y el teléfono móvil....",
          {
            imagen: '../images/3.jpg',
            titulo: "Actividad 1",
            descripcion: "Sistemas informaticos",
            categoria: "Actividad",
            icono: "assignment",
            color: "#2196F3",
            contenido: ["Encuentra las diferencias"],                    
          },
          "Los virus informáticos son programas que se introducen en una computadora, sin conocimiento del usuario, Conforme a ello, los sistemas informáticos deben realizar las siguientes tres tareas básicas: a b y c. En los inicios del proceso de información, con la informática sólo se facilitaban los trabajos repetitivos y monótonos del área administrativa. La automatización de esos procesos trajo como consecuencia directa una disminución de los costos y un incremento en la productividad. En la informática convergen los fundamentos de las ciencias de la computación, la programación y metodologías para el desarrollo de software, la arquitectura de computadores, las redes de computadores, la inteligencia artificial y ciertas cuestiones relacionadas con la electrónica. Se puede entender por informática a la unión sinérgica de todo este conjunto de disciplinas. Esta disciplina se aplica a numerosas para ejecutar en él acciones no deseadas.",
          {
            imagen: '../images/3.jpg',
            titulo: "Actividad 2",
            descripcion: "Sistemas informaticos",
            categoria: "Actividad",
            icono: "assignment",
            color: "#2196F3",
            contenido: ["Encuentra las igualdades"],

          },
        
        ],

      },
      {
        imagen: '../images/3.jpg',
        titulo: "Tema 2",
        descripcion: "Sistemas informaticos",
        categoria: "Tema",
        icono: "book",
        color: "#9C27B0",
        contenido: [
          "Los sistemas computacionales, generalmente implementados como dispositivos electrónicos, permiten el procesamiento automático de la información. Conforme a ello, los sistemas informáticos deben realizar las siguientes tres tareas básicas: a b y c. En los inicios del proceso de información, con la informática sólo se facilitaban los trabajos repetitivos y monótonos del área administrativa. La automatización de esos procesos trajo como consecuencia directa una disminución de los costos y un incremento en la productividad. En la informática convergen los fundamentos de las ciencias de la computación, la programación y metodologías para el desarrollo de software, la arquitectura de computadores, las redes de computadores, la inteligencia artificial y ciertas cuestiones relacionadas con la electrónica. Se puede entender por informática a la unión sinérgica de todo este conjunto de disciplinas. Esta disciplina se aplica a numerosas y variadas áreas del conocimiento o la actividad humana, como por ejemplo: gestión de negocios, almacenamiento y consulta de información, monitorización y control de procesos, industria, robótica, comunicaciones, control de transportes, investigación, desarrollo de juegos, diseño computarizado, aplicaciones / herramientas multimedia, medicina, biología, física, química, meteorología, ingeniería, arte, etc. Puede tanto facilitar la toma de decisiones a nivel gerencial (en una empresa) como permitir el control de procesos críticos. Actualmente es difícil concebir un área que no use, de alguna forma, el apoyo de la informática. Ésta puede cubrir un enorme abanico de funciones, que van desde las más simples cuestiones domésticas hasta los cálculos científicos más complejos. Entre las funciones principales de la informática.",
          {
            imagen: '../images/3.jpg',
            titulo: "Actividad 3",
            descripcion: "Sistemas informaticos",
            categoria: "Actividad",
            icono: "assignment",
            color: "#2196F3",
            contenido: ["Encuentra las igualdades bla bla bla"],

          }
        
        ],

      }
    ],

  },
  {
    imagen: '../images/4.jpg',
    titulo: "Latin",
    descripcion: "1º Bachillerato",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos latin..."],
  },
  {
    imagen: '../images/5.jpg',
    titulo: "Historia",
    descripcion: "4º ESO",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos historia..."],

  },
  {
    imagen: '../images/6.jpg',
    titulo: "Matematicas",
    descripcion: "1º Bachillerato",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos a sumar..."],
  },
  {
    imagen: '../images/7.jpg',
    titulo: "Ciencia",
    descripcion: "1º Bachillerato",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos historia..."],            
  },
  {
    imagen: '../images/8.jpg',
    titulo: "Matematicas",
    descripcion: "4º ESO",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos a restar..."],            
  },
  {
    imagen: '../images/11.jpg',
    titulo: "Historia del Arte",
    descripcion: "4º ESO",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: [
      "En este curso aprenderemos arte<h3>Pinturas rupestres</h3><img src='/images/5.jpg'><h3>Leonardo Da vinci</h3><img src='/images/7.jpg'><h3>Van Gogh</h3><img src='/images/11.jpg'>",
      {
        imagen: '../images/3.jpg',
        titulo: "Actividad 1",
        descripcion: "Artistas de la historia del arte",
        categoria: "Actividad",
        icono: "assignment",
        color: "#2196F3",
        contenido: [
          "<h4>Quien pinto Noche Estrellada?</h4><paper-item>A. Van Gogh</paper-item><paper-item>B. Van Gohg</paper-item><paper-item>C. Van Ghog</paper-item>"
        ],
      },
      "<p>Ale, ya sabes arte</p>"
    ],            
  },
  {
    imagen: '../images/9.jpg',
    titulo: "Quimica",
    descripcion: "4º ESO",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos quimica..."],            
  },
  {
    imagen: '../images/10.jpg',
    titulo: "Ingles",
    descripcion: "4º ESO",
    categoria: "Curso",
    icono: "book",
    color: "#d23f31",
    contenido: ["En este curso aprenderemos ingles..."],            
  }
];


module.exports = router;