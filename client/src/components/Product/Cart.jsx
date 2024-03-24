import React, { memo } from 'react';
import icons from '../../utils/icons';
import withBase from '../../HOCS/withBase';
import { showCart } from '../../store/appReducer';
import { useSelector } from 'react-redux';
import { formatPrice } from '../../utils/helper';
import Button from '../../components/Button/Button';
import { apiRemoveUserCart } from '../../APIs/user';
import { toast } from 'react-toastify';
import { getUser } from '../../store/asyncUserAction';
import path from '../../utils/path';

/**
 * Renders a Cart component.
 *
 * @param {Object} dispatch - A function used to dispatch actions.
 * @param {Object} iconAfter - An icon component.
 * @return {JSX.Element} The rendered Cart component.
 */
const Cart = ({ dispatch, navigate }) => {
    const { AiFillCloseCircle, RiDeleteBin5Line } = icons;
    const { current, currentCart } = useSelector(state => state.userReducer);
    const { BsArrowRight } = icons;

    const handleCloseCart = () => {
        dispatch(showCart());
    };

    const handleNavigate = () => {
        if (currentCart.length > 0) {
            dispatch(showCart());
            navigate(`${path.DETAIL_CART}`);
        } else {
            toast.error('Vui lòng chọn sản phẩm bạn cần mua', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const handleRemoveUserCart = async (p_id, color) => {
        const response = await apiRemoveUserCart(p_id, color);
        if (response.message === 'Remove cart successfully') {
            toast.success('Xoá giỏ hàng thành công');
            dispatch(getUser());
        } else {
            toast.error('Xoá giỏ hàng thất bại');
        }
    };

    return (
        <div className='w-[400px] h-screen bg-black text-white p-8'>
            <header className='border-b border-gray-500 flex justify-between items-center text-2xl font-bold'>
                <span>Your Cart</span>
                <span className='cursor-pointer p-2' onClick={handleCloseCart}><AiFillCloseCircle size={24} /></span>
            </header>
            <section className='flex flex-col gap-3 mt-3'>
                {current?.carts.length <= 0 && (
                    <span className='text-xs italic'>Your cart is empty</span>
                )}
                {current?.carts.map((element, index) => (
                    console.log(element),
                    <div key={index} className='flex gap-2'>
                        <div className='flex gap-2'>
                            <img src={element.images[0]} alt="iamges" className='w-16 h-16 object-cover' />
                            <div className='flex flex-col gap-1'>
                                <span className='text-main'>{element.product.title}</span>
                                <span className='text-[10px]'>{element.color}</span>
                                <span className='text-base'>{element.quantity} x {formatPrice(element.price)} VND</span>
                            </div>
                        </div>
                        <span
                            onClick={() => handleRemoveUserCart(element.product._id, element.color)}
                            className='h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-500 cursor-pointer'
                        >
                            <RiDeleteBin5Line size={16} />
                        </span>
                    </div>
                ))}
            </section>
            <div className=''>
                <div className='flex justify-between items-center my-4 pt-4 border-t'>
                    <span>Subtotal: </span>
                    <span>{formatPrice(current?.carts.reduce((sum, element) => sum + Number(element.price), 0)) + ' VND'}</span>
                </div>
                <span className='text-center text-gray-500 italic text-xs flex items-center justify-center'>Shipping, taxes, and discount calculated at checkout</span>
                <div className='flex justify-center'>
                    <Button
                        name={<div className='flex gap-2 justify-center items-center'>Shopping Cart<BsArrowRight /></div>}
                        type='submit'
                        style={'p-1 px-2 w-150 text-white bg-main hover:bg-red-400 mt-6 rounded-md'}
                        handleOnClick={handleNavigate}
                    />
                </div>
            </div>
        </div>
    );
};

export default withBase(memo(Cart));