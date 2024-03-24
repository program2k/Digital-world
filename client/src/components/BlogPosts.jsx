import React, { memo } from 'react';

const BlogPosts = () => {
    return (
        <div className='w-full'>
            <div className='flex justify-between border-b-2 mt-4 border-main'>
                <h3 className='text-[20px] font-semibold py-[15px]'>BLOG POSTS</h3>
            </div>
        </div>
    );
};

export default memo(BlogPosts);