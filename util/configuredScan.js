import { Diff } from './myersDiff';

function refactorArrays(commonArray, diffArray) {
  // Vars
  let arrA = []
  let maxViewA = 0
  let arrB = []
  let maxViewB = 0
  while(commonArray.length > 0 || diffArray.length > 0) {
    // Handle View A
    if(commonArray.length > 0) {
      if(maxViewA === commonArray[0].aIdxs[0] && maxViewB === commonArray[0].bIdxs[0]) {
        arrA.push({
          "value": commonArray[0].value,
          "type": "COMMON"
        })
        arrB.push({
          "value": commonArray[0].value,
          "type": "COMMON"
        })
        maxViewA = commonArray[0].aIdxs[1]
        maxViewB = commonArray[0].bIdxs[1]
      }
      if(maxViewB === commonArray[0].bIdxs[1] && maxViewA === commonArray[0].aIdxs[1]) {
        commonArray = commonArray.slice(1)
      }
    }
    if(diffArray.length > 0) {
      if(maxViewA === diffArray[0].aIdxs[0] && maxViewB === diffArray[0].bIdxs[0]) {
        arrA.push({
          "value": diffArray[0].value[0],
          "type": "DIFF"
        })
        arrB.push({
          "value": diffArray[0].value[1],
          "type": "DIFF"
        })
        maxViewB = diffArray[0].bIdxs[1]
        maxViewA = diffArray[0].aIdxs[1]
      }
      if(maxViewB === diffArray[0].bIdxs[1] && maxViewA === diffArray[0].aIdxs[1]) {
        diffArray = diffArray.slice(1)
      }
    }
  }
  return [arrA, arrB]
}

function scanText(A,B) {
  const diffScript = new Diff(A, B);
  let commonArray = []
  let d = diffScript.scanCommon((aS, aE, bS, bE) => {
    commonArray.push({
      "value": A.slice(aS, aE),
      "type": "COMMON",
      "aIdxs": [aS, aE],
      "bIdxs": [bS, bE],

    })
  });
  let diffArray = []
  d = diffScript.scanDiff((aS, aE, bS, bE) => {
    diffArray.push({
      "value": [A.slice(aS, aE), B.slice(bS, bE)],
      "type": "DIFF",
      "aIdxs": [aS, aE],
      "bIdxs": [bS, bE],
    })
  });

  return [commonArray, diffArray]
}

export function configuredScan(A, B) {
  // Scan Every LINE? 
  let compData = scanText(A,B)
  // console.log(commonArray, diffArray)
  return refactorArrays(compData[0], compData[1])

}


