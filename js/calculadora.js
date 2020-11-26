const maxLength = 5;
let debug = false;
var valors = [];
var valor = 0;
function botons(b) {
  //alert(b.value);
  if (b.value === "cos" || b.value === "sin" || b.value === "tan" || b.value === "cosh" || b.value === "sinh" || b.value === "tanh" || b.value === "√") {
    let text = document.getElementById("calculadora").value;
    let regex = /\d{1,}\.?\d*$/gi
    regex.lastIndex = 0;
    let match = regex.exec(text);
    if (match !== null){
      let val = match?.find(x=>x!==undefined);
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
      if (!match?.find(x=>x!==undefined)?.includes("."))
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
  let reg2 = /[\.+*/-]{2,}/gi
  reg2.lastIndex = 0;
  let matchoperadors = reg2.exec(document.getElementById("calculadora").value);
  if (matchoperadors?.length > 0) {
    let op = matchoperadors?.find(x=>x!==undefined);
    document.getElementById("errors").innerText = JSON.stringify("El operador " + b.value + " no es pot posar aqui ("  + op + ")");
  }
  reg2.lastIndex = 0;
  document.getElementById("calculadora").value = document.getElementById("calculadora").value.replace(reg2, function(match,_index,text) {
    return match[0];
    //return text.replace(match, match[0]);
  });

  let reg3 = /(?<!\d+)\./gi
  document.getElementById("calculadora").value = document.getElementById("calculadora").value.replace(reg3, "0.");
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
    //debugger;
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
    if (match?.find(x=>x!==undefined).includes(event.data))
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
  let reg2 = /[\.+*/-]{2,}/gi
  document.getElementById("calculadora").value = document.getElementById("calculadora").value.replace(reg2, function(match,index,text) {
    return match[0];
    //return text.replace(match, match[0]);
  });

  let reg3 = /(?<!\d+)\./gi
  document.getElementById("calculadora").value = document.getElementById("calculadora").value.replace(reg3, "0.");

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
  let regexpot = /\d{1,}\.?\d*\^\d{1,}\.?\d*/gi
  //matches
  let matchcos = regexcos.exec(text);
  let matchcosh = regexcosh.exec(text);
  let matchsin = regexsin.exec(text);
  let matchsinh = regexsinh.exec(text);
  let matchtan = regextan.exec(text);
  let matchtanh = regextanh.exec(text);
  let matchtaq = regexaq.exec(text);
  let matchtpot = regexpot.exec(text);

  if (matchcos !== null)
  {
    let valorcos = matchcos?.find(x=>x!==undefined)
    if (valorcos != null){
      regex.lastIndex = 0;
      let match = regex.exec(valorcos);
      valor = Math.cos(match?.find(x=>x!==undefined));
      text = text.replace(regexcos, valor);
    
    } 
  }

  if (matchcosh !== null)
  {
    let valorcosh = matchcosh?.find(x=>x!==undefined)
    if (valorcosh != null)
    {
      regex.lastIndex = 0;
      let match = regex.exec(valorcosh);
      valor = Math.cosh(match?.find(x=>x!==undefined));
      text = text.replace(regexcosh, valor);
    }
  } 

  if (matchsin !== null)
  {
    let valorsin = matchsin?.find(x=>x!==undefined)
    if (valorsin != null)
    {
      regex.lastIndex = 0;
      let match = regex.exec(valorsin);
      valor = Math.sin(match?.find(x=>x!==undefined));
      text = text.replace(regexsin, valor);
    }
  } 
  
  if (matchsinh !== null)
  {
    let valorsinh = matchsinh?.find(x=>x!==undefined)
    if (valorsinh != null)
    {
      regex.lastIndex = 0;
      let match = regex.exec(valorsinh);
      valor = Math.sinh(match?.find(x=>x!==undefined));
      text = text.replace(regexsinh, valor);
    }
  } 
  
  if (matchtan !== null)
  {
    let valortan = matchtan?.find(x=>x!==undefined)
    if (valortan != null)
    {
      regex.lastIndex = 0;
      let match = regex.exec(valortan);
      valor = Math.tan(match?.find(x=>x!==undefined));
      text = text.replace(regextan, valor);
    }
  } 

  if (matchtanh !== null)
  {
    let valortanh = matchtanh?.find(x=>x!==undefined)
    if (valortanh != null)
    {
      regex.lastIndex = 0;
      let match = regex.exec(valortanh);
      valor = Math.tanh(match?.find(x=>x!==undefined));
      text = text.replace(regextanh, valor);
    }
  }

  if (matchtaq !== null)
  {
    let valortaq = matchtaq?.find(x=>x!==undefined)
    if (valortaq != null)
    {
      regex.lastIndex = 0;
      let match = regex.exec(valortaq);
      valor = Math.sqrt(match?.find(x=>x!==undefined));
      text = text.replace(regexaq, valor);
    }
  }

  if (matchtpot !== null)
  {
    let valorpot = matchtpot?.find(x=>x!==undefined)
    if (valorpot != null)
    {
      regex.lastIndex = 0;
      //let match = regex.exec(valorpot);
      let num, pot;
      let match;
      let primer = true;
      while ((match = regex.exec(valorpot)) != null) {
        let val = match?.find(x=>x!==undefined);
        if (primer) 
        {
          num = val;
          primer = false;
        }
        else pot = val;
      }
      valor = Math.pow(num, pot);
      text = text.replace(regexpot, valor);
    }
  }

  valor = eval(text);
  return valor;
}

$(document).ready(function() {
    document.getElementById("data").valueAsDate = new Date();
    if(window?.location?.search?.substring(1).split("cientifica=")[1] !== "true")
    {
      $(".especials").hide();
      $(".cientifica").show();
    } else $(".cientifica").hide();
});
