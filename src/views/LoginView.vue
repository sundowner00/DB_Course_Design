<template>
  <div class="login-container">
    <h1>网上书店管理系统欢迎您</h1>
    <div class="login-box">
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">账号</label>
          <input type="text" id="username" placeholder="请输入账号" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" placeholder="请输入密码" v-model="password" required />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? "登录中..." : "登录" }}
        </button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      loading: false, // 控制按钮加载状态
    };
  },
  methods: {
    async handleLogin() {
      // 验证表单
      if (!this.username || !this.password) {
        this.errorMessage = "账号和密码为必填项！";
        return;
      }

      this.errorMessage = "";
      this.loading = true; // 显示加载状态

      try {
        // 发送 POST 请求
        const response = await axios.post("/login", {
          username: this.username,
          password: this.password,
        });

        // 处理后端返回的响应
        const { code, msg, data } = response.data;
        if (code === 0) {
          console.log("登录成功:", data);
          // 处理登录成功逻辑，比如存储 token 和用户信息
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);

          // 跳转到导航页面
          this.$router.push('/dashboard');
        } else {
          // 后端返回的错误提示
          this.errorMessage = msg || "登录失败，请重试！";
        }
      } catch (error) {
        // 捕获请求错误
        this.errorMessage = error.response?.data?.msg || "网络错误，请稍后重试！";
      } finally {
        this.loading = false; // 取消加载状态
      }
    }
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f8ff;
  margin: 0;
  overflow: hidden;
}

h1 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.login-box {
  width: 300px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not([disabled]) {
  background-color: #0056b3;
}

.error {
  margin-top: 15px;
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>