<template>
    <div>
        <div class="sidebar"> 
           
            <a><router-link :to="{name: 'login'}"><i class="fa fa-home " aria-hidden="true"></i> เข้าสู่ระบบ</router-link></a>
            <a><router-link :to="{name: 'blogs'}"><i class="fa fa-bars " aria-hidden="true"></i> เลือกสินค้า</router-link></a>
              <a><router-link :to="{name: 'comments'}"><i class="fa fa-pencil " aria-hidden="true"></i>ลงขายสินค้า</router-link></a>
              <a><router-link :to="{name: 'users'}"><i class="fa fa-user " aria-hidden="true"></i> จำนวนผู้ใช้งาน</router-link></a>
            <a><a v-on:cick.prevent="logout" href="login"><i class=" fa fa-sign-out" aria-hidden="true"></i> ออกจากระบบ</a></a>
        
        </div>
    </div>

</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    }
  }
};
</script>

<style scoped>
    /* The side navigation menu */
.sidebar {
  margin: 0;
  padding: 0;
  width: 280px;
  background-color: rgba(143, 7, 177, 0.98);
  position: fixed;
  height: 100%;
  overflow: auto;
  font-size: 20px;
  border-radius: 0px 30px 30px 0px;

}

/* Sidebar links */
.sidebar a {
  display: block;
  color: white;
  padding: 9px; /* ห่างจากตัวออกไป */
  text-decoration: none;
}

/* Active/current link */
.sidebar a.active {
  background-color: #2a8ddd;
  color: white;
}

/* Links on mouse-over */
.sidebar a:hover:not(.active) {
  background-color: #0b9ba0;
  border-radius: 50px 50px 50px 50px;
  color: white;
}

/* Page content. The value of the margin-left property should match the value of the sidebar's width property */
div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

/* On screens that are less than 700px wide, make the sidebar into a topbar */
@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}

/* On screens that are less than 400px, display the bar vertically, instead of horizontally */
@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}

.sidebar a.router-link-active{
    color: white;
    background-color: #2a8ddd;
     border-radius: 50px 50px 50px 50px;

}

</style>