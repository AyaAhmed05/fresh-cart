import axios from "axios"
import { useEffect, useState } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
export default function CategorySlider() {
  const [categories, setCategories]= useState(null)  
  async function getCategories() {
    const options = {
        url:"https://ecommerce.routemisr.com/api/v1/categories",
        method:"GET",
    }
    let {data} = await axios.request(options);
    setCategories(data.data)

  }  

  useEffect(()=>{
    getCategories()
  },[])
    
  return <>
    <section className="my-8">
        <h2 className="text-lg text-primary font-semibold mb-6">Shop Popular Categories</h2>
      <Swiper slidesPerView={6} loop={true}>
        {categories?.map((category)=>(
            <SwiperSlide key={category._id}>
                <div className="h-64">
                    <img className="w-full h-full object-cover" src={category.image} alt=""/>
                </div>
                <h3 className="mt-2 font-semibold text-slate-600">{category.name}</h3>
            </SwiperSlide>
        ))}
      </Swiper>
    </section>
  
  
  </>
   
}
