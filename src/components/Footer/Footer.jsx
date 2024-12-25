import React from 'react'

import amazonPayLogo from "../../assets/imgs/amazon-pay.png"
import americanExpressLogo from "../../assets/imgs/American-Express-Color.png"
import masterCardLogo from "../../assets/imgs/mastercard.webp"
import payPalLogo from "../../assets/imgs/paypal.png"
import appStoreLogo from "../../assets/imgs/get-apple-store.png"
import googlePlayLogo from "../../assets/imgs/get-google-play.png"

export default function Footer() {
  return <>
      <div className="bg-slate-100 py-8">
        <div className="container space-y-4">
          <header>
            <h2 className='text-xl font-semibold text-slate-800'>Get the FreshCart App</h2>
            <p className='text-slate-400'>We will send you a link, open it on your phone to download the app</p>
          </header>
          <div className='flex gap-2'>
            <input type="email" className='form-control grow' placeholder="Email"/>
            <button className='btn uppercase bg-primary hover:bg-primary text-white text-sm font-semibold'>Share App Link</button>
          </div>
          <div className='flex justify-center items-center py-4 border-y-2 border-slate-400 border-opacity-50'>
            <div className="payment-partners flex gap-3 items-center">
              <h3>Payment Partners</h3>
              <img className="w-24" src={amazonPayLogo} alt=""/>
              <img className="w-24" src={americanExpressLogo} alt=""/>
              <img className="w-20" src={masterCardLogo} alt=""/>
              <img className="w-24" src={payPalLogo} alt=""/>

            </div>
            <div className="download flex gap-3 items-center">
              <h3>Get deliveries with FreshCart</h3>
              <img className="w-24" src={appStoreLogo} alt=""/>
              <img className="w-28" src={googlePlayLogo} alt=""/>

            </div>
          </div>
        </div>
      </div>
  </>
  
}
