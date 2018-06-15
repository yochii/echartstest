import africa from 'africa.json'
console.log(africa)

// 实现方法
// @param name { String } 需要返回的属性名
// @param arr { Array } 原始数据
// @return ret { Array } 返回值
function getParamValues(name, arr) {
  var ret = []
  for (var i = 0, len = arr.length; i < len; i++) {
    ret.push(arr[i][name])
  }
  return ret
}

// var ret = getParamValues('age', arr)
// console.log(ret)
