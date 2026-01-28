import { Button } from 'antd';
import React, { useState } from 'react';

const ShirtSize = (props) => {
  // State to manage the image source
  const [imageSrc, setImageSrc] = useState('https://tramanao.com/static/media/product/2023/04/19/15/5391/20230426-100332.ecom_%E0%B8%99%E0%B8%A8%E0%B8%8D.%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B4%E0%B9%89%E0%B8%95%E0%B9%81%E0%B8%82%E0%B8%99%E0%B8%A2%E0%B8%B2%E0%B8%A7%E0%B8%9C%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B8%A7%E0%B8%B4%E0%B8%A5%E0%B8%AA%E0%B8%B5%E0%B8%82%E0%B8%B2%E0%B8%A7off-white_%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2.jpg');

  // Function to handle button clicks and change the image source
  const handleButtonClick = (newImage, buttonText) => {
    setImageSrc(newImage);
    console.log(props);
  };

  return (
    <div>
      {/* Image component with dynamic source */}
      <img src={imageSrc} alt="Shirt" width={200} height={200}/>

      {/* Buttons to change the image */}
      <Button onClick={() =>
         handleButtonClick('https://numsiri.com/upload-img/Default/%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%AA%E0%B8%B5%E0%B8%9C%E0%B9%89%E0%B8%B2_%E0%B8%9E%E0%B8%B2%E0%B8%AA_6/%E0%B9%84%E0%B8%8B%E0%B8%AA%E0%B9%8C%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD-%E0%B8%84%E0%B8%AD%E0%B8%9B%E0%B8%81%E0%B8%8A%E0%B8%B2%E0%B8%A2.jpg', 'ผู้ชาย')}>ผู้ชาย
      </Button>
      <Button onClick={() => handleButtonClick('https://numsiri.com/upload-img/Default/%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%AA%E0%B8%B5%E0%B8%9C%E0%B9%89%E0%B8%B2_%E0%B8%9E%E0%B8%B2%E0%B8%AA_6/%E0%B9%84%E0%B8%8B%E0%B8%AA%E0%B9%8C%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD_%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%A2%E0%B8%B7%E0%B8%94%E0%B8%AB%E0%B8%8D%E0%B8%B4%E0%B8%87.jpg', 'ผู้หญิง')}>ผู้หญิง
      </Button>
    </div>
  );
};

export default ShirtSize;
