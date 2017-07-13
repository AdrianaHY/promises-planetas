var url = "data/earth-like-results.json";
var arregloPlanetas = [];
var contador = 1;
function getJSON(url){
  // se pone return porque queremos regresar el objeto promesa con todo y sus métodos
  return new Promise(function(resolve,reject){
    //con la palabra new está creando un nuevo objeto, es una instancia del objeto XMLHttp...
    var ajax = new XMLHttpRequest();
    // peparar a ajax para hacer una peticion get
    ajax.open("GET",url);
    ajax.send();
    // pregunta si hay un cambio de estado
    ajax.onreadystatechange = function(){
      // son los estados de ajax de 0 a 4...4 es cuando ya está lista
      if(ajax.readyState == 4){
        // json.parse convierte un string en un json
        resolve(JSON.parse(ajax.responseText));
      }
    }
  })
};
// paso1
// aquí el getJSON para cada elemento de planetas

getJSON(url).then(function(respuesta){
 // console.log(respuesta.results);
 for(var i = 0; i < respuesta.results.length ; i++){
  arregloPlanetas.push(getJSON(respuesta.results[i]));
  arregloPlanetas[i].then(function(planeta){
    console.log(planeta);
    obtenerDatos(planeta);
  });
 }
 // return arregloPlanetas;
});
var obtenerDatos = function(planeta){
 var nombre =planeta.pl_name;
 var telescope=planeta.pl_telescope;
 var masa=planeta.pl_masse;
 var fecha=planeta.pl_disc;
 crear_planeta(nombre,telescope,masa,fecha);
}

var crear_planeta = function(nombre, telescope,masa,fecha){
  //creando elementos
  var contenedorTarjetas = document.getElementById("contenedorTarjetas");
  var divRow = document.createElement("div");
  var col= document.createElement("div");
  var card=document.createElement("div");
  var card_image= document.createElement("div");
  var card_image_imagen = document.createElement("img");
  var card_image_title = document.createElement("span");
  var card_content= document.createElement("div");
  var card_content_parrafo= document.createElement("p");

  // //añadiendo clases
  // contenedorTarjetas.setAttribute("class","center-align")
  // divRow.setAttribute("class","row");
  col.setAttribute("class","col s6 m6");
  card.setAttribute("class","card-panel hoverable");
  card_image.setAttribute("class","card-image");
  card_image.setAttribute("class","contenedor-imagenes");
  card_image_imagen.setAttribute("src","static/img/planeta"+ contador +".jpg");
  card_image_imagen.setAttribute("class","imagenes");
  card_image_title.setAttribute("class","card-title");
  card_content.setAttribute("class","card-content center-align");

  //contenido

  card_image_title.innerHTML = nombre;
  card_content_parrafo.innerHTML = "Fecha de descubrimiento:" + fecha + "<br> Telescope:" + telescope + "<br> Masa:" + masa + "<br> Descubrimiento:" + fecha;

  //acomodo de elementos

  card_content.appendChild(card_content_parrafo);
  card_image.appendChild(card_image_imagen);
  card_image.appendChild(card_image_title);
  card.appendChild(card_image);
  card.appendChild(card_content);
  col.appendChild(card);
  contenedorTarjetas.appendChild(col);
  contador ++;
}
