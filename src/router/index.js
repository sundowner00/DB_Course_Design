import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue'; // 导航页面视图
// import BookInventoryView from '../views/BookInventoryView.vue';  // 书目录和库存管理页面
// import PurchaseManagementView from '../views/PurchaseManagementView.vue';  // 采购管理页面
// import CustomerManagementView from '../views/CustomerManagementView.vue';  // 客户管理页面
// import OrderManagementView from '../views/OrderManagementView.vue';  // 顾客订单和发货管理页面
import SupplierManagementView from '../views/SupplierManagementView.vue';  // 供应商管理页面
// import SearchView from '../views/SearchView.vue';  // 网上浏览查询页面

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
  },
  // {
  //   path: '/book-inventory',
  //   name: 'BookInventory',
  //   component: BookInventoryView,
  // },
  // {
  //   path: '/purchase-management',
  //   name: 'PurchaseManagement',
  //   component: PurchaseManagementView,
  // },
  // {
  //   path: '/customer-management',
  //   name: 'CustomerManagement',
  //   component: CustomerManagementView,
  // },
  // {
  //   path: '/order-management',
  //   name: 'OrderManagement',
  //   component: OrderManagementView,
  // },
  {
    path: '/supplier-management',
    name: 'SupplierManagement',
    component: SupplierManagementView,
  },
  // {
  //   path: '/search',
  //   name: 'Search',
  //   component: SearchView,
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

