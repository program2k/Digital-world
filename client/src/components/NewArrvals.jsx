import React, { memo, useEffect, useState } from 'react';
import { apiGetCategoryById, apiGetCategories } from '../APIs/app';
import Slider from "react-slick";
import Product from '../components/Product/Product';

const NewArrivals = () => {
    const [productOfCategory, setProductOfCategory] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    const [tabs, setTabs] = useState(null);

    const settings = {
        dots: false,
        infinite: false,
        speed: 250,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const fetchCategoryById = async (id) => {
        const category = await apiGetCategoryById(id);
        if (category.message === 'Success') {
            setProductOfCategory(category.ProductCategory.products);
        } else {
            return;
        }
    };

    const handleTabClick = async (categoryId) => {
        setActiveTab(categoryId);
        await fetchCategoryById(categoryId);
    };

    useEffect(() => {
        const loadCategories = async () => {
            const categories = await apiGetCategories();
            const filteredCategories = categories.ProductCategories.filter(category =>
                category.title === 'SmartPhone' || category.title === 'Laptop' || category.title === 'Tablet'
            );
            setTabs(filteredCategories);
            
            // Khi tải lần đầu, chọn danh mục Smart Phone và gọi fetchCategoryById
            const smartPhoneCategory = filteredCategories.find(category => category.title === 'SmartPhone');
            if (smartPhoneCategory) {
                handleTabClick(smartPhoneCategory._id);
            }
        };
        loadCategories();
    }, []);

    return (
        <div className='w-full'>
            <div className='flex justify-between border-b-2 mt-4 border-main'>
                <h3 className='text-[20px] font-semibold py-[15px] '>NEW ARRIVALS</h3>
                <div className='items-end flex gap-10 px-6 mb-4 mr-[-20px]'>
                    {tabs?.map((element, index) => (
                        <span
                            key={index}
                            onClick={() => handleTabClick(element._id)}
                            className={`cursor-pointer ${activeTab === element._id ? 'text-main' : 'text-gray-400'}`}
                        >
                            {element.title}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-4 mx-[-10px]">
                <Slider {...settings}>
                    {(productOfCategory?.map((element, index) => (
                            <Product key={index} productData={element} />
                        )))}
                </Slider>
            </div>
        </div>
    );
};

export default memo(NewArrivals);
