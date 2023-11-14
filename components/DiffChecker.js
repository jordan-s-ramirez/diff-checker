import React from 'react';
import { configuredScan } from '../util/configuredScan';
import { Grid, TextField, Stack } from '@mui/material';
import CommonText from './CommonText';
import DiffText from './DiffText';

export default function DiffChecker() {
  const [textA, setTextA] = React.useState("")
  const [textB, setTextB] = React.useState("")
  const [resultA, setResultA] = React.useState([])
  const [resultB, setResultB] = React.useState([])
  const [showResults, setShowResults] = React.useState(false)
  const [hoverIdx, setHoverIdx] = React.useState(-1)

  const pStyle = {
    padding: '1%',
    borderRadius:'5px',
    border:'solid 2px gray',
  }
  const backgroundColor = {
    "COMMON": "rbga(0,0,0,0)",
    "DIFF": "yellow",
    "SWAPPED": "rgba(50, 168, 82,0.8)",
    "HOVERED": "orange"
  }

  function handleCompareText() {
    if(!showResults) {
      let res = configuredScan(textA,textB)
      setShowResults(true)
      setResultA(res[0])
      setResultB(res[1])
    }
    else {
      setShowResults(false)
    }
  }

  function handleSwapText(idx) {
    if(resultA[idx].type !== "COMMON") {
      let tempVal = resultB[idx].value
      resultB[idx].value = resultA[idx].value
      resultA[idx].value = tempVal

      if(resultA[idx].type === "DIFF") {
        resultB[idx].type = "SWAPPED"
        resultA[idx].type = "SWAPPED"
      }
      else {
        resultB[idx].type = "DIFF"
        resultA[idx].type = "DIFF"
      }

      setHoverIdx(-1)
      setResultA([...resultA])
      setResultB([...resultB])
    }
  }

  function handleCopyText(type) {
    let textToCopy = ""
    // Text 1
    if(type) {
      for(let i in resultA) {
        textToCopy += resultA[i].value
      }
    }
    // Text 2
    else {
      for(let i in resultB) {
        textToCopy += resultB[i].value
      }
    }
    // Copy text to Clipboard
    navigator.clipboard.writeText(textToCopy)
  }

  return(
    <>
      <Stack direction="row" spacing={1} sx={{marginBottom:'1vh'}}>
        <h3 style={{margin:0}}>Difference Checker</h3>
        <button onClick={()=>{handleCompareText()}}>{showResults? "Reset": "Compare"}</button>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
          <button onClick={() => {handleCopyText(true)}}>Copy Text 1</button>
          <button onClick={() => {handleCopyText(false)}}>Copy Text 2</button>
      </Stack>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          {showResults === true? (
            <p style={pStyle}>
              {resultA.map((obj,idx)=>{
                let rowSplitArr = obj.value.split("\n")
                if(obj.type === "COMMON") {
                  return (
                    <CommonText key={obj.value+idx} backgroundColor={backgroundColor} hoverIdx={hoverIdx} rowSplitArr={rowSplitArr} obj={obj} idx={idx}/>
                  )
                }
                return (
                  <DiffText 
                    key={obj.value+idx} 
                    backgroundColor={backgroundColor} 
                    hoverIdx={hoverIdx} 
                    rowSplitArr={rowSplitArr} 
                    obj={obj} idx={idx} 
                    handleSwapText={handleSwapText}
                    setHoverIdx={setHoverIdx}
                  />
                )
              })}
            </p>
          ):(<TextField sx={{marginTop:'1vh'}} fullWidth multiline onChange={(e)=>{setTextA(e.target.value)}} value={textA}/>)}
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          {showResults === true? (
            <p style={pStyle}>
              {resultB.map((obj,idx)=>{
                let rowSplitArr = obj.value.split("\n")
                if(obj.type === "COMMON") {
                  return (
                    <CommonText key={obj.value+idx} backgroundColor={backgroundColor} hoverIdx={hoverIdx} rowSplitArr={rowSplitArr} obj={obj} idx={idx}/>
                  )
                }
                return (
                  <DiffText 
                    key={obj.value+idx} 
                    backgroundColor={backgroundColor} 
                    hoverIdx={hoverIdx} 
                    rowSplitArr={rowSplitArr} 
                    obj={obj} idx={idx} 
                    handleSwapText={handleSwapText}
                    setHoverIdx={setHoverIdx}
                  />
                )
              })}
            </p>
          ):(<TextField sx={{marginTop:'1vh'}} fullWidth multiline onChange={(e)=>{setTextB(e.target.value)}} value={textB}/>)}
        </Grid>
      </Grid>
    </>
  )
}