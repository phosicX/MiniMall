<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const nickname = ref('')
const password = ref('')
const promptMessage = ref('请输入昵称和密码')
const isLoading = ref(false)
const isError = ref(false)

const nicknameFilled = computed(() => nickname.value.length > 0)
const passwordFilled = computed(() => password.value.length > 0)

const goBack = () => { router.back()}

const handleLogin = async () => {
  isError.value = false
  if (!nickname.value || !password.value) {
    promptMessage.value = '请填写完整的登录信息'
    isError.value = true
    return
  }
  
  isLoading.value = true
  promptMessage.value = '请输入昵称和密码'
  
  const result = await store.dispatch('auth/login', {
    nickname: nickname.value,
    password: password.value
  })
  
  isLoading.value = false
  
  if (result.success) { router.push('/mine') } 
  else {
    promptMessage.value = result.message
    isError.value = true
  }
}
</script>

<template>
  <div class="login-container">

    <div class="login-inner">
      <button class="back-btn" @click="goBack"><div class="down-arrow-icon"></div>返回</button>
      <form action="" class="login-form" @submit.prevent="handleLogin">
        <h1>登入您的账户</h1>
        <strong 
          class="prompt-message"
          :class="{ error: isError }"
        >
          {{ promptMessage }}
        </strong>

        <div class="form-group">
          <input
            type="text"
            id="nickname"
            class="form-input"
            :class="{ filled: nicknameFilled }"
            v-model="nickname"
          >
          <label for="nickname" class="input-label">昵称</label>
        </div>

        <div class="form-group">
          <input
            type="password"
            id="password"
            class="form-input"
            :class="{ filled: passwordFilled }"
            v-model="password"
          >
          <label for="password" class="input-label">密码</label>
        </div>

        <p class="to-signup">还没有账户？<router-link to="/signup" replace><strong class="signup-link">立即注册</strong></router-link></p>

        <button 
          type="submit" 
          class="login-btn" 
          :disabled="isLoading"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div> 

  </div>
</template>

<style scoped>
.login-container {
  height: 100%;
  display: grid;
  place-items: center;
  background-color: var(--bg-color);
}

.login-inner {
  padding: 60px 0;
  width: 100%;
  box-shadow: var(--shadow-md) var(--shadow-color);
  position: relative;
}

.back-btn {
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.down-arrow-icon {
  width: 18px;
  height: 18px;
  rotate: 90deg;
}

h1 { font-size: 30px; }

.login-form {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  animation: scaleIn var(--duration-def);
}

.prompt-message {
  font-size: 20px;
  margin: 30px 0 20px;
}

.error { color: var(--key-color);}

.form-group {
  width: 300px;
  position: relative;
  margin: 10px 0;
}

.form-group label {
  position: absolute;
  top: 50%;
  left: 10px;
  font-size: 14px;
  transform: translateY(-50%);
  transition: var(--duration-def);
}

.form-group label::after {
  content: '';
  position: absolute;
  top: 55%;
  bottom: 30%;
  left: -2px;
  right: -2px;
  background: var(--bg-color);
  transition: var(--duration-def);
  z-index: -1;
}

.form-input {
  width: 100%;
  padding: 6px 10px;
  border: 2px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 16px;
  transition: var(--duration-def);
  outline: none;
}

.form-input:focus {
  outline-color: var(--indicator-color);
  border-width: 2px;
  border-color: var(--indicator-color);
}

.form-input:focus + .input-label,
.form-input.filled + .input-label {
  transform: translateY(-150%);
  font-size: 13px;
}

.form-input:focus + .input-label { color: var(--indicator-color);}

.to-signup {
  margin: 20px 0;
  font-size: 16px;
}

.signup-link { color: var(--indicator-color); }

.login-btn {
  font-size: 16px;
  padding: 5px 0;
  width: 200px;
  border: 2px solid var(--btn-border);
  background: var(--btn-color);
}

.login-btn:disabled { opacity: 0.6;}
</style>