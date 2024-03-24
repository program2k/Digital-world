import React, { memo, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';
import { useSelector } from 'react-redux';

/**
 * Renders a popup for editing a product.
 *
 * @param {Object} data - the data of the product to be edited
 * @param {Function} handleUpdate - the function for updating the product
 * @return {JSX.Element} the rendered editing product popup
 */
const EditingProductPopup = ({ data, handleUpdate }) => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const modalRef = useRef();
    const { brands } = useSelector(state => state.brandReducer);
    const { categories } = useSelector(state => state.appReducer);
    const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
    const [selectedBrandOption, setSelectedBrandOption] = useState(null);

    /**
     * Handles the stop propagation of the event.
     *
     * @param {Event} event - The event object.
     */
    const handleStopPropagation = (event) => {
        event.stopPropagation();
    }

    /**
     * Submits the form data to update the category and brand.
     *
     * @param {object} formData - The form data to be submitted.
     * @return {undefined} This function does not return a value.
     */
    const onSubmit = (formData) => {
        const categoryToSend = categories?.find(item => item._id === selectedCategoryOption)?.title || data.category;
        const brandToSend = brands?.find(item => item._id === selectedBrandOption)?.title || data.brand;
        handleUpdate(data._id, {
            ...formData,
            category: categoryToSend,
            brand: brandToSend
        });
    }

    /**
     * Handles the change event when the select category changes.
     *
     * @param {Event} event - The change event.
     * @return {void} No return value.
     */
    const handleSelectCategoryChange = (event) => {
        setSelectedCategoryOption(event.target.value);
    };

    const handleSelectedBrandChange = (event) => {
        setSelectedBrandOption(event.target.value);
    }


    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, []);

    return (
        <div onClick={handleStopPropagation} ref={modalRef} className='w-[700px] h-[500px] rounded-2xl bg-white p-4 flex flex-col gap-4 items-center justify-center'>
            <h2 className='text-center text-medium text-lg font-semibold'>Editing Product</h2>
            <div className='flex gap-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-6 items-center justify-between'>
                        <div className='flex flex-col gap-8'>
                            <div className='flex flex-col'>
                                <label htmlFor="">Title</label>
                                <input
                                    type="text"
                                    defaultValue={data.title}
                                    {...register('title', { required: true })}
                                />
                                {errors.title && (
                                    <small className="error-container text-main">Title is required</small>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Color</label>
                                <input
                                    type="text"
                                    defaultValue={data.color}
                                    {...register("color", { required: true })}
                                />
                                {errors.color && (
                                    <small className="error-container text-main">Color is required</small>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Category</label>
                                <select
                                    name="category"
                                    value={selectedCategoryOption}
                                    onChange={handleSelectCategoryChange}
                                    id="category"
                                    className='form-select'
                                >
                                    <option value="">{selectedCategoryOption === null ? data.category : selectedCategoryOption}</option>
                                    {categories?.map((element, index) => (
                                        <option value={element._id} key={index}>{element.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col gap-8'>
                            <div className='flex flex-col'>
                                <label htmlFor="">Quantity</label>
                                <input
                                    type="text"
                                    defaultValue={data.quantity}
                                    {...register("quantity", { required: true })}
                                />
                                {errors.quantity && (
                                    <small className="error-container text-main">Quantity is required</small>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Sold</label>
                                <input
                                    type="text"
                                    defaultValue={data.sold}
                                    {...register("sold", { required: true })}
                                />
                                {errors.sold && (
                                    <small className="error-container text-main">Sold is required</small>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Brand</label>
                                <select
                                    name="brand"
                                    value={selectedBrandOption}
                                    onChange={handleSelectedBrandChange}
                                    id="brand"
                                >
                                    <option value="">{selectedBrandOption === null ? data.brand : selectedBrandOption}</option>
                                    {categories?.find(element => element._id === selectedCategoryOption)?.brands?.map((element, index) => (
                                        <option value={element._id} key={index}>{element.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4 mt-9 items-center justify-center'>
                        <Button name={'Submit'} type='submit' style={'p-1 px-2 text-white bg-main hover:bg-red-400 rounded-md '} />
                        <Button name={'Back'} style={'p-1 px-4 text-white bg-main hover:bg-red-400 rounded-md '} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default memo(EditingProductPopup);