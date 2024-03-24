import React, { memo, useCallback, useEffect, useState } from "react";
import { createSearchParams, useParams } from "react-router-dom";
import { apiGetProductById } from "../../APIs/product";
import { apiGetCategories } from "../../APIs/app.js";
import BreadCrumb from "../../components/Common/BreadCrumb";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { formatPrice, renderStars } from "../../utils/helper";
import Button from "../../components/Button/Button";
import SelectQuantity from "../../components/Common/SelectQuantity";
import ProductExtraInfo from "../../components/Product/ProductExtraInfo";
import { productExtraInfos } from "../../utils/constants.js";
import ProductInfomation from "../../components/Product/ProductInfomation";
import Product from "../../components/Product/Product";
import DOMPurify from "dompurify";
import clsx from "clsx";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiUpdateUserCart } from "../../APIs/user";
import { toast } from "react-toastify";
import withBase from "../../HOCS/withBase";
import { getUser } from "../../store/asyncUserAction";
import path from "../../utils/path";

/**
 * Render the detail product view.
 *
 * @param {boolean} isQuickView - Whether the view is a quick view or not.
 * @param {function} dispatch - The dispatch function.
 * @param {function} navigate - The navigate function.
 * @param {object} location - The location object.
 * @return {JSX.Element} The detail product view.
 */
const DetailProduct = ({ isQuickView, dispatch, navigate, location }) => {
  const { pid, category } = useParams();
  const { current } = useSelector((state) => state.userReducer);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);
  const [update, setUpdate] = useState(false);
  const [variant, setVariant] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    price: "",
    images: [],
    color: "",
  });

  const settings = {
    dots: false,
    infinite: false,
    speed: 250,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const fetchedProductById = async () => {
    const response = await apiGetProductById(pid);
    if (response.message === "Get product successfully") {
      setProduct(response.data);
      setCurrentImg(response.data.images[0]);
    }
  };

  useEffect(() => {
    if (variant) {
      setCurrentProduct({
        title: product?.variants?.find((element) => element.sku === variant)
          ?.title,
        price: product?.variants?.find((element) => element.sku === variant)
          ?.price,
        images: product?.variants?.find((element) => element.sku === variant)
          ?.images,
        color: product?.variants?.find((element) => element.sku === variant)
          ?.color,
      });
    } else {
      setCurrentProduct({
        title: product?.title,
        price: product?.price,
        images: product?.images || [],
        color: product?.color,
      });
    }
  }, [variant]);

  useEffect(() => {
    if (pid) {
      fetchedProductById();
    }
    window.scrollTo(0, 0);
  }, [pid]);

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  useEffect(() => {
    if (pid) {
      fetchedProductById();
    }
  }, [update]);

  const fetchedProducts = async () => {
    const response = await apiGetCategories({ title: category });
    if (response.message === "Success") {
      setRelatedProducts(
        response?.ProductCategories?.map((category) => category.products)
      );
    }
  };

  useEffect(() => {
    fetchedProducts();
  }, [category]);

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) {
        return;
      }
      if (flag === "minus") {
        setQuantity((prev) => +prev - 1);
      }
      if (flag === "plus") {
        setQuantity((prev) => +prev + 1);
      }
    },
    [quantity]
  );

  const handleAddToCart = async () => {
    if (!current) {
      Swal.fire({
        icon: "info",
        confirmButtonText: "Đi tới trang đăng nhập",
        cancelButtonText: "Không phải bây giờ",
        text: "Vui lòng đăng nhập để sử dụng các chức năng này",
        showCancelButton: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
        }
      });
      return;
    }
    const response = await apiUpdateUserCart({
      p_id: pid || product._id,
      color: currentProduct.color || product.color,
      images: currentProduct.images[0] || product.images[0],
      quantity: quantity,
      price: currentProduct.price || product.price,
      title: currentProduct.title || product.title,
    });
    if (response.message === "Updated cart successfully") {
      toast.success("Thêm giỏ hàng thành công");
      dispatch(getUser());
    } else if (response.message === "Updated quantity") {
      toast.success("Đã cập nhật số lượng");
    } else {
      toast.error("Thêm giỏ hàng thất bại");
    }
  };

  return (
    <div className="w-full relative">
      {!isQuickView && (
        <div className="h-[81px] bg-gray-100 flex items-center justify-center">
          <div className="w-main">
            <h3 className="font-extrabold text-[20px]">
              {`${
                currentProduct?.title !== product?.title
                  ? product?.title
                  : currentProduct?.title
              }`}
            </h3>
            <BreadCrumb
              title={
                currentProduct?.title !== product?.title
                  ? product?.title
                  : currentProduct?.title
              }
              category={category}
            />
          </div>
        </div>
      )}
      <div className="w-full m-auto mt-4 flex">
        <div className="border border-blue flex-4 flex flex-col gap-4">
          <div className="flex items-center justify-center">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "",
                  isFluidWidth: true,
                  src:
                    currentProduct?.title !== product?.title
                      ? product?.images[0]
                      : currentProduct?.images[0],
                },
                largeImage: {
                  src:
                    currentProduct?.title !== product?.title
                      ? product?.images[0]
                      : currentProduct?.images[0],
                  width: 1200,
                  height: 1800,
                },
              }}
            />
          </div>
          {/* <div className='w-full'>
                        <Slider {...settings}>
                            {product?.images?.map((element, index) => (
                                <div key={index} className='flex w-full gap-3'>
                                    <img onClick={event => handleImage(event, element)} src={element} alt="abc" className='h-[143px] w-[143px] border object-cover' />
                                </div>
                            ))}
                        </Slider>
                    </div> */}
        </div>
        <div className=" flex-4">
          <div className="ml-5 mr-5 flex flex-col">
            <div className="flex justify-between">
              <h2 className="text-[30px] font-semibold">{`${formatPrice(
                currentProduct?.title !== product?.title
                  ? product?.price
                  : currentProduct?.price
              )} VND`}</h2>
              <span className="text-sm text-main mt-3 mr-3">{`Kho: ${product?.quantity}`}</span>
            </div>
            <div className="flex mt-4 gap-2">
              {renderStars(product?.totalRatings)}
              <span className="text-sm text-main italic">{`(Da ban: ${product?.sold})`}</span>
            </div>
            <ul className="list-item list-square mt-4 text-gray-500">
              {product?.description.length > 1 &&
                product?.description?.map((element, index) => (
                  <li key={index} className="leading-8">
                    {element}
                  </li>
                ))}
              {product?.description.length === 1 && (
                <div
                  className="text-sm"
                  dengerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product?.description[0]),
                  }}
                ></div>
              )}
            </ul>
            <div className="my-4 flex gap-4">
              <span className="font-bold">Color:</span>
              <div className="flex flex-wrap gap-4 w-full items-center">
                <div
                  className={clsx(
                    "flex gap-2 items-center p-2 border cursor-pointer"
                  )}
                  onClick={() => setVariant(null)}
                >
                  <img
                    src={product?.images[0]}
                    alt="images"
                    className="w-12 h-12 object-cover"
                  />
                  <span className="flex flex-col gap-2">
                    <span>{product?.color}</span>
                    <span className="text-sm">{product?.price}</span>
                  </span>
                </div>
                {product?.variants?.map((element, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "flex gap-2 items-center p-2 border cursor-pointer",
                      variant === element.sku ? "border-main" : ""
                    )}
                    onClick={() => setVariant(element.sku)}
                  >
                    <img
                      src={element?.images[0]}
                      alt="images"
                      className="w-12 h-12 object-cover"
                    />
                    <span className="flex flex-col gap-2">
                      <span>{element?.color}</span>
                      <span className="text-sm">
                        {formatPrice(element?.price)}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-sm flex flex-col gap-8 mt-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Quantity</span>
                <SelectQuantity
                  quantity={quantity}
                  handleQuantity={handleQuantity}
                  handleChangeQuantity={handleChangeQuantity}
                />
              </div>
              <Button handleOnClick={handleAddToCart} fw name="Add to cart" />
            </div>
          </div>
        </div>
        {!isQuickView && (
          <div className="ml-5 flex-2">
            {productExtraInfos?.map((element, index) => (
              <ProductExtraInfo
                key={index}
                title={element.title}
                icon={element.icon}
                sub={element.sub}
              />
            ))}
          </div>
        )}
      </div>
      {!isQuickView && (
        <div className="w-main m-auto mt-6">
          <ProductInfomation
            totalRatings={product?.totalRatings}
            ratings={product?.ratings}
            productName={product?.title}
            pid={product?._id}
            rerender={rerender}
          />
        </div>
      )}
      {!isQuickView && (
        <div className="w-full">
          <div className="flex justify-between border-b-2 mt-4 border-main">
            <h3 className="text-[20px] font-semibold py-[15px]">
              OTHER CUSTOMERS ALSO BUY:
            </h3>
          </div>
          <Slider {...settings}>
            <div className="flex justify-center">
              {relatedProducts?.map((element, index) => (
                <div
                  key={index}
                  className="mt-6 flex w-[1000px] justify-start items-center"
                >
                  {element?.map((element, index) => (
                    <Product key={index} productData={element} />
                  ))}
                </div>
              ))}
            </div>
          </Slider>
        </div>
      )}
      <div className="h-[100px]"></div>
    </div>
  );
};

export default withBase(memo(DetailProduct));
