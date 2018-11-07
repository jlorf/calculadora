const maxLength = 5;
var valors = [];
var valor = 0;
function botons(b) {
  //alert(b.value);
  if (b.value !== '=' && b.value !== 'C' && b.value !== '_') {
    var text = document.getElementById("calculadora").value;
    if (text != 'Infinity') text += b.value;
    else text = b.value;
    document.getElementById("calculadora").value = text;
  } else if (b.value === '=') {
    try {
      debugger;
      var text = document.getElementById("calculadora").value;
      var array = text.split("+").join(",").split("*").join(",").split("/").join(",").split("-");
      array.forEach(function(item){
        var arr = item.split(',');
        arr.forEach(function(it){
          valors.push(it);
        })
      })
      //valors = array[0].split(',');
      var comprovat = comprovar_valors();
      var res = ((comprovat === 0) ? eval(text) : text);
      //var res = eval(text);
      document.getElementById("calculadora").value = res;
      var errors = (res === text) ? document.getElementById("errors").innerText: '';
      document.getElementById("errors").innerText = errors;
      //valors = (res === text) ? []: valors;
      valors = [];
    } catch (error) {
      document.getElementById("errors").innerText = JSON.stringify(error);
    }
  } else if (b.value === 'C') {
    document.getElementById("calculadora").value = '';
    document.getElementById("errors").innerText = '';
  } else if (b.value === '_'){
    var text = document.getElementById("calculadora").value;
    document.getElementById("calculadora").value = text.substr(0, text.length -1);
  }
}

function comprovar_valors() {
  var res = [];
  for(var i = 0; i<valors.length; i++){
    var val = valors[i];
    if (val.length > maxLength) {
      res.push(i);
    }
  }
  if (res.length > 0) {
    var text = "";
    res.forEach(function(item){
      text += "Operand: " + (item + 1) + " Més de " + maxLength + " caracters.\n";
    })
    debugger;
    document.getElementById("errors").innerText = text;
    return 1;
  } else return 0;
}

function executar_operacions(event, input) {
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("resultat").click();
  }
}

$(document).ready(function() {
    document.getElementById("data").valueAsDate = new Date();
});
