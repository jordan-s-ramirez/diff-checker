import React from 'react';

export default function DiffText({backgroundColor, obj, rowSplitArr, hoverIdx, idx, handleSwapText, setHoverIdx}) {
  return(
    <span key={obj.value + idx} 
      style={{
        backgroundColor: idx === hoverIdx? backgroundColor['HOVERED']:backgroundColor[obj.type],
        whiteSpace: "pre-wrap"
      }}
      onClick={()=>{handleSwapText(idx)}}
      onMouseEnter={()=>{setHoverIdx(idx)}}
      onMouseLeave={()=>{setHoverIdx(-1)}}
    >
      {rowSplitArr.map((innerObj, innerIdx)=>{
        if(innerIdx > 0) {
          return(<span key={innerIdx+innerObj}><br/>{innerObj}</span>)
        }
        return(<span key={innerIdx+innerObj}>{innerObj}</span>)
      })}
    </span>
  )
}