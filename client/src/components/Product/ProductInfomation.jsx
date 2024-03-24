import React, { memo, useState } from 'react';
import { tabs } from '../../utils/constants.js';
import VoteBar from '../Vote/VoteBar.jsx';
import { renderStars } from '../../utils/helper.js';
import { apiRating } from '../../APIs/product.js';
import Button from '../../components/Button/Button.jsx';
import VoteOption from '../../components/Vote/VoteOption.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../store/appReducer.js';
import { toast } from "react-toastify";
import path from '../../utils/path.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Comment from '../Vote/Comment.jsx';

const ProductInfomation = ({ totalRatings, ratings, productName, pid, rerender }) => {
    const [activeTab, setActiveTab] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogin } = useSelector(state => state.userReducer);
    // const { isOauth2Login } = useSelector(state => state.oauth2Reducer);

    const handleSubmitVoteOptions = async ({ comment, score }) => {
        if (!comment || !score) {
            alert('Vui lòng điền đầy đủ thông tin đánh giá về sản phẩm');
            return;
        }
        if (comment.length <= 6) {
            toast.error('Bình luận của bạn quá ngắn, vui lòng nhập lại', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        const response = await apiRating({
            star: score,
            comment: comment,
            _id: pid,
            updatedAt: Date.now()
        });
        console.log(response);
        console.log({ comment, score, pid })
        if (response.messagage === 'success') {
            toast.success('Digital World đã nhận được phản hồi của bạn!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,    
                progress: undefined,
                theme: "colored",
            });
            dispatch(showModal({
                isShowModal: false,
                modalChildren: null,
            }));
            rerender();
        }
    };

    const handleVote = () => {
        if (!isLogin) {
            Swal.fire({
                text: 'Vui lòng đăng nhập để gửi đánh giá',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Di toi trang dang nhap',
                showCancelButton: true
            }).then((response) => {
                if (response.isConfirmed) {
                    navigate(`/${path.LOGIN}`);
                }
            });
        } else {
            dispatch(showModal({
                isShowModal: true,
                modalChildren: <VoteOption productName={productName} handleSubmitVoteOptions={handleSubmitVoteOptions} />
            }));
        }
    };

    return (
        <div>
            <div className='flex items-center gap-2 relative bottom-[-1px]'>
                {tabs?.map((element, index) => (
                    <span
                        key={index}
                        className={`py-2 px-4 cursor-pointer ${activeTab === +element.id ? 'bg-white border border-b-0' : ' bg-gray-200'}`}
                        onClick={() => setActiveTab(element.id)}
                    >
                        {element.title}
                    </span>
                ))}
                <span
                    className={`py-2 px-4 cursor-pointer ${activeTab === 5 ? 'bg-white border border-b-0' : ' bg-gray-200'}`}
                    onClick={() => setActiveTab(5)}
                >
                    CUSTOMER REVIEWS
                </span>
            </div>
            <div className='w-full border'>
                <span className=' font-semibold'>
                    {tabs?.some((element) => element.id === activeTab) && tabs?.find((element) => element.id === activeTab)?.content.toUpperCase()}
                </span>
                <p className='mt-4'>
                    {tabs?.some((element) => element.id === activeTab) && tabs?.find((element) => element.id === activeTab)?.paragraph}
                    {activeTab === 5 && (
                        <div className='flex flex-col'>
                            <div className='flex p-4'>
                                <div className='flex-4 flex flex-col justify-center items-center border-r border-b'>
                                    <span className='font-semibold text-2xl'>{`${totalRatings}/5`}</span>
                                    <span className='flex items-center gap-1'>{renderStars(totalRatings)?.map((element, index) => (
                                        <span key={index}>{element}</span>
                                    ))}</span>
                                    <span className='text-sm'>{`${ratings?.length} đánh giá và nhận xét`}</span>
                                </div>
                                <div className='flex-6 flex flex-col border-b gap-1'>
                                    {Array.from(Array(5).keys()).reverse().map(element => (
                                        <VoteBar
                                            key={element}
                                            number={element + 1}
                                            ratingTotal={ratings?.length}
                                            ratingCount={ratings?.filter(rating => rating.star === element + 1)?.length}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='flex items-center justify-center flex-col'>
                                <span>Bạn đánh giá sao sản phẩm này?</span>
                                <Button name='Đánh giá ngay' style='' handleOnClick={handleVote} />
                            </div>
                            <div className='flex flex-col gap-4'>
                                {ratings?.map((element, index) => (
                                    <Comment 
                                        key={index}
                                        star={element.star}
                                        updatedAt={element.updatedAt}
                                        comment={element.comment}
                                        name={`${element.postedBy?.firstName} ${element.postedBy?.lastName}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </p>
            </div>
        </div>
    );
};

export default memo(ProductInfomation);