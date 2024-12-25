import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import { data } from "react-router-dom";

export const CartContext = createContext(null);
export default function CartProvider({children}){

    const{token}= useContext(UserContext);
    const [cartInfo , setCartInfo] = useState(null)
    async function addProductToCart({productId}) {
      try {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/cart",
            method:"POST",
            headers: {
                token:token
            },
            data: {
                productId: productId
            },
    
          };
          let {data} = await axios.request(options);
          console.log(data);
          if (data.status === "success"){
            getCartProducts()
          }
    
        
      } catch (error) {
        console.log(error);
      }
    }
    async function getCartProducts() {
       try{ 
         const options = {
           url: "https://ecommerce.routemisr.com/api/v1/cart",
           method: "GET",
           headers: {
               token,
           },
         } ; 
         let {data} = await axios.request(options);
         setCartInfo(data);
         
        }catch (error){
         console.log(error);
         

        }
    }
    async function removeProductFromCart({productId}) {
        try {
            const options= {
                url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method:"DELETE",
                headers:{
                    token,
                },
                
            };
            let{data}= await axios.request(options);
            if(data.status === "success"){
                setCartInfo(data)
            }

            
        }   catch (error) {
            console.log(error);
            
        }
        
    }
    async function clearCart() {
      try {
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/cart",
            method:"DELETE",
            headers:{
                token,
            },
        };
        let {data}= await axios.request(options);
        if(data.message === "success"){
            setCartInfo({
                numOfCartItems: 0
            });
        }
      } catch (error) {
        console.log(error);
      }
        
    }
    async function updateProductCount({productId, count}) {
      try {
        const options= {
            url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method: "PUT",
            headers: {
                token
            },
            data:{
                count
            }
        }
        let{data}=await axios.request(options);
        if(data.status === "success"){
            setCartInfo(data)
        }
        
      } catch (error) {
        console.log(error)
        
      }
        
    }
    return (
        <CartContext.Provider value={{addProductToCart, getCartProducts, cartInfo,removeProductFromCart, clearCart, updateProductCount}}>
           {children}
        </CartContext.Provider>
    )
}