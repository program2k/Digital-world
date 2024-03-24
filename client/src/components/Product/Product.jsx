import { formatPrice, renderStars } from "../../utils/helper.js";
import label from "../../assets/label.png";
import label_new from "../../assets/label-new.png";
import SelectOption from "../SelectOption.jsx";
import icons from "../../utils/icons.js";
import { memo, useState } from "react";
import { Link } from 'react-router-dom';
import withBase from '../../HOCS/withBase.js';
import DetailProduct from "../../pages/public/DetailProduct.jsx";
import { showModal } from "../../store/appReducer.js";
import { apiUpdateUserCart } from "../../APIs/user.js";
import { toast } from "react-toastify";
import { getUser } from "../../store/asyncUserAction.js";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import path from "../../utils/path.js";

const Product = ({ productData, navigate, isNew, dispatch }) => {
    const { AiFillEye, BsFillSuitHeartFill, BiCartAdd, BsFillCartCheckFill } = icons;
    const { current } = useSelector(state => state.userReducer);
    const [isShowOption, setIsShowOption] = useState(false);

    const handleOnMouseEnter = (event) => {
        event.stopPropagation();
        setIsShowOption(true);
    };

    const handleOnMouseLeave = (event) => {
        event.stopPropagation();
        setIsShowOption(false);
    };

    const handleClickOptions = async (event, flag) => {
        event.stopPropagation();
        if (!current) {
            Swal.fire({
                icon: 'info',
                confirmButtonText: 'Đi tới trang đăng nhập',
                cancelButtonText: 'Không phải bây giờ',
                text: 'Vui lòng đăng nhập để sử dụng các chức năng này',
                showCancelButton: true,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    navigate(`/${path.LOGIN}`);
                }
            })
            return;
        }
        if (flag === 'CART') {
            const response = await apiUpdateUserCart({
                p_id: productData?._id,
                color: productData?.color,
                images: productData?.images,
                title: productData?.title,
                price: productData?.price,
                quantity: 1
            });
            if (response.message === 'Updated cart successfully') {
                toast.success('Thêm giỏ hàng thành công');
                dispatch(getUser());
            } else {
                toast.error('Thêm giỏ hàng thất bại');
            }
        }
        if (flag === 'QUICK_VIEW') {
            dispatch(showModal({
                isShowModal: true,
                modalChildren: <DetailProduct isQuickView={true} />
            }))
        }
        if (flag === 'WISH_LIST') {
            console.log('Wish list')
        }
    };

    return (
        <div className="w-full text-base px-[10px]">
            <div
                className="w-full border p-[15px] flex flex-col items-center"
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
            >
                <div className="w-full relative">
                    <div className="relative">
                        {isShowOption && <div className="absolute flex left-0 right-0 justify-center bottom-0 gap-2 animate-slide-top">
                            <span title="Quick view" onClick={(event) => handleClickOptions(event, 'QUICK_VIEW')}><SelectOption icon={<AiFillEye color="red" />} /></span>
                            {current?.carts?.some(element => element.product._id === productData?._id) ?
                                <span title="Added cart"><SelectOption icon={<BsFillCartCheckFill color="green" />} /></span>
                                :
                                <span title="Add to cart" onClick={(event) => handleClickOptions(event, 'CART')}><SelectOption icon={<BiCartAdd color="red" />} /></span>
                            }
                            <span title="Add to wishlist" onClick={(event) => handleClickOptions(event, 'WISH_LIST')}><SelectOption icon={<BsFillSuitHeartFill color="red" />} /></span>
                        </div>}
                        <Link to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`}>
                            <img src={productData?.images[0] || ''} alt="image" className="w-full object-cover" />
                        </Link>
                        {isNew === true ?
                            <img src={label_new} alt="label" className="absolute top-[-15px] left-[-20px] w-[100px] h-[35px] object-cover" />
                            :
                            <img src={label} alt="label_new" className="absolute top-[-15px] left-[-20px] w-[100px] h-[35px] object-cover" />
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-1 items-start w-full">
                    <span className="flex mt-4">{renderStars(productData?.totalRatings)}</span>
                    <span className="line-clamp-1">{productData?.title}</span>
                    <span>{formatPrice(productData?.price)} VND</span>
                </div>
            </div>
        </div>
    )
}

export default withBase(memo(Product));     