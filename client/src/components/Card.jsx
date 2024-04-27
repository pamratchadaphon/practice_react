import React, { useEffect } from 'react';
import Button from '@mui/material/Button';

const Card = ({ index,variety }) => {
    useEffect(()=>{
        console.log(variety);
    })
    useEffect(()=>{},[variety])
  return (
   
      <div className="bg-white p-4 flex shadow-md mt-4" key={index}>
              <div className="bg-black w-[150px] h-[150px]">dd</div>
              <div className="ml-[30px]">
                <div className="text-xl mb-2">{variety.name}</div>
                <div className="mb-5">{variety.product}</div>
                <div>
                  <Button variant="contained">ดูข้อมูล</Button>
                </div>
              </div>
     </div>
    
  );
};

export default Card;
