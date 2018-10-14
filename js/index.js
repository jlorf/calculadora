function botons(b){
  //alert(b.value);
  if(b.value !== '=' && b.value !== 'C') {
    var text = document.getElementById("calculadora").value;
    text += b.value;
    document.getElementById("calculadora").value = text;
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
