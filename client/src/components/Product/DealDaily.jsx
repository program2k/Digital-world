import icons from "../../utils/icons";
import { apiGetProducts } from "../../APIs/product";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { formatPrice, renderStars } from "../../utils/helper.js";
import CountdownTimer from '../../components/Common/CountdownTimer';
import Swal from 'sweetalert2';

const DealDaily = () => {
    const { AiFillStar, IoIosMenu } = icons;

    const [dealDaily, setDealDaily] = useState(null);
    const [hour, setHour] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [expiredTime, setExpiredTime] = useState(false);

    const handleExpiredTimePopup = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Thoi gian khuyen mai da het!',
        });
    }

    const handleClickPopup = () => {
        alert('Oke')
    };

    const fetchedDealDaily = async () => {
        const response = await apiGetProducts();
        if (response.message === 'Get all products successfully') {
            const productArr = response.data.products;
            const randomDealDailyIndex = Math.floor(Math.random() * +productArr.length);
            const randomProduct = productArr[randomDealDailyIndex];
            setDealDaily(randomProduct);
        } else {
            return;
        }
    };

    useEffect(() => {
        fetchedDealDaily();
    }, []);

    useEffect(() => {
        if (expiredTime) {
            fetchedDealDaily();
            setHour(0);
            setMinutes(0);
            setSeconds(10);
        }
    }, [expiredTime]);

    useEffect(() => {
        let idInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prev) => prev - 1);
            } else {
                if (minutes > 0) {
                    setMinutes((prev) => prev - 1);
                    setSeconds(60);
                } else {
                    if (hour > 0) {
                        setHour((prev) => prev - 1);
                        setMinutes(60);
                        setSeconds(60);
                    } else {
                        setExpiredTime(true);
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(idInterval);
        }
    }, [hour, minutes, seconds, expiredTime]);



    return (
        <div className="w-full border flex-auto">
            <div className="flex items-center ">
                <span className="flex-1">
                    <AiFillStar color="red" size={20} />
                </span>
                <span className="flex-5 font-bold text-[20px] text-center">Deal Daily</span>
            </div>
            <div className="mt-10 flex flex-col">
                <img src={dealDaily?.images[0]} alt="image" className="w-full object-contain flex justify-center" />
                <span className="mt-4 text-center">{dealDaily?.title}</span>
                <span className="flex mt-4 items-center">{renderStars(dealDaily?.totalRatings)}</span>
                {/* <span className="flex mt-4 items-center">{formatPrice(dealDaily?.price)} VND</span> */}
            </div>
            <div className="px-4 mt-4">
                <div className="flex justify-center gap-2 items-center mb-4">
                    <CountdownTimer number={hour} unit={'Hour'} />
                    <CountdownTimer number={minutes} unit={'Minutes'} />
                    <CountdownTimer number={seconds} unit={'Seconds'} />
                </div>
                <button
                    type="button"
                    className="flex w-2/3 gap-4 mt-4 items-center justify-center bg-main hover:bg-gray-800 text-white font-medium py-2"
                    onClick={(hour === 0 && minutes === 0 && seconds === 0) ? handleExpiredTimePopup : handleClickPopup}
                >
                    <IoIosMenu />
                    <span>Option</span>
                </button>
            </div>
        </div>
    )
}

export default memo(DealDaily);