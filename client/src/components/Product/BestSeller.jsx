import { apiGetProducts } from "../../APIs/product";
import { memo, useEffect, useState } from "react";
import Slider from "react-slick";
import Product from "./Product";

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState(null);
    const [newProducts, setNewProducts] = useState(null);
    const [activeTab, setActiveTab] = useState(1);

    const tab = [
        { id: 1, name: "Best Sellers" },
        { id: 2, name: "New Arrivals" },
    ]

    const settings = {
        dots: false,
        infinite: false,
        speed: 250,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const fetchedProducts = async () => {
        const [bestSellers, newProducts] = await Promise.all([
            apiGetProducts({ sort: '-createdAt' }),
            apiGetProducts({ sort: '-sold' }),
        ]);
        if (bestSellers.message === 'Get all products successfully') {
            setBestSellers(bestSellers.data.products);
        }
        if (newProducts.message === 'Get all products successfully') {
            setNewProducts(newProducts.data.products);
        }
    };

    useEffect(() => {
        fetchedProducts();
    }, []);

    return (
        <div>
            <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
                {tab.map((element) => (
                    <span
                        key={element.id}
                        onClick={() => setActiveTab(element.id)}
                        className={`font-bold capitalize border-r cursor-pointer ${activeTab === element.id ? 'text-black' : 'text-gray-400'}`}
                    >
                        {element.name}
                    </span>
                ))}
            </div>
            <div className="mt-4 mx-[-10px]">
                <Slider {...settings}>
                    {activeTab === 1 ? (bestSellers?.map((element, index) => (
                        <Product key={index} productData={element} isNew={false} />
                    ))) : (newProducts.map((element, index) => (
                        <Product key={index} productData={element} isNew={true} />
                    )))
                    }
                </Slider>
            </div>
            <div className="mt-10 w-full flex gap-4">
                <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657" alt="image" className="flex-1 object-contain"/>
                <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657" alt="image" className="flex-1 object-contain"/>
            </div>
        </div>
    )
}

export default memo(BestSeller);