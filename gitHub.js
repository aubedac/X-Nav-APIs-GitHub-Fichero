$(document).ready(function() {
  $('#form button').click(getToken);
});

var repoHTML = "<input type='text' name='user' value='aubedac' " +
    "id='user' size='10' />" +
    "<input type='text' name='repo' value='GitHub-API' " +
    "id='repo' size='10' />" +
    "<button type='button'>Datos repo</button>" +
    "<div id='repodata'/>";

var gh;

function getToken() {
  var token = $('#token').val();
  gh = new Github({
   token : token,
   auth : "oauth"
  });
  $('#repoform').html(repoHTML);
  $("#form button").click(getRepo);
}

var repo;

function getRepo() {
  var repoName = $('#repoform #repo').val();
  var user = $('#repoform #user').val();
  repo = gh.getRepo(user, repoName);
  repo.show(showRepo);
}

function showRepo(error, repo) {
  var data = $('#repodata');
  if (error) {
    data.html("<p>Error code: " + error.error + "</p>");
  } else {
    data.html("<p>Datos Repo:</p>" +
    "<ul><li>Nombre: " + repo.full_name + "</li>" + "<li>Descripcion: " + repo.description + "</li>" + "<li>Creado el: " + repo.created_at + "</li>" + "</ul>"
    + "<button type='button' id='write'> Escribe Archivo con hora actual en Master</button>" + "<div id='writePlace'/>" );
  }
  $('#repodata #write').click(write);
}

function write() {
  var date = new Date().toString();
  repo.write('master', 'datafile', date, "Probando funcion", function(e) {
    console.log(e);
  });
  $("#repodata #writePlace").html("<button type='button' id='read'>" +
     "Leer Archivo</button>" +
     "<div id='readPlace' />");
  $("#repodata #read").click(read);
}

function read() {
  repo.read('master', 'datafile', function(e, data) {
    console.log (e, data);
    $("#readPlace").html("<p>Contenido:</p><p>" + data + "</p>");
  });
}
