
// import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from 'react';
import  { Canvas, FabricImage, Rect, TBBox } from 'fabric';
// import reactLogo from '../../assets/react.svg'
import { Button } from 'antd';
// import { type FabricImage as FabricImageType } from 'fabric';

const imgURL = '@/assets/temp.jpg'
const FabricJSCanvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const cropCanvasEl = useRef<HTMLCanvasElement>(null);
  const [imgObject, setImgObject] = useState<FabricImage>()
  const [cropObject, setCropObject] = useState<FabricImage>()
  const [cropRect, setCropRect] = useState<Rect>()
  // const [canvasContainer, setCanvasContainer] = useState<Canvas>()
  const [cropContainer, setCropContainer] = useState<Canvas>()
  const [scale, setScale] = useState(0)
  let left = 0;
  let top = 0
  // const [scale, setScale] = useState(0)
  // const originalImg = new Image();
  // originalImg.src = imgURL;
  // originalImg.onload = () => {
  //   setImgHeight(originalImg.height)
  //   setImgWidth(Math.min(originalImg.width, window.innerWidth))
  // }
  useEffect(() => {
    if(!canvasEl.current || !cropCanvasEl.current) {
      return;
    }
    const cropCanvas: Canvas = new Canvas(cropCanvasEl.current, {
      width: 1200,
      height: 500
    })
    const canvas: Canvas = new Canvas(canvasEl?.current,
      {
        width: 1200,
        height: 500
      }
    );
    // setCanvasContainer(canvas)

    const img: Promise<FabricImage> = FabricImage.fromURL(imgURL,{},{
      hasControls: false,
      selectable: false,
    })
    img.then((container: FabricImage) => {
      const scaleX = canvas.width / container.width;
      const scaleY = canvas.height / container.height;
      let localScale = Math.min(scaleX, scaleY)
      left = (canvas.width - container.width * localScale) / 2;
      top = (canvas.height - container.height * localScale) / 2
      container.scale(localScale);
      container.set({
        left: (canvas.width - container.width * localScale) / 2,
        top: (canvas.height - container.height * localScale) / 2,
      })
      const rect: Rect = new Rect({
        left: 0,
        top: 0,
        width: 200,
        height: 200,
        fill: 'rgba(0,0,0,0.3)',
        selectable: true,
        hasBorders: true,
        hasControls: true,
        lockRotation: true,
        centeredRotation: true
      })
      
      canvas.set({
        left: (canvas.width - container.width * localScale) / 2,
        top: (canvas.height - container.height * localScale) / 2,
        scale
      })
      cropCanvas.set({
        left: (canvas.width - container.width * localScale) / 2,
        top: (canvas.height - container.height * localScale) / 2,
        scale
      })

      // container.set({
      //   width: Math.min(container.width, window.innerWidth),
      //   height: container.height,
      // })
      rect.on('moving', () => {
        const bounding: TBBox = container.getBoundingRect();
        const objectBounding: TBBox = rect.getBoundingRect();
        
        if (objectBounding.left < bounding.left) {
          // rect.set('left', bounding.left);
          return
        } else if (objectBounding.top < bounding.top) {
          // rect.set('top', bounding.top);
          return
        }
        if (objectBounding.left + objectBounding.width > bounding.left + bounding.width) {
          // rect.set('left', bounding.left + bounding.width - objectBounding.width);
          return
        }
        if (objectBounding.top + objectBounding.height > bounding.top + bounding.height) {
          // rect.set('top', bounding.top + bounding.height - objectBounding.height);
          return
        }
        
        rect.setCoords();
        setCropRect(rect);
      });
      canvas.add(container, rect);
      canvas.bringObjectToFront(rect)
      setCropContainer(cropCanvas)
      setImgObject(container);
      setScale(localScale)
      setCropRect(rect);
    })
    
    return () => {
      cropCanvas.dispose()
      canvas.dispose();
    }
  }, []);
  const handleCrop = () => {
    if(imgObject && cropRect) {
      FabricImage.fromURL(imgURL).then(cropItem => {
        console.log(cropRect.getX(), cropRect.getY(), cropRect.width, cropRect.height, scale)
        cropItem.set({
          left,
          top,
          cropX: cropRect.getX() / scale,
          cropY: cropRect.getY()/ scale,
          height: cropRect.height / scale,
          width: cropRect.width / scale,
        })
        cropContainer?.clear()
        cropContainer?.add(cropItem)
        setCropObject(cropItem)
      })
    }
  }
  const handleDownLoad = () => {
    if(cropObject) {
      const dataUrl = cropObject.toDataURL({
        format: 'jpeg',
        quality: 1,
        multiplier: 1,
        enableRetinaScaling: true,
        left: 0,
        top: 0,
      })
      const link = document.createElement('a');
  
      // Set the href attribute to the data URL
      link.href = dataUrl;
      
      // Set the download attribute to the preferred file name
      link.download = 'test';
      
      // Append the link to the body
      document.body.appendChild(link);
      
      // Programmatically click the link to trigger the download
      link.click();
      
      // Remove the link from the document
      document.body.removeChild(link);

    }

  }
  return (
    <>
      <div className="flex flex-col items-center">
        <div>
          <canvas ref={canvasEl}/>
        </div>
        <div className='my-4'>
          <Button onClick={handleCrop}>裁切</Button>
          <Button onClick={handleDownLoad}>下载</Button>
        </div>
        <div>
         <canvas ref={cropCanvasEl}/>
        </div>
      </div>
    </>
  );
};
export default FabricJSCanvas