import { useContext, useEffect } from "react"
import { CartContext } from "../../context/Cart.context"
import CartItem from "../../components/CartItem/CartItem"
import { Link } from "react-router-dom"

export default function Cart() {
  let {getCartProducts , cartInfo, clearCart}  = useContext(CartContext)
  useEffect(()=>{
    getCartProducts()
  },[])  
  return (<>
    {cartInfo === null ? (
      <h2 className='text-5xl text-center  animate-pulse'>Loading</h2>
    ) : (
      <section>
        <div className="mt-6 bg-gray-100 p-5 rounded-md shadow flex justify-center items-center flex-col gap-3">
          <h2 className="text-2xl text-slate-600 pl-4 font-semibold">
            Your Shopping Cart
          </h2>
        </div>
  
        {cartInfo.numOfCartItems === 0 ? (<>
          <h2 className="font-semibold text-xl text-red-500 mb-4">  Oops! Your cart is empty . Start shopping by clicking on the button below</h2>
          <Link to="/" className="btn  bg-primary hover:bg-primary text-white">
                Go to Home
              </Link>
            </>
        ) : (
          <>
            <div className="space-y-3 mt-6">
              {cartInfo.data.products.map((product) => (
                <CartItem key={product._id} productInfo={product} />
              ))}
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-primary text-lg">
                Your total cart price {cartInfo.data.totalCartPrice}
              </p>
              <button onClick={clearCart} className="btn bg-red-500 hover:bg-red-700 text-white">
                Clear Cart
              </button>
            </div>
            <Link className="btn bg-primary w-full mt-8 font-semibold text-lg hover:bg-primary inline-block text-white text-center" to="/checkout">Checkout</Link>
          </>
        )}
      </section>
    )}
  </>);
}  