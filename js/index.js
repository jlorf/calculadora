const maxLength = 5;
var debug = false;
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
    var text = FerCalculs(text);
  } else if (b.value === 'C') {
    document.getElementById("calculadora").value = '';
    document.getElementById("errors").innerText = '';
  } else if (b.value === '_'){
    var text = document.getElementById("calculadora").value;
    document.getElementById("calculadora").value = text.substr(0, text.length -1);
  }
}

function FerCalculs(text) {
  try {
    var text = document.getElementById("calculadora").value;
    var array = text.split("+").join(",").split("*").join(",").split("/").join(",").split("-").join(",").split("cos").join(",").split("cosh").join(",").split("sin").join(",").split("sinh").join(",").split("tan").join(",").split("tanh");
    array.forEach(function (item) {
      var arr = item.split(',');
      arr.forEach(function (it) {
        valors.push(it);
      });
    });
    //valors = array[0].split(',');
    var comprovat = comprovar_valors();
    var res = ((comprovat === 0) ? CalcularValor(text) : text);
    debugger;
    if (res === Infinity) {
      document.getElementById("errors").innerText = JSON.stringify("El resultat és infinit.");
      res = text;
    }
    else if (res === undefined)
      res = "";
    //var res = eval(text);
    document.getElementById("calculadora").value = res;
    var errors = (res === text) ? document.getElementById("errors").innerText : '';
    document.getElementById("errors").innerText = errors;
    //valors = (res === text) ? []: valors;
    valors = [];
  }
  catch (error) {
    document.getElementById("errors").innerText = JSON.stringify(error);
  }
  return text;
}

function comprovar_valors() {
  if (debug) return 0;
  var text = "";
  var ret = false;
  for(var i = 0; i<valors.length; i++){
    var val = valors[i];
    if (val.length > maxLength) {
      ret = true;
      text += "Operand: " + (i + 1) + " Més de " + maxLength + " caracters.\n";
    }
  }
  document.getElementById("errors").innerText = text;
  if (ret) return 1;
  return 0;
}

function executar_operacions(event, input) {
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("resultat").click();
  }
}

function comprovar_input(event, input) {
  debugger;
}

function CalcularValor(text) {
  var valor = 0;
  //regex
  let regex = /\d+/g
  let regexcos = /cos\(\d+\)/g
  let regexcosh = /cosh\(\d+\)/g
  let regexsin = /sin\(\d+\)/g
  let regexsinh = /sinh\(\d+\)/g
  let regextan = /tan\(\d+\)/g
  let regextanh = /tanh\(\d+\)/g
  //matches
  let matchcos = regexcos.exec(text);
  let matchcosh = regexcosh.exec(text);
  let matchsin = regexsinh.exec(text);
  let matchsinh = regexsinh.exec(text);
  let matchtan = regextan.exec(text);
  let matchtanh = regextanh.exec(text);

  let valorcos = matchcos.values().next();
  if (valorcos != null){
    let match = regex.exec(valorcos.value);
    valor = Math.cos(match.values().next().value);
    text = text.replace(regexcos, valor);
  
  } 
  let valorcosh = matchcosh.values().next();
  if (valorcosh != null)
  {
    let match = regex.exec(valorcosh.value);
    valor = Math.cos(match.values().next().value);
    text = text.replace(regexcos, valor);
  } 

  let valorsin = matchsin.values().next();
  if (valorsin != null)
  {
    let match = regex.exec(valorsin.value);
    valor = Math.cos(match.values().next().value);
    text = text.replace(regexcos, valor);
  } 
  
  let valorsinh = matchsinh.values().next();
  if (valorsinh != null)
  {
    let match = regex.exec(valorsinh.value);
    valor = Math.cos(match.values().next().value);
    text = text.replace(regexcos, valor);
  } 
  
  let valortan = matchtan.values().next();
  if (valortan != null)
  {
    let match = regex.exec(valortan.value);
    valor = Math.cos(match.values().next().value);
    text = text.replace(regexcos, valor);
  } 

  let valortanh = matchtanh.values().next();
  if (valortanh != null)
  {
    let match = regex.exec(valortanh.value);
    valor = Math.cos(match.values().next().value);
    text = text.replace(regexcos, valor);
  } 
  valor = eval(text);
  return valor;
}

$(document).ready(function() {
    document.getElementById("data").valueAsDate = new Date();
});
