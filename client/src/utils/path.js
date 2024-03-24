const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    LOGIN_SUCCESS: 'login-success/:oauth2Id/:tokenLogin',
    PRODUCTS: ':category',
    OUR_SERVICES: 'our_services',
    FAQs: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    DETAIL_PRODUCT: 'san-pham',
    DETAIL_CART: 'my-cart',
    BLOGS: 'blogs',
    FINAL_REGISTER: 'finalRegister/:status',
    RESET_PASSWORD: 'resetPassword/:token',

    //Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manageUser',
    MANAGE_PRODUCTS: 'manageProducts',
    MANAGE_ORDER: 'manageOrder',
    CREATE_PRODUCT: 'createProduct',

    //Member
    MEMBER: 'member',
    PERSONAL: 'personal',
    MY_CART: 'my-cart',
    SHOPPING_HISTORY: 'shopping-history',
    WISHLIST: 'wishlist',
    CHECKOUT: 'checkout',
}

export default path;