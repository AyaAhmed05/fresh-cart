import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import axios from 'axios'


export default function Products() {
  const [products, setProducts] = useState(null);
  async function getProducts() {
    const options = {
      url:"https:ecommerce.routemisr.com/api/v1/products",
      method:"GET"
    }
    let {data}= await axios.request(options);
    setProducts(data.data)
  }
  useEffect(()=>{
    getProducts()
  },[])
  if (!products) {
    return <h2 className='text-5xl text-center  animate-pulse'>Loading...</h2>; // Show loading state or a message
}

  return <>
   
    <div className='grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
     {products?.map((product) => (<Card productInfo={product} key={product.id} />))}

    </div>
  </>
    
}
