import {FabricImage, Canvas} from 'fabric'
import { useEffect, useRef, useState } from 'react';

const imgURL = '/temp.jpg'

const getImageSize = () => {
  return new Promise<{ width: number, height: number }>((resolve) => {
    const img = new Image();
    img.src = imgURL;
    img.onload = () => {
      resolve({
        width: img.width / 2,
        height: img.height / 2
      })
    }
  })
}
const WaterMark = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const watermarkCanvas = new Canvas(canvasEl.current!,
      // {
      //   width: 100,
      //   height: 100
      // },
    )
    if(!canvasEl?.current) {
      return;
    }
    getImageSize().then((size) => {
      watermarkCanvas?.setDimensions({
        width: size.width,
        height: size.height
      })
      let img: Promise<FabricImage> = FabricImage.fromURL(imgURL,{},{
        hasControls: false,
        selectable: false,
        scaleX: 0.5,
        scaleY: 0.5,
      })
      img.then((image: FabricImage) => {
        if(image) {
          watermarkCanvas?.add(image)
        }
      })
    })
    return () => {
      watermarkCanvas?.dispose()
    }
  }, [])
  return (
    <>
      <div className='flex items-center justify-center'>
        <canvas ref={canvasEl}/>
      </div>
    </>
  )
}
export default WaterMark