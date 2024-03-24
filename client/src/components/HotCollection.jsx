import React, { useEffect, useState, memo } from 'react';
import { apiGetCategories } from '../APIs/app';
import ProductCategoryCard from '../components/Product/ProductCategoryCard';
import icons from '../utils/icons';

const HotCollection = () => {
    const { IoIosArrowForward } = icons;
    const [hotCollection, setHotCollection] = useState(null);

    const fetchCategories = async () => {
        const categories = await apiGetCategories();
        if (categories.message === 'Success') {
            const filteredCategories = categories.ProductCategories.filter(category =>
                category.title === 'SmartPhone' || category.title === 'Laptop' || category.title === 'Tablet' ||
                category.title === 'Printer' || category.title === 'Television' || category.title === 'Acessories'
            );
            setHotCollection(filteredCategories);
        } else {
            return;
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div className='w-full'>
            <div className='flex justify-between border-b-2  mt-4 border-main'>
                <h3 className='text-[20px] font-semibold py-[15px]'>HOT COLLECTION</h3>
            </div>
            <div className='flex flex-wrap gap-4 mt-4'>
                {hotCollection?.map((element, index) => (
                    <div key={index} className='w-[396px]'>
                        <div className='border flex p-2 min-h-[202px]'>
                            <ProductCategoryCard
                                images={element.images[0]}
                                // title={element.title}
                            />
                            <ul className='text-sm'>
                                {element?.brands?.map((item, index) => (
                                    <span key={index} className='flex gap-1 items-center text-gray-500'>
                                        <IoIosArrowForward size={14}/>
                                        <li>{item.title}</li>
                                    </span>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(HotCollection);