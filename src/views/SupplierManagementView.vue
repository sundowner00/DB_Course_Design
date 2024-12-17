<template>
    <div class="supplier-management-container">
        <h1>供应商管理</h1>

        <!-- 搜索供应商 -->
        <div class="search-bar">
            <input type="number" v-model="searchId" placeholder="输入供应商 ID 搜索" @input="handleSearch" />
            <button @click="handleSearch" class="btn btn-primary">搜索</button>
        </div>

        <!-- 供应商列表 -->
        <div v-if="suppliers.length" class="supplier-list">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>供应商名称</th>
                        <th>联系电话</th>
                        <th>供应信息</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="supplier in suppliers" :key="supplier.id">
                        <td>{{ supplier.id }}</td>
                        <td>{{ supplier.name }}</td>
                        <td>{{ supplier.phoneNumber }}</td>
                        <td>{{ supplier.supplyInfo }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 搜索到的单个供应商信息 -->
        <div v-if="singleSupplier" class="single-supplier">
            <h3>供应商详情</h3>
            <p><strong>ID:</strong> {{ singleSupplier.id }}</p>
            <p><strong>名称:</strong> {{ singleSupplier.name }}</p>
            <p><strong>联系电话:</strong> {{ singleSupplier.phoneNumber }}</p>
            <p><strong>供应信息:</strong> {{ singleSupplier.supplyInfo }}</p>
        </div>

        <!-- 如果没有供应商数据 -->
        <p v-if="suppliers.length === 0 && !singleSupplier">暂无供应商信息</p>

        <!-- 测试区域 -->
        <div class="test-area">
            <h2>添加供应商（测试区域）</h2>
            <form @submit.prevent="handleAddSupplier">
                <div class="form-group">
                    <label for="id">供应商ID</label>
                    <input type="number" v-model="newSupplier.id" id="id" placeholder="输入供应商ID" required />
                </div>
                <div class="form-group">
                    <label for="name">供应商名称</label>
                    <input type="text" v-model="newSupplier.name" id="name" placeholder="输入供应商名称" required />
                </div>
                <div class="form-group">
                    <label for="phoneNumber">联系电话</label>
                    <input type="text" v-model="newSupplier.phoneNumber" id="phoneNumber" placeholder="输入联系电话"
                        required />
                </div>
                <div class="form-group">
                    <label for="supplyInfo">供应信息</label>
                    <input type="text" v-model="newSupplier.supplyInfo" id="supplyInfo" placeholder="输入供应信息" required />
                </div>
                <button type="submit" class="btn btn-primary">提交</button>
            </form>

            <div v-if="responseMessage" class="response-message">
                <p :class="responseClass">{{ responseMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "SupplierManagementView",
    data() {
        return {
            suppliers: [], // 存储所有供应商信息
            singleSupplier: null, // 存储单个供应商信息（搜索结果）
            searchId: "", // 搜索的供应商 ID
            newSupplier: { // 用于存储新供应商数据
                id: "",
                name: "",
                phoneNumber: "",
                supplyInfo: "",
            },
            responseMessage: "", // 显示POST请求的响应消息
            responseClass: "", // 响应消息的样式（成功或失败）
        };
    },
    methods: {
        async fetchSuppliers() {
            try {
                // 获取所有供应商数据
                const response = await axios.get("localhost:8080/supplier");
                if (response.data.code === 1) {
                    this.suppliers = response.data.data; // 设置供应商数据
                } else {
                    console.error(response.data.msg);
                }
            } catch (error) {
                console.error("获取供应商数据失败", error);
            }
        },
        async handleSearch() {
            if (!this.searchId) {
                this.singleSupplier = null;
                return;
            }

            try {
                // 根据供应商ID搜索供应商信息
                const response = await axios.get(`/supplier?id=${this.searchId}`);
                if (response.data.code === 0) {
                    this.singleSupplier = response.data.data; // 设置单个供应商信息
                } else {
                    this.singleSupplier = null;
                    console.error(response.data.msg);
                }
            } catch (error) {
                this.singleSupplier = null;
                console.error("查询失败", error);
            }
        },
        async handleAddSupplier() {
            try {
                // 向 /supplier 发送POST请求，添加新的供应商
                const response = await axios.post("localhost:8080/supplier", this.newSupplier);

                if (response.data.code === 1) {
                    // 处理成功响应
                    this.responseMessage = "供应商信息添加成功！";
                    this.responseClass = "success-message";
                    this.newSupplier = { id: "", name: "", phoneNumber: "", supplyInfo: "" }; // 清空表单
                } else {
                    // 处理失败响应
                    this.responseMessage = response.data.msg || "添加供应商失败！";
                    this.responseClass = "error-message";
                }
            } catch (error) {
                // 处理请求错误
                this.responseMessage = "网络错误，请稍后重试！";
                this.responseClass = "error-message";
            }
        },
    },
    created() {
        this.fetchSuppliers(); // 页面创建时获取所有供应商
    },
};
</script>

<style scoped>
.supplier-management-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    text-align: center;
}

h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

.search-bar {
    margin-bottom: 20px;
}

.search-bar input {
    padding: 8px;
    font-size: 16px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
}

.search-bar button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.search-bar button:hover {
    background-color: #0056b3;
}

.supplier-list {
    margin-top: 20px;
    width: 80%;
    max-width: 1000px;
    overflow-x: auto;
}

.supplier-list table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
}

.supplier-list th,
.supplier-list td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
}

.single-supplier {
    margin-top: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 80%;
    max-width: 1000px;
}

.single-supplier h3 {
    font-size: 20px;
    margin-bottom: 10px;
}

.single-supplier p {
    font-size: 16px;
    margin: 5px 0;
}

.test-area {
    margin-top: 40px;
    width: 80%;
    max-width: 600px;
}

.test-area form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.test-area .form-group {
    display: flex;
    flex-direction: column;
}

.test-area input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.test-area button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.test-area button:hover {
    background-color: #218838;
}

.response-message {
    margin-top: 20px;
    font-size: 18px;
}

.success-message {
    color: green;
}

.error-message {
    color: red;
}
</style>