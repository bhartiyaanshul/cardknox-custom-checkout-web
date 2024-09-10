// import React from 'react'
// import GooglePayButton from '@google-pay/button-react';

// export const GooglePay = () => {
//     useEffect(() => {
//         // Retrieve the query params from the URL
//         const queryParams = new URLSearchParams(window.location.search);
//         const userId = queryParams.get('userId');
//         const sessionId = queryParams.get('sessionId');
//         const token = queryParams.get('token');

//         // Store the params in state or use them as needed
//         setParams({ userId, sessionId, token });

//         // You can now use these parameters for any further operations
//         console.log('UserId:', userId, 'SessionId:', sessionId, 'Token:', token);
//     }, []);

//     return (
//         <div>
//             <GooglePayButton
//                 className='google-pay-button'
//                 environment="TEST"
//                 paymentRequest={{
//                     apiVersion: 2,
//                     apiVersionMinor: 0,
//                     allowedPaymentMethods: [
//                         {
//                             type: 'CARD',
//                             parameters: {
//                                 allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
//                                 allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
//                             },
//                             tokenizationSpecification: {
//                                 type: 'PAYMENT_GATEWAY',
//                                 parameters: {
//                                     gateway: 'example',
//                                     gatewayMerchantId: 'sefesf',
//                                 },
//                             },
//                         },
//                     ],
//                     merchantInfo: {
//                         merchantId: 'BCR2DN4TXWKOJNL5',
//                         merchantName: 'Maadhav Sharma',
//                     },
//                     transactionInfo: {
//                         totalPriceStatus: 'FINAL',
//                         totalPriceLabel: 'Total',
//                         totalPrice: "100.53",
//                         currencyCode: 'USD',
//                         countryCode: 'US',
//                     },

//                 }}
//                 existingPaymentMethodRequired={false}
//                 buttonRadius={5}
//                 buttonSizeMode='fill'
//                 onLoadPaymentData={paymentRequest => {
//                     console.log('load payment data', paymentRequest);
//                     window.location.assign('https://support.yadlachim.org' + '/success');
//                 }}
//             />
//         </div>
//     )
// }

import React, { useEffect } from 'react';

export const GooglePayPAY = () => {

    useEffect(() => {
        window.enableGooglePay({ amountField: 'amount', enviromement: 'test' });
    }, []);
    // useEffect(() => {
    //     // Retrieve the query params from the URL
    //     const queryParams = new URLSearchParams(window.location.search);
    //     const userId = queryParams.get('userId');
    //     const sessionId = queryParams.get('sessionId');
    //     const token = queryParams.get('token');

    //     // Store the params in state or use them as needed
    //     setParams({ userId, sessionId, token });

    //     // You can now use these parameters for any further operations
    //     console.log('UserId:', userId, 'SessionId:', sessionId, 'Token:', token);
    // }, []);


    const merchantInfo = {
        merchantId: 'BCR2DN4TXWKOJNL5',
        merchantName: 'Maadhav Sharma',
    }

    const buttonOptions = {
        buttonSizeMode: 'fill',
    }

    const billingParams = {
        billingAddressRequired: true,
        billingAddressParameters: {
            format: 'FULL',
            phoneNumberRequired: true,
        },
    }

    const shippingParams = {
        phoneNumberRequired: true,
        emailRequired: true,
        onGetShippingCosts: (shippingData) => {
            console.log({
                label: 'onGetShippingCosts',
                data: shippingData
            });
            return {
                "shipping-001": "0.00",
                "shipping-002": "1.99",
                "shipping-003": "10.00"
            }
        },
        onGetShippingOptions: (shippingData) => {
            // logDebug({
            //     label: "onGetShippingOptions",
            //     data: shippingData
            // });
            let selectedOptionid = "shipping-001";
            if (shippingData && shippingData.shippingOptionData && shippingData.shippingOptionData.id !== "shipping_option_unselected") {
                selectedOptionid = shippingData.shippingOptionData.id;
            }
            return {
                defaultSelectedOptionId: selectedOptionid,
                shippingOptions: [
                    {
                        id: "shipping-001",
                        label: "Free Shipping",
                        description: "Delivers in five business days",
                        price: "0.00",
                        selected: selectedOptionid === "shipping-001"
                    },
                    {
                        id: "shipping-002",
                        label: "Standard Shipping",
                        description: "Delivers in three business days",
                        price: "1.99",
                        selected: selectedOptionid === "shipping-002"
                    },
                    {
                        id: "shipping-003",
                        label: "Express Shipping",
                        description: "Delivers in two business days",
                        price: "10.00",
                        selected: selectedOptionid === "shipping-003"
                    }
                ]
            }
        },

    }

    // const onGetShippingOptions = 

    const onGetTransactionInfo = (transactionInfo) => {
        console.log({
            label: "onGetTransactionInfo",
            data: transactionInfo
        });
        return {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "100.53",
            currencyCode: "USD",
            countryCode: "US"
        }
    }

    const onBeforeProcessPayment = (paymentData) => {
        return new Promise((resolve, reject) => {
            console.log({
                label: "onBeforeProcessPayment",
                data: paymentData
            });
            resolve();
        });
    }

    const onProcessPayment = (paymentResponse) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("Payment Response", JSON.stringify(paymentResponse));
                const paymentToken = paymentResponse.paymentMethodData.tokenizationData.token;
                console.log("paymentToken", paymentToken);
                const amt = (paymentResponse && paymentResponse.transactionInfo && paymentResponse.transactionInfo.totalPrice) || 0;
                try {
                    if (amt <= 0) {
                        throw "Payment is not authorized. Invalid amount. Amount must be greater than 0";
                    }
                }
                catch (error) {
                    console.error(error);
                    setGPPayload("");
                    reject(error);
                }
            }
            catch (error) {
                console.error(error);
                setGPPayload("");
                reject(error);
            }
        });
    }

    const onPaymentCanceled = () => {
        setTimeout(function () { alert("Payment was canceled") }, 500);
    }

    const handleResponse = (response) => {
        const respObj = JSON.parse(response);
        if (respObj) {
            if (respObj.xError) {
                setTimeout(function () { alert(`There was a problem with your order (${respObj.xRefNum})!`) }, 500);
            } else
                setTimeout(function () { alert(`Thank you for your order (${respObj.xRefNum})!`) }, 500);
        }
    }

    const getGPEnviroment = () => {
        console.log(window)
        return "test"
    }

    const initGP = () => {
        return {
            merchantInfo: merchantInfo,
            buttonOptions: buttonOptions,
            environment: getGPEnviroment(),
            billingAddressParameters: billingParams,
            shippingParams: shippingParams,
            onGetTransactionInfo: onGetTransactionInfo,
            onBeforeProcessPayment: onBeforeProcessPayment,
            onProcessPayment: onProcessPayment,
            onPaymentCanceled: onPaymentCanceled,
            onGPButtonLoaded: gpButtonLoaded,
        }
    }

    const gpButtonLoaded = (resp) => {
        if (!resp) return;
        if (resp.status) {
            showHide("divGpay", true);
            showHide("lbGPPayload", true);
        } else if (resp.reason) {
            alert(resp.reason);
        }
    }

    const gpRequest = {
        merchantInfo: merchantInfo,
        buttonOptions: buttonOptions,
        billingParams: billingParams,
        shippingParams: shippingParams,
        onGetTransactionInfo: onGetTransactionInfo,
        onBeforeProcessPayment: onBeforeProcessPayment,
        onProcessPayment: onProcessPayment,
        onPaymentCanceled: onPaymentCanceled,
        onGPButtonLoaded: gpButtonLoaded,
        initGP: initGP,
        getGPEnviroment: getGPEnviroment,
        handleResponse: handleResponse,
    }

    const setGPPayload = (value) => {
        const gpTxt = document.getElementById('gp-payload');
        gpTxt.value = value;
        showHide(gpTxt, value);
    }

    const showHide = (elem, show) => {
        if (typeof elem === 'string') {
            elem = document.getElementById(elem);
        }
        if (elem) {
            elem.style.display = show ? "block" : "none";
        }
    }

    useEffect(() => {
        console.log('Google Pay enabled', gpRequest.initGP());
    }, []);

    // const getAmount = () => {
    //     return '99';
    // }

    return (
        <form id="payment-form" method="POST">
            <br />
            {/* <div id="divGpay" class="gp hidden"> */}
            <iframe id="igp" class="gp" data-test="test" data-ifields-id="igp" data-ifields-oninit={gpRequest.initGP} src="https://cdn.cardknox.com/ifields/2.9.2109.2701/igp.htm"
                allowpaymentrequest
                sandbox="allow-popups allow-modals allow-scripts allow-same-origin allow-forms allow-popups-to-escape-sandbox allow-top-navigation"
                title="GPay checkout page">
            </iframe>
            <br />
            {/* </div> */}
            <br />
            <br />
            <label id="lbGPPayload" class="hidden">Google Pay Payload: </label>
            <br />
            <textarea id="gp-payload" class="hidden" rows="10" readOnly></textarea>
        </form>
    )
}
