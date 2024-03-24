import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../components/Common/BreadCrumb';
import { formatPrice } from '../../utils/helper';
import Button from '../../components/Button/Button';
import icons from '../../utils/icons';
import OrderItem from '../../components/Product/OrderItem';
import { updateCart } from '../../store/userSlice';
import withBase from '../../HOCS/withBase.js';
import path from '../../utils/path';
import { Link } from 'react-router-dom';

const DetailCart = ({ location, dispatch }) => {
    const { BsArrowRight } = icons;
    const { current, currentCart } = useSelector(state => state.userReducer);

    const getCount = (p_id, quantity, color) => {
        dispatch(updateCart({ p_id, quantity, color }));
    };

    return (
        <div className='w-full'>
            <div className='h-[81px] flex items-center justify-center bg-gray-100'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>My Cart</h3>
                    <BreadCrumb category={location?.pathname?.replace('/','').split('-').join(' ')} />
                </div>
            </div>
            <div className='flex flex-col border-l border-r border-b mt-8 w-main mx-auto'>
                <div className='font-bold bg-main text-white py-3 grid grid-cols-10'>
                    <span className='col-span-6 w-full text-center'>Products</span>
                    <span className='col-span-3 w-full text-center'>Quantity</span>
                    <span className='col-span-1 w-full text-center'>Total</span>
                </div>
                {current?.carts?.map((element, index) => (
                    <OrderItem
                        key={index}
                        element={element}
                        index={index}
                        getCount={getCount}
                        defaultQuantity={element.quantity}
                    />
                ))}
            </div>
            <div className='w-main mx-auto flex flex-col justify-center items-end gap-3 mt-8'>
                <span className='flex gap-40'>
                    <span className='text-gray-500'>Subtotal: </span>
                    <span className='flex flex-col font-bold text-lg'>
                        <span>{formatPrice(currentCart?.reduce((sum, element) => sum + Number(element.price * element.quantity), 0))}</span>
                        <span className='flex justify-end'>VND</span>
                    </span>
                </span>
                <span className='text-sm italic text-gray-500'>Shipping, taxes, and discounts calculated at checkout</span>
                <div className='flex gap-5'>
                    <Button
                        name={'Update Cart'}
                        type='submit'
                        style={'p-2 px-2 w-150 text-white bg-black hover:bg-main mt-6 rounded-md'}
                    />
                    <Link className='bg-main hover:bg-black text-white px-4 p-2 rounded-md flex justify-center items-center gap-1' to={`/${path.CHECKOUT}`}>
                        CHECK OUT
                        <BsArrowRight/>
                    </Link>
                </div>
            </div>
            <div className='h-[100px]'></div>
        </div>
    );
};

export default withBase(memo(DetailCart));