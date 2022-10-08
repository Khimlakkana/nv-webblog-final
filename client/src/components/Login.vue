<template>
  <div>
    <b-container class="bv-example-row">
    <b-row class="text-center">
         <b-col></b-col>

         <b-col cols="10" class="bg29">
<br><br><img src = "@/assets/xd.png" ><br><br>
    
  
<form v-on:submit.prevent="onLogin">
  <div class="container">

    <label for="email"><b>ชื่อผู้ใช้ </b></label>
    <input type="text" class="form-control" v-model="email" placeholder="User" required>

    <br>

    <label for="psw"><b>รหัสผ่าน </b></label>
    <input type="password" class="form-control" v-model="password" placeholder="Password" required>

    <br>

    <b-button class="loginbtn" type="submit" pill variant="warning" >ลงชื่อเข้าใช้</b-button>

    <p> <b-button class="registerbtn" pill variant="success" v-on:click="navigateTo('/user/create/')">สร้างผู้ใช้ </b-button></p>

    <div class="error" v-if="error">{{error}}</div><br><br><br><br>
  </div>

</form>


    </b-col>
     </b-row>
</b-container>

  </div>
</template>

<script>

import AuthenService from '@/services/AuthenService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null 
    }
  },

  methods: {
    async onLogin(){
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password
        })
      
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.$router.push({
          name: 'blogs'
        })
       

      } catch(error) {
        console.log(error)
        this.error = error.response.data.error 
        this.email = ''
        this.password = ''
      }
    },
            navigateTo (route){
                this.$router.push(route)
             
        },
  },
}
</script>
<style scoped>
  * {box-sizing: border-box}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 40%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: rgb(196, 196, 196);
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #b8b9b9;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #000000;
  margin-bottom: 25px;
}

/* Set a style for the submit/register button */
.registerbtn {
  color: rgb(255, 255, 255);
  padding: 14px 2px;
  margin: 6px 0;
  border: none;
  cursor: pointer;
  width: 30%;
  opacity: 0.9;
}

.loginbtn {
  background-color: #002cbd;
  color: white;
  padding: 14px 2px;
  margin: 6px 0;
  border: none;
  cursor: pointer;
  width: 30%;
  opacity: 0.9;
}
.bg29 {
 background-color: rgb(73, 185, 250);
}
img {
  width: 500px;
  height: 250px;
}

  .error {
    color:red;
  }
</style>