import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/User.context"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { Link } from "react-router-dom";

export default function Orders() {
    const [orders , setOrders]= useState(null);
    const {token} = useContext(UserContext);
    let {id} = jwtDecode(token);
    async function getUserOrders() {
        try {
          const options = {
            url : `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method:"GET"
          };
          let{data} = await axios.request(options);
          setOrders(data)
        } catch (error) {
          console.log(error);
        }
        
    }
    useEffect(()=>{
        getUserOrders()
    },[])
  return (
    <>
      {orders ? ( 
        <section className="space-y-3">
            {orders.map((order)=><div key={order.id} className="order p-4 border-2 border-gray-500 border-opacity-25 rounded-lg">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="font-semibold text-lg text-gray-600">Order ID</h2>
                    <span className="text-primary font-bold">#{order.id}</span>
                </div>
                <div>
                    {order.isPaid ? (<span className="inline-block px-3 py-1 mx-2 bg-primary  text-white font-semibold rounded-full">Paid</span>):(<span className="inline-block px-3 py-1 mx-2 bg-red-500  text-white font-semibold rounded-full">Not Paid</span>)}
                    {order.isDelivered ?(<span className="inline-block px-3 py-1 bg-blue-500  text-white font-semibold rounded-full"> Delivered</span>):(<span className="inline-block px-3 py-1 bg-blue-500  text-white font-semibold rounded-full"> Not Delievered</span>)}
                    
                </div>
            </header>
            <div className="mt-4 grid md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
               {order.cartItems.map((product)=>( <div key={product._id} className="product-item border-2 border-gray-300 border-opacity-25 p-4 rounded-lg">
                    <img className="w-full" src={product.product.imageCover}/>
                    <Link to={`/product/${product.product.id}`} className="texr-lg text-primary font-semibold line-clamp-2">{product.product.title}</Link>
                    <div className="flex justify-between items-center">
                        <p>
                            <span className="font-bold">Count:</span>{product.count}
                        </p>
                        <span>{product.price}L.E</span>
                    </div>
                    
                </div>
            ))}
            </div>
            <p className="font-semibold mt-2">Your Total Order Price is<span className="mx-1 text-primary font-semibold">{order.totalOrderPrice}</span></p>

        </div>)}
        
    </section>):(<h2 className='text-5xl text-center  animate-pulse'>Loading...</h2>)}
    </>
  )
}
