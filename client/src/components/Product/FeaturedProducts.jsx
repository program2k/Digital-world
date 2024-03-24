import React, { useEffect, useState, memo } from 'react';
import { apiGetProducts } from '../../APIs/product';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState(null);

    const fetchProducts = async () => {
        const response = await apiGetProducts();
        if (response.message === 'Get all products successfully') {
            const productArr = response.data.products;
            for (let i = productArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [productArr[i], productArr[j]] = [productArr[j], productArr[i]];
            }
            const randomProducts = productArr.slice(0, 9);
            setFeaturedProducts(randomProducts);
        } else {
            return;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className='w-full'>
            <div>
                <h3 className='text-[20px] font-semibold py-[15px] border-b-2 mt-4 border-main'>FEATURED PRODUCTS</h3>
            </div>
            <div className='flex flex-wrap mt-[15px] mx-[-10px]'>
                {featuredProducts?.map((element, index) => (
                    <ProductCard
                        key={index}
                        images={element.images[0]}
                        title={element.title}
                        totalRatings={element.totalRatings}
                        price={element.price}
                    />
                ))}
            </div>
            <div className='flex justify-between mt-4'>
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
                    alt="Image"
                    className='w-[49%] object-contain'
                />
                <div className='justify-between flex flex-col gap-4 w-[24%]'>
                    <img
                        src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
                        alt="Image" className=''
                    />
                    <img
                        src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
                        alt="Image"
                        className=''
                    />
                </div>
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
                    alt="Image"
                    className='w-[24%] object-contain'
                />
            </div>
        </div>
    );
};

export default memo(FeaturedProducts);