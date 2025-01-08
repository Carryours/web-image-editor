
// import { useNavigate } from "react-router";
import { useEffect, useRef } from 'react';
import  { Canvas, FabricImage } from 'fabric';
import reactLogo from '../../assets/react.svg'
// import { type FabricImage as FabricImageType } from 'fabric';
const FabricJSCanvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasEl.current) return;
    const canvas = new Canvas(canvasEl.current);
    // const img = fabric.FabricImage.fromURL(reactLogo);
    const img = FabricImage.fromURL('https://p3-sign.toutiaoimg.com/tos-cn-i-axegupay5k/dec58baca8ca4c609294026d1504aa9e~tplv-tt-origin-web:gif.jpeg?_iz=58558&from=article.pc_detail&lk3s=953192f4&x-expires=1736838466&x-signature=vQgyQgrhHyeS3rInO8HorKoWbtg%3D') as any;
    img.then((data: FabricImage) => {
      canvas.add(data)
    })
    return () => {
      // updateCanvasContext(null);
      canvas.dispose();
    }
  }, []);
  return (
    <>
      <img src={ reactLogo }></img>
      <canvas width="800" height="600" ref={canvasEl}/>
    </>
  );
};
export default FabricJSCanvas