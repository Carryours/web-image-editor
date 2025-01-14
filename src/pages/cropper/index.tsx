const imgURL = '@/assets/temp.jpg'
import { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";
import 'cropperjs/dist/cropper.css';

function CropperImg() {
  const imgEl = useRef<HTMLImageElement>(null);
  const [cropping, setCropping] = useState<Boolean>(false)
  let cropper: Cropper | null = null;
  const [cropped] = useState<Boolean>(false)
  const [loaded] = useState<Boolean>(false)
  const [croppedData, setCroppedData] = useState<Cropper.SetCanvasDataOptions>({});
  const [canvasData, setCanvasData] = useState<Cropper.SetCanvasDataOptions>({});
  const [cropBoxData, setCropBoxData] = useState<Cropper.SetCropBoxDataOptions>({});
  useEffect(() => {
    
    // return {
    //   image
    // }
  }, []);
  const update = () => {

  }
  const initCropper = () => {
    if(!imgEl.current) return;
    cropper = new Cropper(imgEl.current, {
      autoCrop: false,
      dragMode: "move",
      background: false,
      ready: () => {
        if (croppedData && cropper) {
          cropper.crop()
            .setData(croppedData)
            .setCanvasData(canvasData)
            .setCropBoxData(cropBoxData);

          setCroppedData({});
          setCanvasData({});
          setCropBoxData({});
        }
      },
      crop({ detail }) {
        if (detail.width > 0 && detail.height > 0 && !cropping) {
          setCropping(true)
        }
      },
    });
    // setCopper(cropperInstance);
  }
  return (
    <>
      <div className="canvas">
        <img
          className="block max-w-full"
          src={imgURL}
          id="cropper"
          ref={imgEl}
          onLoad={initCropper}
          onLoadStart={initCropper}
        ></img>
      </div>
    </>
  );
}

export default CropperImg;
