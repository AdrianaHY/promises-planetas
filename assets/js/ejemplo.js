var url = "data/earth-like-results.json";
var arregloPlanetas = [];
var contador = 1;

fetch(url).then(function(response){
  //json hace la función de JSON.parse
  return response.json();
}).then(function(respuesta){
  for(var i = 0; i < respuesta.results.length ; i++){
    arregloPlanetas.push(fetch(respuesta.results[i]));
    arregloPlanetas[i].then(function(respuestaDos){
      return respuestaDos.json();
    }).then(function(planeta){
      obtenerDatos(planeta);
    });
   }
   // return arregloPlanetas;
})
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
