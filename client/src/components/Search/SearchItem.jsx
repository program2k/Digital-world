import React, { memo, useEffect, useState } from 'react';
import icons from '../../utils/icons';
import { colors } from '../../utils/constants.js';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { apiGetProducts } from '../../APIs/product';
import useDebounce from '../../custom-hooks/useDebounce.js';

const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
    const { AiOutlineDown } = icons;
    const { category } = useParams();
    const navigate = useNavigate();
    const [selectedFields, setSelectedFields] = useState([]);
    const [bestPrice, setBestPrice] = useState(null);
    const [price, setPrice] = useState({ from: '', to: '' });
    const debouncePriceFrom = useDebounce(price.from, 500);
    const debouncePriceTo = useDebounce(price.to, 500)
    const [param] = useSearchParams();

    const handleSelectedField = (event) => {
        const alreadySelectedFields = selectedFields.find(element => element === event.target.value);
        if (alreadySelectedFields) {
            setSelectedFields(prev => prev.filter(element => element !== event.target.value));
        } else {
            setSelectedFields(prev => [...prev, event.target.value]);
        }
    };

    const handleReset = (event) => {
        event.stopPropagation();
        setSelectedFields([]);
        setPrice({ from: '', to: '' });
    };

    const handleAll = () => {
        let allArr = [];
        for (let i = 0; i < colors.length; i++) {
            allArr.push(colors[i]);
        }
        setSelectedFields(allArr);
    };

    const fetchedBestPriceProduct = async () => {
        const response = await apiGetProducts({ sort: '-price', category });
        if (response.message === 'Get all products successfully') {
            const products = response.data.products;
            setBestPrice(products[0]?.price);
        }
    };

    useEffect(() => {
        if (selectedFields.length > 0) {
            let params = [];
            for (let i of param) {
                params.push(i);
            }
            const queries = {};
            for (let i of params) {
                queries[i[0]] = i[1];
            }
            queries.color = selectedFields.join(',');
            navigate({
                pathname: `/${category}`,
                search: createSearchParams(queries).toString(),
            });
        } else {
            navigate(`/${category}`)
        }
    }, [selectedFields]);

    useEffect(() => {
        if (type === 'input') {
            fetchedBestPriceProduct();
        }
    }, [type]);

    useEffect(() => {
        const data = {};
        if (Number(price.from) > 0) {
            data.from = price.from;
        }
        if (Number(price.to) > 0) {
            data.to = price.to;
        }
        navigate({
            search: createSearchParams(data).toString()
        })
    }, [debouncePriceFrom, debouncePriceTo]);

    return (
        <div
            className='p-4 gap-2 text-sm cursor-pointer relative border border-gray-800 flex justify-between items-center'
            onClick={() => changeActiveFilter(name)}
        >
            <span className='capitalize text-gray-500'>{name}</span>
            <AiOutlineDown className='mt-0.5 text-gray-600' />
            {activeClick === name && (
                <div className='absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border border-gray-800 bg-white min-w-[150px]'>
                    {type === 'checkbox' && (
                        <div className='p-4 items-center flex flex-col justify-between gap-4'>
                            <div className='p-4 items-center flex justify-between gap-5 border-b'>
                                <span className='whitespace-nowrap'>{`${selectedFields.length} selected`}</span>
                                <span className='underline cursor-pointer hover:text-main' onClick={handleReset}>Reset</span>
                            </div>
                            <div className='flex flex-col gap-2 mt-4' onClick={event => event.stopPropagation()}>
                                <div className='flex items-center gap-4'>
                                    <input
                                        from type="checkbox"
                                        className='focus:hidden'
                                        value='All'
                                        onChange={handleAll}
                                    />
                                    <label htmlFor='' className='capitalize text-[17px] font-semibold text-gray-700'>All</label>
                                </div>
                                {colors.map((element, index) => (
                                    <div key={index} className='gap-4 flex leading-7 items-center'>
                                        <input
                                            type="checkbox"
                                            className=' focus:hidden'
                                            onChange={handleSelectedField}
                                            value={element}
                                            id={element}
                                            checked={selectedFields.some(selectedFields => selectedFields === element)}
                                        />
                                        <label htmlFor={element} className='capitalize text-gray-700'>{element}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {type === 'input' && (
                        <div onClick={event => event.stopPropagation()}>
                            <div className='p-4 items-center flex justify-between gap-4 border-b'>
                                <span className='whitespace-nowrap'>{`The highest price is ${bestPrice} VND`}</span>
                                <span className='underline cursor-pointer hover:text-main' onClick={handleReset}>Reset</span>
                            </div>
                            <div className='mt-4 flex items-center p-2 gap-5'>
                                <div className='flex items-center gap-1'>
                                    <label htmlFor="from">$</label>
                                    <input
                                        className='form-input border-none bg-gray-200 w-[150px]'
                                        type="number"
                                        id='from'
                                        placeholder='From'
                                        value={price.from}
                                        onChange={event => setPrice(prev => ({ ...prev, from: event.target.value }))}
                                    />
                                </div>
                                <div className='flex items-center gap-1'>
                                    <label htmlFor="to">$</label>
                                    <input
                                        className='form-input border-none bg-gray-200 w-[150px]'
                                        type="number"
                                        id='to'
                                        placeholder='To'
                                        value={price.to}
                                        onChange={event => setPrice(prev => ({ ...prev, to: event.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(SearchItem);