import React, { memo, useEffect, useState } from 'react';
import paymentSVG from '../../assets/payment.png';
import { useSelector } from 'react-redux';
import { formatPrice } from '../../utils/helper';
import Paypal from '../../components/Common/Paypal';
import { useForm } from 'react-hook-form';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import withBase from '../../HOCS/withBase.js';
import { getUser } from '../../store/asyncUserAction.js';


/**
 * Renders the Checkout component.
 *
 * @param {Object} dispatch - The dispatch function from the Redux store.
 * @return {JSX.Element} The rendered Checkout component.
 */
const CheckOut = ({ dispatch }) => {
    const { currentCart, current } = useSelector(state => state.userReducer);
    const { register, watch, formState: { errors }, setValue } = useForm();
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const address = watch('address');
    const { width, height } = useWindowSize();

    useEffect(() => {
        setValue('address', current?.address);
    }, [current.address]);

    useEffect(() => {
        if (isPaymentSuccessful) {
            dispatch(getUser());
            setTimeout(() => {
                setIsPaymentSuccessful(false);
            }, 5000);
        }
    }, [isPaymentSuccessful]);

    return (
        <div className='p-8 w-full grid grid-cols-6 h-full max-h-screen overflow-y-auto gap-6'>
            {isPaymentSuccessful && (
                <Confetti
                    width={width}
                    height={height}
                />
            )}
            <div className='w-full flex justify-center items-center col-span-2'>
                <img src={paymentSVG} alt="payment" className='h-[70%] object-contain' />
            </div>
            <div className='w-full flex flex-col col-span-4 justify-center items-center gap-6'>
                <h2 className='text-2xl mb-6 font-bold flex items-center uppercase'>Checkout your order</h2>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className='border bg-gray-200'>
                            <th className='text-left p-2'>Products</th>
                            <th className='text-left p-2'>Quantity</th>
                            <th className='text-left p-2'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCart?.map((element, index) => (
                            <tr className='border' key={index}>
                                <td className='text-left p-2'>{element.title}</td>
                                <td className='text-left px-10'>{element.quantity}</td>
                                <td className='text-left p-2'>{formatPrice(element.price * element.quantity) + ' VND'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <span className='flex ml-auto gap-40 font-bold text-lg'>
                    <span className='text-gray-500'>Subtotal: </span>
                    <span className='text-main'>{formatPrice(currentCart?.reduce((sum, element) => sum + Number(element.price * element.quantity), 0)) + ' VND'}</span>
                </span>
                <div className='flex flex-col'>
                    <label htmlFor="">Your Address</label>
                    <input
                        type="text"
                        placeholder='Your address...'
                        className='placeholder:italic placeholder:text-sm rounded-md'
                        {...register('address', { required: true })} />
                    {errors.address && (
                        <small className="error-container text-main">Your address is required</small>
                    )}
                </div>
                {(
                    console.log('address', address),
                    <div className='w-main mx-auto'>
                        <Paypal
                            amount={Math.round(+currentCart?.reduce((sum, element) => +element?.price * +element?.quantity + sum, 0) / 23500)}
                            payload={{
                                products: currentCart,
                                total: Math.round(+currentCart?.reduce((sum, element) => +element?.price * +element?.quantity + sum, 0) / 23500),
                                orderBy: current?._id,
                                address: address
                            }}
                            setIsPaymentSuccessful={setIsPaymentSuccessful}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default withBase(memo(CheckOut));