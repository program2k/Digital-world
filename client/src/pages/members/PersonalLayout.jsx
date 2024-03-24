import React, { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Button from '../../components/Button/Button';
import avatar from '../../assets/avt.png'
import { apiUpdateCurrentUser } from '../../APIs/user';
import { toast } from 'react-toastify';
import { getUser } from '../../store/asyncUserAction';

/**
 * Renders the personal layout component.
 *
 * @return {JSX.Element} The rendered personal layout component.
 */
const PersonalLayout = () => {
    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm();
    const { current } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const handleOnSubmit = async (data) => {
        const formData = new FormData();
        if(data.avatar.length > 0) {
            formData.append('avatar', data.avatar[0]);
        }
        delete data.avatar;
        for (let i of Object.entries(data)) {
            formData.append(i[0], i[1]);
        }
        const response = await apiUpdateCurrentUser(formData);
        if(response.message === 'User updated successfully') {
            dispatch(getUser());
            toast.success('Cập nhật thông tin thành công');
        } else {
            toast.error('Cập nhật thông tin thất bại'); 
        }
    };

    useEffect(() => {
        reset({
            firstName: current?.firstName,
            lastName: current?.lastName,
            email: current?.email,
            mobile: current?.mobile,
            avatar: current?.avatar
        });
    }, [current]);

    return (
        <div className='w-full relative px-4'>
            <header className='text-3xl py-4 font-semibold border border-b-blue-200'>
                Personal
            </header>
            <form onSubmit={handleSubmit(handleOnSubmit)} className='w-3/5 flex flex-col gap-6 mx-auto py-8'>
                <div className='flex flex-col '>
                    <label htmlFor="">First Name</label>
                    <input className='flex-auto rounded-md' type="text" {...register('firstName', { required: true })} />
                    {errors.firstName && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className='flex flex-col '>
                    <label htmlFor="">Last Name</label>
                    <input className='flex-auto rounded-md' type="text" {...register('lastName', { required: true })} />
                    {errors.lastName && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className='flex flex-col '>
                    <label htmlFor="">Email</label>
                    <input className='flex-auto rounded-md' type="text" {...register('email', { required: true, pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ })} />
                    {errors.email && <span className='text-red-500'>Email is not valid</span>}
                </div>
                <div className='flex flex-col '>
                    <label htmlFor="">Number Phone</label>
                    <input className='flex-auto rounded-md' type="text" {...register('mobile', { required: true, pattern: /^[0-9]+$/ })} />
                    {errors.mobile && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Account Status:</span>
                    <span>{current?.isBlocked ? 'Blocked' : 'Active'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Role:</span>
                    <span>{current?.role === 'admin' ? 'Admin' : 'User'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Created At:</span>
                    <span>{moment(current?.createdAt).fromNow()}</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='font-medium'>Profile image:</span>
                    <label htmlFor="file">
                        <img src={current?.avatar || avatar} alt="avatar" className='w-20 h-20 object-cover ml-8 rounded-full' />
                    </label>
                    <input type="file" id='file' hidden {...register('avatar')}/>
                </div>
                {isDirty && <div className='flex justify-end'>
                    <Button name={'Update your infomation'} type='submit' style={'p-1 px-2 h-10 w-60 text-white bg-main hover:bg-red-400 rounded-md '} />
                </div>}
            </form>
        </div>
    );
};

export default memo(PersonalLayout);