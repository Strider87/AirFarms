import React from 'react'
import useCanvas from './useCanvas'

const Canvas = props => {  

  const { draw, context, ...rest } = props
  //const { context, ...moreConfig } = options
  const canvasRef = useCanvas(draw, {context})

  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas