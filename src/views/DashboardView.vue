<template>
    <div class="dashboard-container">
      <h1 class="title">欢迎来到书店管理系统</h1>
      <div class="grid-container">
        <div class="grid-item" @click="navigateTo('/book-inventory')">
          <span class="icon">📚</span>
          <h3>供书目录及库存管理</h3>
        </div>
        <div class="grid-item" @click="navigateTo('/purchase-management')">
          <span class="icon">🛒</span>
          <h3>采购管理</h3>
        </div>
        <div class="grid-item" @click="navigateTo('/customer-management')">
          <span class="icon">👤</span>
          <h3>客户管理</h3>
        </div>
        <div class="grid-item" @click="navigateTo('/order-management')">
          <span class="icon">📦</span>
          <h3>顾客订单管理</h3>
        </div>
        <div class="grid-item" @click="navigateTo('/supplier-management')">
          <span class="icon">🏢</span>
          <h3>供应商管理</h3>
        </div>
        <div class="grid-item" @click="navigateTo('/search')">
          <span class="icon">🔍</span>
          <h3>网上浏览查询</h3>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DashboardView',
    methods: {
      navigateTo(path) {
        this.$router.push(path);
      }
    }
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f4;
    text-align: center;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 30px;
    color: #333;
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    width: 80%; /* 限制最大宽度 */
    max-width: 900px; /* 最大宽度 */
    margin: 0 auto; /* 居中 */
    padding: 20px;
  }
  
  .grid-item {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .grid-item:hover {
    transform: scale(1.05);
  }
  
  .icon {
    font-size: 40px;
    margin-bottom: 10px;
    color: #007bff;
  }
  
  h3 {
    font-size: 18px;
    color: #333;
  }
  
  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: repeat(2, 1fr); /* 在小屏幕上每行显示2个功能项 */
    }
  }
  
  @media (max-width: 480px) {
    .grid-container {
      grid-template-columns: 1fr; /* 在超小屏幕上每行显示1个功能项 */
    }
  }
  </style>
  