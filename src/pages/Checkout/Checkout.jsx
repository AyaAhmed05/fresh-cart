import { useFormik } from "formik"
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const {cartInfo}= useContext(CartContext);
    const navigate = useNavigate();
    const {token}= useContext(UserContext);
    const [paymentMethod, setPaymentMethod]=useState(null)
    async function createCashOrder(values) {
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method:"POST",
                headers:{
                    token,
                },
                data:values
            };
            let{data} = await axios.request(options);
            if(data.status ==="success"){
                setTimeout(()=>{
                    navigate("/allorders")
                }, 2000)
            }
        } catch (error) {
          console.log(error);
        }
    }
    async function handleOnlinePayment(values) {
        try {
          const  options = {
                url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method:"POST",
                headers:{
                    token
                },
                data: values

            }
            let{data}= await axios.request(options)
            if (data.status === "success"){
                setTimeout(()=>{
                    location.href = data.session.url

                },2000)
            }
        } catch (error) {
          console.log(error); 
        }
        
    }

    const formik = useFormik({
        initialValues: {
            shippingAddress : {
                details:"",
                phone:"",
                city:"",
            },
        },
        onSubmit: (values)=>{
            if(paymentMethod==="cash") createCashOrder(values);
            else handleOnlinePayment(values)
        },
    });
  return (
    <>
      <section>
        <h1 className="text-xl mb-4 text-gray-600 font-semibold">Shipping Address</h1>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
            <div className="city">
                <input type="text" className="form-control w-full" placeholder="City" value={formik.values.shippingAddress.city} onChange={formik.handleChange}
                name="shippingAddress.city"/>
            </div>
            <div className="phone">
                <input type="tel" className="form-control w-full" placeholder='Phone' value={formik.values.shippingAddress.phone} onChange={formik.handleChange}
                name="shippingAddress.phone"/>
            </div>
            <div className="details">
                <textarea className="form-control w-full" placeholder="Details" value={formik.values.shippingAddress.details} onChange={formik.handleChange}
                name="shippingAddress.details"/>
            </div>
            <button onClick={()=>{setPaymentMethod("cash")}} type="submit" className="btn mr-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold">Cash Payment</button>
            <button onClick={()=>{setPaymentMethod("Online")}} type="submit" className="btn bg-green-500 hover:bg-green-600 text-white font-semibold">Online Payment</button>
        </form>
      </section>
    
    </>
  )
}
