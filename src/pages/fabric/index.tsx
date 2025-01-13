
// import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from 'react';
import  { Canvas, FabricImage, Rect } from 'fabric';
import reactLogo from '../../assets/react.svg'
import { Button } from 'antd';
// import { type FabricImage as FabricImageType } from 'fabric';

const imgURL = 'https://p3-sign.toutiaoimg.com/tos-cn-i-axegupay5k/dec58baca8ca4c609294026d1504aa9e~tplv-tt-origin-web:gif.jpeg?_iz=58558&from=article.pc_detail&lk3s=953192f4&x-expires=1736838466&x-signature=vQgyQgrhHyeS3rInO8HorKoWbtg%3D';
const FabricJSCanvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const cropCanvasEl = useRef<HTMLCanvasElement>(null);

  const [cropImgURl, setCropImgURl] = useState()
  const [imgObject, setImgObject] = useState<FabricImage>()
  const [cropRect, setCropRect] = useState<Rect>()
  const [canvasContainer, setCanvasContainer] = useState<Canvas>()
  const [cropContainer, setCropContainer] = useState<Canvas>()

  useEffect(() => {
    const rect = new Rect({
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
    if(!canvasEl.current || !cropCanvasEl.current) {
      return;
    }

    const cropCanvas = new Canvas(cropCanvasEl.current)
    setCropContainer(cropCanvas)
    const canvas = new Canvas(canvasEl?.current);
    setCanvasContainer(canvas)

    const img = FabricImage.fromURL(imgURL,{},{
      hasControls: false,
      selectable: false
    }) as any;
    img.then((container: FabricImage) => {
      // canvas.setActiveObject(img);
      // img.set({
      //   selectable: false
      // })
      setImgObject(container);
      canvas.add(container, rect);
      canvas.bringObjectToFront(rect)
      
      rect.on('moving', () => {
        const bounding = container.getBoundingRect();
        const objectBounding = rect.getBoundingRect();
        
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
    })
    return () => {
      cropCanvas.dispose()
      canvas.dispose();
    }
  }, []);
  const handleCrop = () => {
    if(imgObject && cropRect) {
      FabricImage.fromURL(imgURL).then(cropItem => {
        cropItem.set({
          cropX: cropRect.getX(),
          cropY: cropRect.getY(),
          height: cropRect.height,
          width: cropRect.width
        })
        cropContainer?.add(cropItem)
      })
    }
  }
  return (
    <>
      <img src={cropImgURl}></img>
      <div className="flex items-center">
        <div>
          <canvas width="626" height="352" ref={canvasEl}/>
        </div>
        <div className='mx-4'>
          <Button onClick={handleCrop}>裁切</Button>
        </div>
        <div>
         <canvas width="626" height="352" ref={cropCanvasEl}/>
        </div>
      </div>
    </>
  );
};
export default FabricJSCanvas