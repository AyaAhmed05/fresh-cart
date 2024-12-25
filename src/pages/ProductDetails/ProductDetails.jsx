import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import ReactImageGallery from "react-image-gallery";


export default function ProductDetails() {
    const [productDetails, setProductDetails]= useState(null);
    let {id} = useParams();
    const {addProductToCart} = useContext(CartContext)
    async function getProductDetails() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method:"GET",
            };

            let{data} = await axios.request(options);
            setProductDetails(data.data);
        }   catch (error) {
              console.log(error);
            
        }
        
    }
    useEffect(()=>{getProductDetails();},[]);
    if (!productDetails) {
        return <h2 className='text-5xl text-center  animate-pulse'>Loading...</h2>; // Show loading state or a message
    }
  return (
    <>
      <section className='grid gap-10 grid-cols-12'>
        <div className='col-span-3'>
            <ReactImageGallery
            showNav={false}
            showPlayButton={false}
            showFullscreenButton={false}
             items={productDetails.images.map((image)=>{
                return {
                    original: image,
                    thumbnail:image
                }
            })} />
        </div>
        <div className='col-span-9 space-y-4'>
            <div>
              <h2 className='text-2xl font-semibold text-gray-600'>{productDetails.title}</h2>
              <h3 className='text-primary font-semibold'>{productDetails.category.name}</h3>
            </div>
            <p className='text-gray-400'>{productDetails.description}</p>
            <div className='flex justify-between items-center'>
                <span>{productDetails.price} L.E</span>
                <div>
                    <i className='fa-solid fa-star mr-2 text-yellow-500'></i>
                    <span>{productDetails.ratingsAverage}</span>
                </div>

            </div>
            <button onClick={()=>{addProductToCart({productId:id})}} className='btn bg-primary hover:bg-primary text-white font-semibold w-full'>Add to Cart</button>
        </div>
      </section>
    
    </>
    
  )
}
