import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { apiCreateOrder } from "../../APIs/product";
import Swal from "sweetalert2";
import path from '../../utils/path';
import { useNavigate } from "react-router-dom";

// This value is from the props in the UI
const style = { "layout": "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, amount, currency, payload, setIsPaymentSuccessful }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options, currency: currency
            }
        })
    }, [currency, showSpinner]);

    const handleSaveOrder = async () => {
        console.log('payload: ', payload);
        const response = await apiCreateOrder({ ...payload, status: 'success' });
        if (response.message === 'Order created successfully') {
            setIsPaymentSuccessful(true);
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng!!!',
                    text: ' Bạn đã đặt hàng thành công',
                })
                .then(result => {
                    if (result.isConfirmed) {
                        navigate(`/${path.HOME}`);
                    }
                })
            }, 0.5);
        }
    };

    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={undefined}
                createOrder={(data, action) => {
                    return action.order.create({
                        purchase_units: [{ amount: { currency_code: "USD", value: amount } }],
                    }).then(orderId => orderId)
                }}
                onApprove={(data, action) => {
                    return action.order.capture().then(async (details) => {
                        // Your code here after capture the order
                        if (details.status === 'COMPLETED') {
                            handleSaveOrder();
                        }
                    });
                }}
            />
        </>
    );
}


/**
 * Renders a PayPal component to process a payment.
 *
 * @param {number} amount - The amount of the payment.
 * @param {object} payload - The payload containing payment details.
 * @param {function} setIsPaymentSuccessful - A function to update the payment status.
 * @return {JSX.Element} - The rendered PayPal component.
 */
export default function Paypal({ amount, payload, setIsPaymentSuccessful }) {
    return (
        <div style={{ maxWidth: "1000px", minHeight: "200px", margin: 'auto' }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper setIsPaymentSuccessful={setIsPaymentSuccessful} payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}