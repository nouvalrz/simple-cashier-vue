<script>
import loginHeader from '@/assets/login-header.png'
import {login} from "@/services/api/auth.api";

export default {
  name: "LoginView",
  data(){
    return {
      loginHeader: loginHeader,
      email: null,
      password: null,
      isLoading: false,
    }
  },
  computed:{
    isFormFilled(){
      return (this.email === null || this.email === "") || (this.password === null || this.password === "")
    }
  },
  methods:{
    async login(){
      this.isLoading = true
      try{
        const response = await login(this.email, this.password)
        localStorage.setItem("token", response.data.token)
        this.$router.push('/')
        this.$toast.open({
          message: "Login Berhasil",
          type: "success",
        });
      }catch (e) {
        this.$toast.open({
          message: e.response.data.message,
          type: "error",
        });
      }
      this.isLoading = false
    }
  }
}
</script>

<template>
<div class="container vh-100 d-flex align-items-center justify-content-center">
  <div class="card w-50">
    <div class="d-flex justify-content-center py-4">
      <img :src="loginHeader" class="card-img-top w-25 rounded-circle" alt="Gambar Orang Jelek">
    </div>
    <div class="card-body">
      <h5 class="card-title">Login</h5>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary" :disabled="isFormFilled" @click="login()">Submit</button>
      </form>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
