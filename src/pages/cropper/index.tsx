const imgURL = '/temp.jpg'
import { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";
import 'cropperjs/dist/cropper.css';
import './index.css'
import { Button } from "antd";
interface CropData {
  cropping?: boolean
  cropped?: boolean;
  url?: string;
  previousUrl?: string;
  loaded?: boolean
}
function CropperImg() {
  const imgEl = useRef<HTMLImageElement>(null);
  const [cropData, setCropData] = useState<CropData>({
    cropped: false,
    cropping: false,
    loaded: false,
    previousUrl: '',
    url: '',
  })
  // let cropper: Cropper | null = null;
  const [cropper, setCropper] = useState<Cropper | null>(null);

  // const [loaded] = useState<Boolean>(false)
  const [croppedData, setCroppedData] = useState<Cropper.SetCanvasDataOptions>({});
  const [canvasData, setCanvasData] = useState<Cropper.SetCanvasDataOptions>({});
  const [cropBoxData, setCropBoxData] = useState<Cropper.SetCropBoxDataOptions>({});
  useEffect(() => {
    // return {
    //   image
    // }
  }, []);
  const initCropper = () => {
    if(!imgEl.current) return;
    const cropperInstance = new Cropper(imgEl.current, {
      zoomable: false,
      autoCrop: false,
      dragMode: "none",
      background: false,
      ready: () => {
        if (croppedData) {
          cropper?.crop()
            .setData(croppedData)
            .setCanvasData(canvasData)
            .setCropBoxData(cropBoxData);
          
          setCroppedData({});
          setCanvasData({});
          setCropBoxData({});
        }
      },
      crop({ detail }) {
        if (detail.width > 0 && detail.height > 0 && !cropData.cropping) {
          setCropData({
            cropping: true
          })
        }
      },
    });
    setCropper(cropperInstance);
  }

  const startCrop = () => {
    cropper?.setDragMode('crop')
  }
  const handleCrop = () => {
      if (cropData.cropping && cropper) {
      //  croppedData = cropper.getData();
      setCroppedData(cropper.getData())
      setCanvasData(cropper.getCanvasData())
      setCropBoxData(cropper.getCropBoxData())
      setCropData({
        cropped: true,
        cropping: false,
        previousUrl: `${imgURL}`,
        url: cropper.getCroppedCanvas({
          fillColor: '#fff',
        }).toDataURL(),
      })
        // this.update({
        //   cropped: true,
        //   cropping: false,
        //   previousUrl: data.url,
        //   url: cropper.getCroppedCanvas(data.type === 'image/png' ? {} : {
        //     fillColor: '#fff',
        //   }).toDataURL(data.type),
        // });
        // this.stop();
      }
  };

  const handleDownload = () => {
    if (cropData.url) {
      const link = document.createElement('a');
      link.download = 'cropped.png';
      link.href = cropData.url;
      link.click();
    }
  }
  return (
    <>
      <div className="editor">
        <div className="canvas">
          <img
            className="block"
            src={imgURL}
            id="cropper"
            ref={imgEl}
            onLoad={initCropper}
            onLoadStart={initCropper}
          ></img>
        </div>
        <div>
          <Button onClick={startCrop}>开始</Button>
          <Button onClick={handleCrop}>完成</Button>
          <Button onClick={handleDownload}>下载</Button>
        </div>

        <img src={cropData.url}></img>
        {/* <div className="flex items-center justify-center toolbar">
          <span onClick={startCrop} className="fa fa-crop" />
          <span onClick={handleCrop} className="fa fa-crop" />
          <a
            title="Download"
            href={cropData.url}
          ><span className="fa fa-download" /></a>
        </div> */}
      </div>
      
    </>
  );
}

export default CropperImg;
