<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const nickname = ref('')
const password = ref('')
const confirmPassword = ref('')
const promptMessage = ref('请输入昵称和密码')
const isLoading = ref(false)
const isError = ref(false)

const nicknameFilled = computed(() => nickname.value.length > 0)
const passwordFilled = computed(() => password.value.length > 0)
const confirmPasswordFilled = computed(() => confirmPassword.value.length > 0)

const goBack = () => { router.back() }

const handleSignup = async () => {
  isError.value = false
  if (!nickname.value || !password.value) {
    promptMessage.value = '请填写完整的注册信息'
    isError.value = true
    return
  }
  
  if (password.value !== confirmPassword.value) {
    promptMessage.value = '两次输入的密码不一致'
    isError.value = true
    return
  }
  
  if (password.value.length < 6) {
    promptMessage.value = '密码长度至少为6位'
    isError.value = true
    return
  }
  
  isLoading.value = true
  promptMessage.value = '请输入昵称和密码'
  
  const result = await store.dispatch('auth/signup', {
    nickname: nickname.value,
    password: password.value
  })
  
  isLoading.value = false
  
  if (result.success) { 
    router.push('/mine')
  } else { 
    promptMessage.value = result.message
    isError.value = true
  }
}
</script>

<template>
  <div class="signup-container">

    <div class="signup-inner">
      <button class="back-btn" @click="goBack"><div class="down-arrow-icon"></div>返回</button>
      <form action="" class="signup-form" @submit.prevent="handleSignup">
        <h1>请注册您的账户</h1>
        <strong 
          class="prompt-message"
          :class="{ error: isError}"
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

        <div class="form-group">
          <input
            type="password"
            id="confirmPassword"
            class="form-input"
            :class="{ filled: confirmPasswordFilled }"
            v-model="confirmPassword"
          >
          <label for="confirmPassword" class="input-label">确认密码</label>
        </div>

        <p class="to-login">已有账户？<router-link to="/login" replace><strong class="login-link">立即登录</strong></router-link></p>

        <button 
          type="submit" 
          class="signup-btn" 
          :disabled="isLoading">
          {{ isLoading ? '注册中...' : '注册' }}
        </button>
      </form>
    </div> 

  </div>
</template>

<style scoped>
.signup-container {
  height: 100%;
  display: grid;
  place-items: center;
  background-color: var(--bg-color);
}

.signup-inner {
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

.signup-form {
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

.to-login {
  margin: 20px 0;
  font-size: 16px;
}

.login-link { color: var(--indicator-color); }

.signup-btn {
  font-size: 16px;
  padding: 5px 0;
  width: 150px;
  border: 2px solid var(--btn-border);
  background: var(--btn-color);
}

.signup-btn:disabled { opacity: 0.6;}
</style>