
// import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from 'react';
import  { Canvas, FabricImage, Rect } from 'fabric';
import reactLogo from '../../assets/react.svg'
import { Button } from 'antd';
// import { type FabricImage as FabricImageType } from 'fabric';

const imgURL = 'https://p3-sign.toutiaoimg.com/tos-cn-i-axegupay5k/dec58baca8ca4c609294026d1504aa9e~tplv-tt-origin-web:gif.jpeg?_iz=58558&from=article.pc_detail&lk3s=953192f4&x-expires=1736838466&x-signature=vQgyQgrhHyeS3rInO8HorKoWbtg%3D';
const FabricJSCanvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [cropImgURl, setCropImgURl] = useState()
  const [imgObject, setImgObject] = useState<FabricImage>()
  const [cropRect, setCropRect] = useState<Rect>()
  useEffect(() => {
    const rect = new Rect({
      left: 50,
      top: 50,
      width: 100,
      height: 100,
      fill: 'rgba(0,0,0,0.3)',
      selectable: true,
      hasBorders: true,
      hasControls: true,
      lockRotation: true,
      centeredRotation: true
    })
    if (!canvasEl.current) return;
    const canvas = new Canvas(canvasEl.current);
    // const img = fabric.FabricImage.fromURL(reactLogo);
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
      setCropRect(rect);
      canvas.add(container, rect);
      canvas.bringObjectToFront(rect)

      rect.on('moving', () => {
        const bounding = container.getBoundingRect();
        const objectBounding = rect.getBoundingRect();
  
        if (objectBounding.left < bounding.left) {
          rect.set('left', bounding.left);
        }
        if (objectBounding.top < bounding.top) {
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
      });
      // rect.on('modified', () => {
      //   const { left, top, width, height } = rect;
          
      //   img.set({
      //     cropX: left - img.left!,
      //     cropY: top - img.top!,
      //     width: width,
      //     height: height,
      //     dirty: true,
      //   });
  
      //   canvas.renderAll();
      // });
    })
    return () => {
      // updateCanvasContext(null);
      canvas.dispose();
    }
  }, []);
  const handleCrop = () => {
    if(imgObject && cropRect) {
      // console.log(imgObject, cropRect)
      const cropImg = FabricImage.fromURL(imgURL, {}, {
        // cropX: cropRect.getX(),
        // cropY: cropRect.getY(),
        // width: cropRect.width,
        // height: cropRect.height
        width: 100,
        height: 100
      })
      cropImg.then(data => {
        setCropImgURl(data.getSrc())
      })
      // setCropImg(dataURL)
      // setCropImgURl(dataURL)
    }
  }
  return (
    <>
      <img src={ reactLogo }></img>
      <img src={cropImgURl}></img>
      <canvas width="626" height="352" ref={canvasEl}/>
      <Button onClick={handleCrop}>裁切</Button>
    </>
  );
};
export default FabricJSCanvas