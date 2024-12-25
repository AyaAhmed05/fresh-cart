import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function Card({productInfo}) {
  const{imageCover, title, price, description,category, ratingsAverage,id}= productInfo;
  let {addProductToCart} = useContext(CartContext);
  return <>
    <div className="card group/card rounded-lg overflow-hidden shadow-lg">
        <div className="relative">
          <img src={imageCover}/>
          <div className="layer group-hover/card:opacity-100 transition-opacity duration-200 bg-opacity-40 opacity-0 gap-4 flex justify-center items-center absolute w-full h-full left-0 top-0 bg-slate-300">
            
            <div onClick={()=>{addProductToCart({productId:id})}} className="icon cursor-pointer w-7 h-7 rounded-full bg-primary hover:bg-green-300 text-white flex justify-center items-center">
                <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link to={`/product/${id}`} className="icon cursor-pointer w-7 h-7 rounded-full bg-primary hover:bg-green-300 text-white flex justify-center items-center">
                <i className="fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className="card-body p-2">
            <header>
                <h3 className="text-md text-primary font-semibold line-clamp-1"><Link to={`/product/${id}`}>{title}</Link></h3>
                <h4 className=" text-grey-500  font-semibold">{category.name}</h4>
            </header>
            <p className="text-gray-400 text-sm line-clamp-2"> {description}</p>
            <div className="flex items-center  justify-between">
                <span>{price} L.E</span>
                <div>
                  <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
                  <span>{ratingsAverage}</span>
                </div>
            </div>
        </div>
    </div>
  
  </>
  
}
