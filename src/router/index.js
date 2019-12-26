import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
    import ('views/home/Home')
const Category = () =>
    import ('views/category/Category')
const Cart = () =>
    import ('views/cart/Cart')
const Profile = () =>
    import ('views/profile/Profile')

//1.安装插件
Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/category',
        name: 'Category',
        component: Category
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }
]

//2.创建router
const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router