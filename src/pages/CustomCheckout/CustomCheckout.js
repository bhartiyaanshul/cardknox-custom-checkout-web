import React from 'react'
import './CustomCheckout.css'
import { GooglePayPAY } from '../../components/GooglePay/GooglePayCheckout'

export const CustomCheckout = () => {
    return (
        <div className='custom-checkout'>
            <div className='checkout-container'>
                <div className='checkout-details'>
                    <div className='checkout-payment-details'>
                        <div className='checkout-details-amount'>$ 100 USD</div>
                        <div className='checkout-details-email'>xyz@gmail.com</div>
                    </div>
                    <div className='checkout-details-text'>Pay with Google Pay</div>
                </div>
                <GooglePayPAY />
            </div>
        </div>
    )
}
