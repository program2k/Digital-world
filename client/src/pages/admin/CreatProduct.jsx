import React, { memo, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button/Button';
import MarkdownEditor from '../../components/Input/Markdown';
import { validate, getBase64 } from '../../utils/helper';
import { toast } from 'react-toastify';
import icons from '../../utils/icons';
import { apiCreateProduct } from '../../APIs/product';
import { showModal } from '../../store/appReducer';
import Loading from '../../components/Common/Loading';
import { apiGetBrands } from '../../APIs/brand';

/**
 * Creates a new product.
 *
 * @param {object} data - The data object containing the product details.
 * @return {void}
 */
const CreatProduct = () => {
    const { IoTrashBinSharp } = icons;
    const { handleSubmit, register, watch, reset, formState: { errors } } = useForm();
    const { categories } = useSelector(state => state.appReducer);
    const { brands } = useSelector(state => state.brandReducer);
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({ description: '' });
    const [invalidFields, setInvalidFields] = useState([]);
    const [prev, setPrev] = useState({ images: [] });
    const [hoverElement, setHoverElement] = useState(null);

    const handleChangeValue = useCallback((event) => {
        setPayload(event);
    }, [payload]);

    const handleCreateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields);
        if (invalids === 0) {
            if (data.category) {
                data.category = categories.find(item => item._id === data.category)?.title;
                data.brand = brands.find(item => item._id === data.brand)?.title;
                const finalPayload = { ...data, ...payload };
                const formData = new FormData();
                for (let i of Object.entries(finalPayload)) {
                    formData.append(i[0], i[1]);
                }
                if (finalPayload.images) {
                    for (let image of finalPayload.images) {
                        formData.append('images', image);
                    }
                }
                dispatch(showModal({ isShowModal: true, modalChild: <Loading /> }));
                const response = await apiCreateProduct(formData);
                dispatch(showModal({ isShowModal: false, modalChild: null }));
                if (response.message === 'Create Product successfully') {
                    toast.success('Tạo sản phẩm thành công');
                    reset();
                    setPrev({ images: [] });
                } else {
                    toast.error('Tạo sản phẩm thất bại');
                }
            }
        }
    };

    const handlePreviewImages = async (files) => {
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

    const handleOnMouseEnter = (params) => {
        setHoverElement(params);
    };

    const handleOnMouseLeave = () => {
        setHoverElement(null);
    };

    const handleRemoveImage = (imageName) => {
        setPrev(prev => ({ ...prev, images: prev.images.filter(item => item.name !== imageName) }));
    };

    useEffect(() => {
        handlePreviewImages(watch('images'));
    }, [watch('images')]);

    return (
        <div className='w-full'>
            <h1 className='h-[75px] justify-between items-center text-3xl font-bold px-4'>
                <span>Create New Product</span>
            </h1>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    <label htmlFor="">Name Product</label>
                    <input
                        className='w-full placeholder:italic placeholder:text-xs'
                        type="text"
                        placeholder='New name product...'
                        {...register('title', { required: true })}
                    />
                    {errors.title && (
                        <small className="error-container text-main">Name is required</small>
                    )}
                    <div className='w-full gap-4 flex my-6'>
                        <div className='w-full flex-1'>
                            <label htmlFor="">Price</label>
                            <input
                                className='flex-1 w-full placeholder:italic placeholder:text-xs'
                                type="number"
                                placeholder='New price...'
                                {...register('price', { required: true })}
                            />
                            {errors.price && (
                                <small className="error-container text-main">Price is required</small>
                            )}
                        </div>
                        <div className='w-full flex-1'>
                            <label htmlFor="">Quantity</label>
                            <input
                                className='flex-1 w-full placeholder:italic placeholder:text-xs'
                                type="text"
                                placeholder='New quantity...'
                                {...register('quantity', { required: true })}
                            />
                            {errors.quantity && (
                                <small className="error-container text-main">Quantity is required</small>
                            )}
                        </div>
                        <div className='w-full flex-1'>
                            <label htmlFor="">Color</label>
                            <input
                                className='flex-1 w-full placeholder:italic placeholder:text-xs'
                                type="text"
                                placeholder='New color...'
                                {...register('color', { required: true })}
                            />
                            {errors.color && (
                                <small className="error-container text-main">Quantity is required</small>
                            )}
                        </div>
                    </div>
                    <div className='flex w-full gap-4'>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="" className='mt-2'>Category</label>
                            <select name="category" id="category" className='flex-1 w-full' {...register('category', { required: true })}>
                                <option value="">--- Choose the category ---</option>
                                {categories?.map((element, index) => (
                                    <option key={index} value={element._id}>{element.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="" className='mt-2'>Brand</label>
                            <select name="Brand" id="brand" className='flex-1 w-full' {...register('brand', { required: true })}>
                                <option value="">--- Choose the brand ---</option>
                                {categories?.find(element => element._id === watch('category'))?.brands?.map((element, index) => (
                                    <option key={index} value={element._id}>{element.title}</option>
                                ))}
                            </select>
                            {errors.brand && (
                                <small className="error-container text-main">Please choose the one of this list</small>
                            )}
                        </div>
                    </div>
                    <div>
                        <MarkdownEditor
                            name={'description'}
                            value={''}
                            changevalue={handleChangeValue}
                            label={'Description'}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
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
                        name={'Create new product'}
                        type='submit'
                        style={'p-1 px-1 flex mt-6 justify-center text-white bg-main hover:bg-red-400 rounded-md'}
                    />
                </form>
                <div className='h-[100px]'></div>
            </div>
        </div>
    );
};

export default memo(CreatProduct);