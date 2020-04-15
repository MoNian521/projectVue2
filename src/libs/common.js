export function formatMoneyData (item){  
  function unitConvert(num) {
    var moneyUnits = ["元", "万元", "亿元", "万亿"]
    var dividend = 10000;
    var curentNum = num;
    //转换数字
    var curentUnit = moneyUnits[0];
    //转换单位
    for (var i = 0; i <4; i++) {
      curentUnit = moneyUnits[i]
      if(strNumSize(curentNum)<5){
      break;
      }
      curentNum = curentNum / dividend
    }
    var m = {num: 0, unit: ""}
    m.num = curentNum.toFixed(2)
    m.unit = curentUnit;
    return m;
  }

  function strNumSize(tempNum){
    var stringNum = tempNum.toString()
    var index = stringNum.indexOf(".")
    var newNum = stringNum;
    if(index!=-1){
    newNum = stringNum.substring(0,index)
    }
    return newNum.length
  }
  if(item&&item!=0){
    var middleValue=item*10000;
    var data=unitConvert(middleValue);
    return data;
  }else{
    return {
      num:0,
      unit:'元'
    };
  }        
}


export function moneyAddComma(s,n){
  n = n > 0 && n <= 20 ? n : 2; 
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
  var l = s.split(".")[0].split("").reverse(), 
  r = s.split(".")[1]; 
  var t = ""; 
  for (let index = 0; index < l.length; index++) {
    t += l[index] + ((index + 1) % 3 == 0 && (index + 1) != l.length ? "," : "");
  } 
  return t.split("").reverse().join("") + "." + r; 
}


export function comparativeData(val,arr){
  if(val&&arr&&arr.length>2){
      let index=arr.findIndex((value,index,arr)=>{
        if(val==value){
          return index;
        }            
      });
      if(index>=1){
        if(val>arr[index-1]){
          return 'red';
        }else if(val<arr[index-1]){
          return 'green';
        }
      }
  }      
}