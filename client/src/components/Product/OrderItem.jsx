import React, { memo, useCallback, useEffect, useState } from 'react';
import { formatPrice } from '../../utils/helper';
import SelectQuantity from '../Common/SelectQuantity';
import { useSelector } from 'react-redux';

const OrderItem = ({ element, index, getCount, defaultQuantity }) => {
    const { current } = useSelector(state => state.userReducer);
    const [quantity, setQuantity] = useState(defaultQuantity || 1);
    console.log(element)

    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) {
            return;
        } else {
            setQuantity(number);
        }
    }, [quantity]);

    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) {
            return;
        }
        if (flag === 'minus') {
            setQuantity((prev) => +prev - 1);
        }
        if (flag === 'plus') {
            setQuantity((prev) => +prev + 1);
        }
    }, [quantity]);

    useEffect(() => {
        getCount && getCount(element.product._id, quantity, element.color);
    }, [quantity]);

    return (
        <div className={index === current?.carts?.length - 1 ? 'font-bold my-8 py-3 grid grid-cols-10' : 'font-bold border-b my-8 py-3 grid grid-cols-10'}>
            <span className='col-span-6 w-full text-center'>
                <div className='flex gap-2 px-4 py-2'>
                    <img src={element.images[0]} alt="iamges" className='w-28 h-28 object-cover' />
                    <div className='flex flex-col justify-start gap-1'>
                        <span className='text-sm text-main'>{element.title}</span>
                        <span className='text-[10px]'>{element.color}</span>
                        <span className='text-base'>{element.quantity} x {formatPrice(element.price)} VND</span>
                    </div>
                </div>
            </span>
            <span className='col-span-3 w-full text-center'>
                <div className='flex items-center h-full'>
                    <SelectQuantity
                        quantity={quantity}
                        handleQuantity={handleQuantity}
                        handleChangeQuantity={handleChangeQuantity}
                    />
                </div>
            </span>
            <span className='col-span-1 w-full text-center'>
                <span className='text-lg h-full flex items-center justify-center'>{formatPrice(element.price * quantity) + ' VND'}</span>
            </span>
        </div>
    );
};

export default memo(OrderItem);