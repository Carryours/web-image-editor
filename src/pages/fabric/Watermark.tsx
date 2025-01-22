import {FabricImage, Canvas, FabricText} from 'fabric'
import { useEffect, useRef, useState } from 'react';
import { Button, Input } from 'antd';
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
  const [canvasObj, setCanvasObj] = useState<Canvas>()
  const [waterMaskText, setWaterMaskText] = useState<string>('图虫')
  const [textObj, setTextObj] = useState<FabricText>()
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

      const textMask = new FabricText(waterMaskText, {
        fontSize: 20,
        fill: '#ffffff',
        selectable: true,
        hasControls: true,
        left: 10,
        top: 10,
        opacity: 0.8
      })
      setTextObj(textMask)
      img.then((image: FabricImage) => {
        if(image) {
          watermarkCanvas?.add(image)
          watermarkCanvas?.add(textMask!)
          watermarkCanvas.bringObjectToFront(textMask!)
        }
        setCanvasObj(watermarkCanvas)
      })
    })
    return () => {
      watermarkCanvas?.dispose()
    }
  }, [])

  const handleDownload = () => {
    const dataUrl = canvasObj?.toDataURL({
      format: 'jpeg',
      quality: 1,
      multiplier: 4,
      enableRetinaScaling: true,
      left: 0,
      top: 0,
      width: canvasObj?.width,
      height: canvasObj?.height
    })
    const link = document.createElement('a');
    link.href = dataUrl || '';
    link.download = 'test';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const handleText = () => {
    // const textMask = new FabricText(waterMaskText, {
    //   fontSize: 20,
    //   fill: 'red',
    //   selectable: true,
    //   hasControls: true,
    //   left: 10,
    //   top: 10
    // })
    textObj?.set({
      text: waterMaskText
    })
    setTextObj(textObj)
    canvasObj?.renderAndReset();
  }
  return (
    <>
      <div className='flex items-center justify-center'>
        <canvas ref={canvasEl}/>
      </div>
      <div className="mx-auto my-10 w-96">
        <div className="flex items-center justify-center gap-5">
          <Input type="text" value={waterMaskText} onChange={(e) => {
            setWaterMaskText(e.target.value)
          }}/>
          <Button onClick={handleText}>设置水印</Button>
          <Button onClick={handleDownload} type="primary">下载</Button>
        </div>
      </div>
      
    </>
  )
}
export default WaterMark