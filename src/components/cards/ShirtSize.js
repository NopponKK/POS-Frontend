import { Button } from 'antd';
import React, { useState } from 'react';

const ShirtSize = (props) => {
  // State to manage the image source
  const [imageSrc, setImageSrc] = useState('https://res.cloudinary.com/trueshopping/image/upload/f_webp,q_auto/v1682409807/product/producr-master/xtoizobgqchkb0yubluf.jpg');

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
         handleButtonClick('https://res.cloudinary.com/trueshopping/image/upload/f_webp,q_auto/v1682409807/product/producr-master/xtoizobgqchkb0yubluf.jpg', 'ผู้ชาย')}>ผู้ชาย
      </Button>
      <Button onClick={() => handleButtonClick('https://numsiri.com/upload-img/Default/%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%AA%E0%B8%B5%E0%B8%9C%E0%B9%89%E0%B8%B2_%E0%B8%9E%E0%B8%B2%E0%B8%AA_6/%E0%B9%84%E0%B8%8B%E0%B8%AA%E0%B9%8C%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD_%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%A2%E0%B8%B7%E0%B8%94%E0%B8%AB%E0%B8%8D%E0%B8%B4%E0%B8%87.jpg', 'ผู้หญิง')}>ผู้หญิง
      </Button>
    </div>
  );
};

export default ShirtSize;
