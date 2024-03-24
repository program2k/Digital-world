import React, { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import { getBase64 } from '../../utils/helper';
import icons from '../../utils/icons';
import { showModal } from '../../store/appReducer';
import Loading from '../Common/Loading';
import { useDispatch } from 'react-redux';
import { apiAddVariant } from '../../APIs/product';

const Variants = ({ variant, setVariant }) => {
    const { IoTrashBinSharp } = icons;
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const [prev, setPrev] = useState({ images: [] });
    const [hoverElement, setHoverElement] = useState(null);

    const handleRemoveImage = (imageName) => {
        setPrev(prev => ({ ...prev, images: prev.images.filter(item => item.name !== imageName) }));
    };

    const handleOnMouseEnter = (params) => {
        setHoverElement(params);
    };

    const handleOnMouseLeave = () => {
        setHoverElement(null);
    };

    const handleAddVariant = async (data) => {
        if(data.color === variant?.color) {
            toast.error('Color đã tồn tại');
            return;
        } else {
            const formData = new FormData();
            for (let i of Object.entries(data)) {
                formData.append(i[0], i[1]);
            }
            if (data.images) {
                for (let image of data.images) {
                    formData.append('images', image);
                }
            }
            dispatch(showModal({ isShowModal: true, modalChild: <Loading /> }));
            const response = await apiAddVariant(formData, variant._id);
            dispatch(showModal({ isShowModal: false, modalChild: null }));
            if (response.message === 'Add variant oke') {
                toast.success('Thêm biến thể sản phẩm thành công');
                reset();
                setPrev({ images: [] });
            } else {
                toast.error('Có lỗi khi thêm biến thể sản phẩm');
            }
        }
    };

    const handlePreviewImages = async (files) => {
        console.log(files)
        let imagesPreview = [];
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('Chỉ hỗ trợ jpeg và png');
                return;
            } else {
                const base64 = await getBase64(file);
                imagesPreview.push({ name: file.name, path: base64 });
            }
        }
        if (imagesPreview.length > 0) {
            setPrev(prev => ({ ...prev, images: imagesPreview }));
        }
    };

    useEffect(() => {
        reset({
            title: variant?.title,
            color: variant?.color,
            price: variant?.price
        });
    }, [variant]);

    useEffect(() => {
        if( watch('images') instanceof FileList && watch('images').length > 0) {
            handlePreviewImages(watch('images'));
        }
    }, [watch('images')]);

    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <div className='h-[69px] w-full'></div>
            <div className='p-4 border-b bg-gray-100 flex justify-between items-center right-0 left-[327px] fixed top-0'>
                <h1 className='text-3xl font-bold tracking-tight'>Customize product's variant</h1>
                <span
                    className='text-main hover:underline cursor-pointer'
                    onClick={() => setVariant(null)}
                >
                    Back
                </span>
            </div>
            <form className='p-4' onSubmit={handleSubmit(handleAddVariant)}>
                <div className='flex gap-4 flex-1'>
                    <div className='flex w-full flex-1 flex-col gap-1'>
                        <label htmlFor="">Original Name</label>
                        <input type="text" {...register('title', { required: false })} />
                    </div>
                </div>
                <div className='flex gap-4 mt-6'>
                    <div className='flex flex-1 flex-col gap-1'>
                        <label htmlFor="">Price</label>
                        <input
                            type="number"
                            className='w-full flex-1 placeholder:text-xs placeholder:italic'
                            placeholder='Price'
                            {...register('price', { required: true })}
                        />
                        {errors.price && (
                            <small className="error-container text-main">Price is required</small>
                        )}
                    </div>
                    <div className='flex flex-1 flex-col gap-1'>
                        <label htmlFor="">Color</label>
                        <input
                            type="text"
                            className='w-full flex-1 placeholder:text-xs placeholder:italic'
                            placeholder='Color'
                            {...register('color', { required: true })}
                        />
                        {errors.color && (
                            <small className="error-container text-main">Color is required</small>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-2 mt-8'>
                    <label className='font-semibold' htmlFor="images">Upload images</label>
                    <input type="file" id='images' multiple {...register('images', { required: true })} />
                    {errors.images && (
                        <small className="error-container text-main">Please choose images</small>
                    )}
                </div>
                {prev.images.length > 0 && (
                    <div className='flex mt-4 w-full gap-3 flex-wrap'>
                        {prev.images.map((element, index) => (
                            <div
                                onMouseEnter={() => handleOnMouseEnter(element.name)}
                                onMouseLeave={handleOnMouseLeave}
                                className='w-fit relative'
                                key={index}
                            >
                                <img src={element.path} key={index} alt="images" className='w-[200px] flex items-center justify-center object-contain' />
                                {hoverElement === element.name && (
                                    <div className='absolute inset-0 animate-scale-up-center bg-overlay'>
                                        <IoTrashBinSharp onClick={() => handleRemoveImage(element.name)} size={24} color='white' />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <Button
                    name={'Add variant'}
                    type='submit'
                    style={'p-1 px-1 flex mt-6 justify-center text-white bg-main hover:bg-red-400 rounded-md'}
                />
            </form>
        </div>
    );
};

export default memo(Variants);