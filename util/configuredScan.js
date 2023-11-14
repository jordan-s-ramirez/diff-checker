import { diffWords } from "diff";

export function configuredScan(A, B) {
  let res = diffWords(A, B)
  let diffArray = []
  let arrA = []
  let arrB = []
  let tempValA = "" 
  let tempValB = ""
  let commonItem
  for(let i in res) {
    if(!res[i].hasOwnProperty('added') && !res[i].hasOwnProperty('removed') && res[i].value.trim().length > 1) {
      // Dump Diff Values
      if(diffArray.length > 0) {
        for(let j in diffArray) {
          if(!diffArray[j].hasOwnProperty('added') && !diffArray[j].hasOwnProperty('removed')) {
            tempValB += diffArray[j].value 
            tempValA += diffArray[j].value
          }
          else if(diffArray[j].removed) {
            tempValA += diffArray[j].value
          }
          else if(diffArray[j].added) {
            tempValB += diffArray[j].value
          }
        }
        arrA.push({
          "value": tempValA,
          "type": "DIFF",
        })
        arrB.push({
          "value": tempValB,
          "type": "DIFF",
        })
        tempValA = ""
        tempValB = ""
        diffArray = []
      }
      // Dump Common
      commonItem = {
        "value": res[i].value,
        "type": "COMMON",
      }
      arrA.push(commonItem)
      arrB.push(commonItem)
    }
    else {
      diffArray.push(res[i])
    }
  }
  if(diffArray.length > 0) {
    for(let j in diffArray) {
      if(!diffArray[j].hasOwnProperty('added') && !diffArray[j].hasOwnProperty('removed')) {
        tempValB += diffArray[j].value
        tempValA += diffArray[j].value
      }
      else if(diffArray[j].removed) {
        tempValA += diffArray[j].value
      }
      else if(diffArray[j].added) {
        tempValB += diffArray[j].value
      }
    }
    arrA.push({
      "value": tempValA,
      "type": "DIFF",
    })
    arrB.push({
      "value": tempValB,
      "type": "DIFF",
    })
  }

  console.log(res)
  return [arrA, arrB]
}


