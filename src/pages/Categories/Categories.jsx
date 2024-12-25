import axios from "axios"
import { useEffect, useState } from "react";

export default function Categories() {
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
  if (!categories) {
    return <h2 className='text-5xl text-center  animate-pulse'>Loading...</h2>; // Show loading state or a message
}
  return <>
    <section className="flex flex-wrap gap-2 justify-around ">
        
      
        {categories?.map((category)=>(
            <div className="border-2 rounded-lg hover:shadow-2xl transition-all duration-150" key={category._id}>
                <div className="shadow-sm">
                    <img className="w-96 h-96 mb-3 rounded-4" src={category.image} alt=""/>

                </div>
                <h3 className="my-4 text-primary font-semibold  text-center">{category.name}</h3>
            </div>
        ))}
      
    </section>
  
  
  </>
   
}
