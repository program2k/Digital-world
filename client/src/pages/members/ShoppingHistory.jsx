import React, { memo, useEffect, useState } from 'react';
import { apiGetUserOrders } from '../../APIs/product';
import { useForm } from 'react-hook-form';
import Pagination from '../../components/Pagination/Pagination';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import CustomSelect from '../../components/Input/CustomSelect';
import { statusOrder } from '../../utils/constants';
import withBase from '../../HOCS/withBase.js';

const ShoppingHistory = ({ navigate, location }) => {
    const [orders, setOrders] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const { register, formState: { errors }, watch, setValue } = useForm();
    const [params] = useSearchParams();
    const q = watch('q');
    const status = watch('status');
    console.log('status', status);

    const fetchOrders = async (params) => {
        const response = await apiGetUserOrders({
            ...params,
            limit: 10,
            // isMine: true
        });
        console.log('user response', response);
        if (response.message === 'Get all orders successfully') {
            setOrders(response.data.orders);
            setQuantity(response.data.quantity);
        }
        console.log(orders)
    };

    const handleSearchStatus = ({ value }) => {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ status: value }).toString()
      })  
    };

    useEffect(() => {
        const pr = Object.fromEntries([...params]); 
        fetchOrders(pr);
    }, [params]);

    return (
        <div className='w-full relative px-4'>
            <header className='text-3xl font-semibold py-4 border-b border-b-blue-200'>
                ShoppingHistory
            </header>
            <div className='flex justify-end items-center px-4 mt-8'>
                <form className='w-[45%] grid grid-cols-2 gap-4'>
                    <div className='col-span-1'>
                        <input
                            type="text"
                            placeholder='Search order by title, descriptions,...'
                            className='placeholder:italic placeholder:text-xs rounded-full'
                            id="q"
                            {...register('orders', { required: false })}
                        />
                    </div>
                    <div className='cols-span-1 flex items-center'>
                        <CustomSelect options={statusOrder} value={status} wrapClassname={'w-full'} onChange={value => handleSearchStatus(value)} />
                    </div>
                </form>
            </div>
            <table className='table-auto w-full mt-8'>
                <thead>
                    <tr className='border bg-sky-900 text-white border-white'>
                        <th className='text-center py-2'>STT</th>
                        <th className='text-center py-2'>Products</th>
                        <th className='text-center py-2'>Total</th>
                        <th className='text-center py-2'>Status</th>
                        <th className='text-center py-2'>Created At</th>
                        <th className='text-center py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((element, index) => (
                        <tr className='border-b border-gray-500' key={index}>
                            <td className='text-center py-2'>
                                {params.get('page') === 1 || params.get('page') === null
                                    ? index + 1
                                    : (params.get('page') - 1) * 10 + (index + 1)}
                            </td>
                            <td className='text-center py-2'>
                                <span className='flex flex-col'>
                                    {element.products?.map((element, index) => (
                                        <span key={index}>{`${element.product?.title} - ${element.color}`}</span>
                                    ))}
                                </span>
                            </td>
                            <td className='text-center py-2'>{element.total}</td>
                            <td className='text-center py-2'>{element.status}</td>
                            <td className='text-center py-2'>{element.createdAt}</td>
                            <td className='text-center py-2'></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-end my-8'>
                <Pagination totalCount={quantity} />
            </div>
        </div>
    );
};

export default withBase(memo(ShoppingHistory));