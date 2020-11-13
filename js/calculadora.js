const maxLength = 5;
let debug = false;
let valors = [];
let valor = 0;
function botons(b) {
  //alert(b.value);
  if (b.value === "cos" || b.value === "sin" || b.value === "tan" || b.value === "cosh" || b.value === "sinh" || b.value === "tanh" || b.value === "√") {
    let text = document.getElementById("calculadora").value;
    let regex = /\d{1,}\.?\d*$/gi
    regex.lastIndex = 0;
    let match = regex.exec(text);
    if (match !== null){
      let val = match?.values().next().value;
      text = (b.value === "√") ? text.replace(regex, (b.value + val)) : text.replace(regex, (b.value + "(" + val + ")"));
      document.getElementById("calculadora").value = text;
    }
  }
  else if (b.value !== '=' && b.value !== 'C' && b.value !== '_') {
    let input = document.getElementById("calculadora");
    let text = input.value;
    if (b.value === ".")
    {
      let start = input.selectionStart;
      let valor = input.value.substr(0, start);
      let regex = /\d{1,}\.?\d*$/gi
      regex.lastIndex = 0;
      let match = regex.exec(valor);
      if (!match?.values().next().value.includes("."))
      {
        input.value = input.value.substr(0, start) + b.value + input.value.substr(start);
      }
    }
    else 
    {
      if (text != 'Infinity') text += b.value;
      else text = b.value;
      document.getElementById("calculadora").value = text;
    }
  } else if (b.value === '=') {
    let text = document.getElementById("calculadora").value;
    text = FerCalculs(text);
  } else if (b.value === 'C') {
    document.getElementById("calculadora").value = '';
    document.getElementById("errors").innerText = '';
  } else if (b.value === '_'){
    let text = document.getElementById("calculadora").value;
    document.getElementById("calculadora").value = text.substr(0, text.length -1);
  }
  let reg2 = /[.+*/-]{2,}/gi
  document.getElementById("calculadora").value = document.getElementById("calculadora").value.replace(reg2, function(match,index,text) {
    return match[0];
    //return text.replace(match, match[0]);
  });
}

function FerCalculs(text) {
  try {
    let text = document.getElementById("calculadora").value;
    let array = text.toLowerCase().split("+").join(",").split("*").join(",").split("/").join(",").split("-").join(",").split("cos").join(",").split("cosh").join(",").split("sin").join(",").split("sinh").join(",").split("tan").join(",").split("tanh");
    array.forEach(function (item) {
      let arr = item.replace("(", "").replace(")", "").split(',');
      arr.forEach(function (it) {
        valors.push(it);
      });
    });
    //valors = array[0].split(',');
    let comprovat = comprovar_valors();
    let res = ((comprovat === 0) ? CalcularValor(text) : text);
    debugger;
    if (res === Infinity) {
      document.getElementById("errors").innerText = JSON.stringify("El resultat és infinit.");
      res = text;
    }
    else if (res === undefined)
      res = "";
    //let res = eval(text);
    document.getElementById("calculadora").value = res;
    let errors = (res === text) ? document.getElementById("errors").innerText : '';
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
  let text = "";
  let ret = false;
  for(let i = 0; i<valors.length; i++){
    let val = valors[i];
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
  if (event.data === "." || event.data === "/" || event.data === "*" || event.data === "-" || event.data === "+")
  {
    let start = input.selectionStart;
    let valor = input.value.substr(0, start - 1);
    let regex = /\d{1,}\.?\d*$/gi
    regex.lastIndex = 0;
    let match = regex.exec(valor);
    if (match?.values().next().value.includes(event.data))
    {
      input.value = input.value.substr(0, start - 1) + input.value.substr(start);
    }
  } 
  else 
  {
    let reg = /[^0-9.]/gi
    reg.lastIndex = 0;
    let m = reg.exec(event.data ?? "");
    if (m?.length > 0)
    {
      let start = input.selectionStart;
      input.value = input.value.substr(0, start - 1) + input.value.substr(start);
    }
  }
  let reg2 = /[.+*/-]{2,}/gi
  document.getElementById("calculadora").value = document.getElementById("calculadora").value.replace(reg2, function(match,index,text) {
    return match[0];
    //return text.replace(match, match[0]);
  });
}

function CalcularValor(text) {
  let valor = 0;
  //regex
  let regex = /\d+/gi
  let regexcos = /cos\(\d+\)/gi
  let regexcosh = /cosh\(\d+\)/gi
  let regexsin = /sin\(\d+\)/gi
  let regexsinh = /sinh\(\d+\)/gi
  let regextan = /tan\(\d+\)/gi
  let regextanh = /tanh\(\d+\)/gi
  let regexaq = /√\d+/gi
  //matches
  let matchcos = regexcos.exec(text);
  let matchcosh = regexcosh.exec(text);
  let matchsin = regexsin.exec(text);
  let matchsinh = regexsinh.exec(text);
  let matchtan = regextan.exec(text);
  let matchtanh = regextanh.exec(text);
  let matchtaq = regexaq.exec(text);

  if (matchcos !== null)
  {
    let valorcos = matchcos.values().next();
    if (valorcos != null){
      regex.lastIndex = 0;
      let match = regex.exec(valorcos.value);
      valor = Math.cos(match?.values().next().value);
      text = text.replace(regexcos, valor);
    
    } 
  }

  if (matchcosh !== null)
  {
    let valorcosh = matchcosh.values().next();
    if (valorcosh != null)
    {
      regex.lastIndex = 0;
      let match = regex.exec(valorcosh.value);
      valor = Math.cosh(match?.values().next().value);
      text = text.replace(regexcosh, valor);
    }
  } 

  if (matchsin !== null)
  {
    let valorsin = matchsin.values().next();
    if (valorsin != null)
    {
      regex.lastIndex = 0;
      let match = regex.exec(valorsin.value);
      valor = Math.sin(match?.values().next().value);
      text = text.replace(regexsin, valor);
    }
  } 
  
  if (matchsinh !== null)
  {
    let valorsinh = matchsinh.values().next();
    if (valorsinh != null)
    {
      regex.lastIndex = 0;
      let match = regex.exec(valorsinh.value);
      valor = Math.sinh(match?.values().next().value);
      text = text.replace(regexsinh, valor);
    }
  } 
  
  if (matchtan !== null)
  {
    let valortan = matchtan.values().next();
    if (valortan != null)
    {
      regex.lastIndex = 0;
      let match = regex.exec(valortan.value);
      valor = Math.tan(match?.values().next().value);
      text = text.replace(regextan, valor);
    }
  } 

  if (matchtanh !== null)
  {
    let valortanh = matchtanh.values().next();
    if (valortanh != null)
    {
      regex.lastIndex = 0;
      let match = regex.exec(valortanh.value);
      valor = Math.tanh(match?.values().next().value);
      text = text.replace(regextanh, valor);
    }
  }

  if (matchtaq !== null)
  {
    let valortaq = matchtaq.values().next();
    if (valortaq != null)
    {
      regex.lastIndex = 0;
      let match = regex.exec(valortaq.value);
      valor = Math.sqrt(match?.values().next().value);
      text = text.replace(regexaq, valor);
    }
  }

  valor = eval(text);
  return valor;
}

$(document).ready(function() {
    document.getElementById("data").valueAsDate = new Date();
});