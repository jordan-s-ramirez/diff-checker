import React from 'react';

export default function CommonText({backgroundColor, obj, rowSplitArr, hoverIdx, idx}) {
  return(
    <span key={obj.value + idx} 
      style={{
        backgroundColor: idx === hoverIdx? backgroundColor['HOVERED']:backgroundColor[obj.type],
        whiteSpace: "pre-wrap"
      }}
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