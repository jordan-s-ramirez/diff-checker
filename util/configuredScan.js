import { diffWords } from "diff";

export function configuredScan(A, B) {
  let res = diffWords(A, B)
  let arrA = []
  let arrB = []
  let tempValA = "" 
  let tempValB = ""
  let commonItem
  for(let i in res) {
    if(!res[i].hasOwnProperty('added') && !res[i].hasOwnProperty('removed') && res[i].value.trim().length > 1) {
      // Dump Diff Values
      if(tempValA !== "" || tempValB !== "") {
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
      if(!res[i].hasOwnProperty('added') && !res[i].hasOwnProperty('removed')) {
        tempValB += res[i].value 
        tempValA += res[i].value
      }
      else if(res[i].removed) {
        tempValA += res[i].value
      }
      else if(res[i].added) {
        tempValB += res[i].value
      }
    }
  }
  // Final Dump
  if(tempValA !== "" || tempValB !== "") {
    arrA.push({
      "value": tempValA,
      "type": "DIFF",
    })
    arrB.push({
      "value": tempValB,
      "type": "DIFF",
    })
  }

  // console.log(res)
  return [arrA, arrB]
}
