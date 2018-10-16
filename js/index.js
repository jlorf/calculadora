function botons(b){
  //alert(b.value);
  if(b.value !== '=' && b.value !== 'C') {
    var text = document.getElementById("calculadora").value;
    text += b.value;
    document.getElementById("calculadora").value = text;
    comprovar_input(document.getElementById("calculadora"));
    //alert(text);
  } else if(b.value === '=') {
    try{
      var text = document.getElementById("calculadora").value;
      var res = eval(text);
      document.getElementById("calculadora").value = res;
    } catch(error){
        alert(error);
    }
  }else if(b.value === 'C') {
      document.getElementById("calculadora").value = '';
  }
}

function comprovar_input(input){
  var array = [];
  var val = input.value;
  var simbolMes = val.indexOf('+') > 0;
  var simbolMenys = val.indexOf('-') > 0;
  var simbolDiv = val.indexOf('+') > 0;
  var simbolMult = val.indexOf('-') > 0;
  if (simbolMes) {
      array = val.split('+');
  } else if (simbolMenys) {
      array = val.split('+');
  } else if (simbolDiv) {
      array = val.split('/');
  } else if (simbolMult) {
      array = val.split('*');
  }

  if (typeof array != "undefined" && array != null && array.length != null && array.length > 0 && array.length > 1) {
    debugger;
    for (var i=0; i<array.length; i++){
      if(array[i].length >= 5) {
        alert("Operand: " + i+1 + " Més de 5 caracters.");
      }
    }
  }
}
