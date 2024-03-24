import Banner from "../../components/Common/Banner";
import Sidebar from "../../components/SideBar/Sidebar";
import BestSeller from "../../components/Product/BestSeller";
import DealDaily from "../../components/Product/DealDaily";
import FeaturedProducts from "../../components/Product/FeaturedProducts";
import NewArrvals from "../../components/NewArrvals";
import HotCollection from "../../components/HotCollection";
import BlogPosts from "../../components/BlogPosts";
import { memo } from "react";

const Home = () => {

    return (
        <div className="mt-6">
            <div className="w-main flex">
                <div className="flex flex-col gap-5 w-[20%] flex-auto">
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className="flex flex-col gap-5 pl-5 w-[80%] flex-auto">
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className="my-8">
                <FeaturedProducts />
            </div>
            <div className="my-8">
                <NewArrvals />
            </div>
            <div className="my-8">
                <HotCollection />
            </div>
            <div className="my-8">
                <BlogPosts />
            </div>
        </div>
    )
}

export default memo(Home);