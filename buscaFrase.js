var url = 'http://kbrown.xyz:5000/'


// Esta funcion crea el objeto que se va a comunicar con el server
function createCORSRequest(method, url){
  var xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr){
    xhr.open(method, url, true);
  } else if ( typeof XDomainRequest != 'undefined'){
    // Este es para IE
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // COR no es soportado por este navegador
    xhr = null;
  }
  return xhr;
}


function ponFrase(categoria){
  if (!categoria){
    categoria=''
  }
  var xhr = createCORSRequest('GET', url+categoria);
  if(!xhr){
    throw new Error('CORS no esta soportado por el navegador');
  };
  xhr.onload = function(){
    var responseText = xhr.responseText;
    responseJSON = JSON.parse(responseText);

    frase = responseJSON['frase'];
    autor = responseJSON['autor'];
    tema = responseJSON['tema'];

    console.log(responseJSON);
    console.log( frase.length);

    $(".mb-wrap blockquote p").html(frase);
    $(".mb-attribution p.mb-author").html(autor);
    if ( frase.length <= 140){
      $(".mb-attribution a").replaceWith('<a class = "twitter" href="https://twitter.com/intent/tweet?text='+ frase +'"><i class="fa fa-twitter-square fa-3x" aria-hidden="true"></i></a>')
    }
  };
  xhr.send();
}

$(document).ready(function() {
  ponFrase('es');
  $('#bola').on("click", function(){
    ponFrase('es');
  })
});
