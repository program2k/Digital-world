import path from './path.js';
import icons from './icons.js';

export const navigations = [
    { id: 1, value: 'PRODUCTS', path: `/${path.PRODUCTS}` },
    { id: 2, value: 'BLOGS', path: `/${path.BLOGS}` },
    { id: 3, value: 'OUR SERVICES', path: `/${path.OUR_SERVICES}` },
    { id: 4, value: 'FAQs', path: `/${path.FAQs}` },
    { id: 5, value: 'HOME', path: `/${path.HOME}` },
]

const { RiTruckFill, BsShieldShaded, FaTty, AiFillGift, BsReplyFill } = icons;

export const productExtraInfos = [
    { id: 1, title: 'Guarantee', sub: 'Quality Checked', icon: <BsShieldShaded /> },
    { id: 2, title: 'Free Shipping', sub: 'Free On All Products', icon: <RiTruckFill /> },
    { id: 3, title: 'Special Gift Cards', sub: 'Special Gift Cards', icon: <AiFillGift /> },
    { id: 4, title: 'Free Return', sub: 'Within 7 Days', icon: <BsReplyFill /> },
    { id: 5, title: 'Consultancy', sub: 'Lifetime 24/7/356', icon: <FaTty /> }
]

export const tabs = [
    {
        id: 1,
        title: 'DESCRIPTION',
        paragraph: 'Description',
        content: ''
    },
    {
        id: 2,
        title: 'WARRANTY',
        content: 'WARRANTY INFORMATION',
        paragraph: `
        Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
        
        Frames Used In Upholstered and Leather Products
        Limited Lifetime Warranty
        A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`
    },
    {
        id: 3,
        title: 'DELIVERY',
        content: 'PURCHASING & DELIVERY',
        paragraph: `Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
    },
    {
        id: 4,
        title: 'PAYMENT',
        content: 'PURCHASING & DELIVERY',
        paragraph: `Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
    },
];

export const colors = [
    'Xanh Botanic',
    'Deep Purple',
    'Xanh Xám',
    'white',
    'pink',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue',
];

export const sortDatas = [
    { id: 1, value: '-sold', text: 'Best Selling' },
    { id: 2, value: '-createdAt', text: 'New Arrivals' },
    { id: 3, value: 'title', text: 'A - Z' },
    { id: 4, value: '-title', text: 'Z - A' },
    { id: 5, value: '-price', text: 'Price, high to low' },
    { id: 6, value: 'price', text: 'Price, low to high' },
];

export const voteOptions = [
    { id: 1, text: 'Terrible' },
    { id: 2, text: 'Bad' },
    { id: 3, text: 'Normal' },
    { id: 4, text: 'Good' },
    { id: 5, text: 'Perfect' },
];

const { BsFileBarGraph, MdGroups, PiArchiveBold, BiCartDownload } = icons;
export const adminSidebars = [
    { id: 1, text: 'Dashboard', type: 'single', path: `/${path.ADMIN}/${path.DASHBOARD}`, icon: <BsFileBarGraph /> },
    { id: 2, text: 'Manage users', type: 'single', path: `/${path.ADMIN}/${path.MANAGE_USER}`, icon: <MdGroups /> },
    { id: 3, text: 'Manage products', type: 'parent', path: `/${path.ADMIN}/${path.DASHBOARD}`, icon: <PiArchiveBold />, submenu: [{ text: 'Create product', path: `/${path.ADMIN}/${path.CREATE_PRODUCT}` }, { text: 'Manage product', path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}` }] },
    { id: 4, text: 'Manage order', type: 'single', path: `/${path.ADMIN}/${path.DASHBOARD}`, icon: <BiCartDownload /> },
    { id: 5, text: 'Dashboard', type: 'single', path: `/${path.ADMIN}/${path.DASHBOARD}`, icon: <BsFileBarGraph /> },

]

export const memberSidebars = [
    { id: 1, text: 'Personal', type: 'single', path: `/${path.MEMBER}/${path.PERSONAL}`, icon: <BsFileBarGraph /> },
    { id: 2, text: 'My cart', type: 'single', path: `/${path.MEMBER}/${path.MY_CART}`, icon: <MdGroups /> },
    { id: 3, text: 'Shopping history', type: 'single', path: `/${path.MEMBER}/${path.SHOPPING_HISTORY}`, icon: <BiCartDownload /> },
    { id: 4, text: 'Wish list', type: 'single', path: `/${path.MEMBER}/${path.WISHLIST}`, icon: <BsFileBarGraph /> },

]

export const statusOrder = [
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Success', value: 'Success' }
]