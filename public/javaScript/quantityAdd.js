var quantityCurrent = parseInt(document.getElementById('quantity').value);
function add(){
  quantityCurrent++;
  document.getElementById('quantity').value = quantityCurrent;
}
function sub(){
  if(quantityCurrent > 0){
    quantityCurrent--;
    document.getElementById('quantity').value = quantityCurrent;
  }
}
document.getElementById('add').addEventListener("click",add);
document.getElementById('sub').addEventListener("click",sub);
