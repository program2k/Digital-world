import React, { memo, useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import BreadCrumb from '../../components/Common/BreadCrumb';
import Product from '../../components/Product/Product';
import { apiGetProducts } from '../../APIs/product';
import Masonry from 'react-masonry-css'
import SearchItem from '../../components/Search/SearchItem';
import SelectionInputField from '../../components/Input/SelectionInputField';
import { sortDatas } from '../../utils/constants';
import Pagination from '../../components/Pagination/Pagination';

const Products = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [products, setProducts] = useState(null);
    const [activeClick, setActiveClick] = useState(null);
    const [sort, setSort] = useState('');
    const [quantity, setQuantity] = useState(0);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    const fetchedProductsByCatgory = async (query) => {
        console.log(query)
        const response = await apiGetProducts(query);
        console.log(response)
        if (response.message === 'Get all products successfully') {
            setProducts(response?.data?.products?.map(product => product));
            setQuantity(response?.data?.quantity);
        }
    };

    console.log(quantity);

    const changeActiveFilter = useCallback((name) => {
        if (name === activeClick) {
            setActiveClick(null);
        } else {
            setActiveClick(name);
        }
    }, [activeClick]);

    const changeValue = useCallback((value) => {
        setSort(value);
    }, [sort]);

    const isEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    useEffect(() => {
        let paramArr = [];
        for (let i of params.entries()) {
            paramArr.push(i);
        }
        let queries = {};
        for (let i of params) {
            queries[i[0]] = i[1];
        }
        let priceQuery = {};
        if (queries.from && queries.to) {
            priceQuery = {
                $and: [
                    { price: { gte: queries.from } },
                    { price: { lte: queries.to } },
                ]
            }
            delete queries.price;
        }
        if (queries.from) {
            queries.price = { gte: queries.from }
        }
        if (queries.to) {
            queries.price = { lte: queries.to }
        }
        delete queries.from;
        delete queries.to;
        isEmpty(queries) ? fetchedProductsByCatgory({ category }) : fetchedProductsByCatgory({ ...priceQuery, ...queries, category });
        window.scrollTo(0, 0);
    }, [params]);

    useEffect(() => {
        if (sort) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({
                    sort: sort
                }).toString(),
            });
        }
    }, [sort]);

    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex items-center justify-center'>
                <div className='w-main'>
                    <h3 className='font-extrabold text-[20px]'>{category.toUpperCase()}</h3>
                    <BreadCrumb category={category} />
                </div>
            </div>
            <div className='w-main border p-4 flex justify-between items-center mt-8'>
                <span>Filter by</span>
                <div className='w-4/5 flex-auto flex items-center gap-4'>
                    <SearchItem
                        name='Price'
                        activeClick={activeClick}
                        changeActiveFilter={changeActiveFilter}
                        type='input'
                    />
                    <SearchItem
                        name='Color'
                        activeClick={activeClick}
                        changeActiveFilter={changeActiveFilter}
                        type='checkbox'
                    />
                </div>
                <div className='w-1/5 flex flex-col items-center'>
                    <span>Sort By</span>
                    <SelectionInputField value={sort} options={sortDatas} changeValue={changeValue} />
                </div>
            </div>
            <div className='w-main m-auto mt-8'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column">
                    {/* array of JSX items */}
                    {products?.map((element, index) => (
                        <Product key={index} productData={element} />
                    ))}
                </Masonry>
            </div>
            <div className='w-main m-auto my-4 flex justify-end'>
                <Pagination totalCount={quantity} />
            </div>
            <div className='h-[300px]'></div>
        </div>
    );
};

export default memo(Products);