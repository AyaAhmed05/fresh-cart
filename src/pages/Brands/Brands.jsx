import React, { useEffect, useState } from 'react';

import axios from 'axios';



export default function Brands() {
 

  const [brands, setBrands] = useState(null); 

 
  async function getBrands() {
    const options = {
        url:"https://ecommerce.routemisr.com/api/v1/brands",
        method:"GET",
    }
    let {data} = await axios.request(options);
    setBrands(data.data)

  }

  
  useEffect(() => {
    getBrands();
  }, []); 
  if (!brands) {
    return <h2 className='text-5xl text-center  animate-pulse'>Loading...</h2>; // Show loading state or a message
}
  return (
        <>
        <h2 className='text-5xl  text-primary text-center mt-2 my-12'>All Brands</h2>
    <div className='flex  flex-wrap gap-4 justify-between '>
     
          {brands?.map((brand) => (
              
              <div className=" text-center border-2 hover:border-green-400 shadow-lg transition-all duration-300 rounded-lg">
                    <img src={brand.image} className='w-100 mb-3 rounded-4'  alt={brand.name} />
                    <p className=' text-primary  font-semibold py-2'>{brand.name}</p>
                  </div>
               
          ))}
      
    </div>
        </>
  );
}
