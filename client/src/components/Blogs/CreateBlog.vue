<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="text-left">
        <b-col></b-col>

        <b-col cols="10" class="bg1">
          <h1>เลือกสินค้า</h1>
          <hr>
          <center><img src = "@/assets/pic1.jpg" alt ="amd">
           <div class="welcome-text">
          <h4>EVGA 1080 TI มือสอง ราคาถูก ประกัน 1.9 ปี 12,490.00 </h4></div>
          <img src = "@/assets/pic2.jpg" alt ="amd">
          <div class="welcome-text">
          <h4>GALAX GTX 1050 Ti EXOC 4GB Dual FAN มือสอง ราคาถูก 3,490.00 </h4></div>
          <img src = "@/assets/pic3.jpg" alt ="amd">
          <div class="welcome-text">
          <h4>GALAX GTX 1060 6GB EXOC การ์ดจอมือสอง ราคา 4990 บาท </h4></div>
          <img src = "@/assets/pic4.jpg" alt ="amd">
          <div class="welcome-text">
          <h4>GTX 1080 TI ราคามือสอง ยีห้อ GALAX โปรโมชั่น ลดราคา 14,590.00  </h4></div>
          <img src = "@/assets/pic5.jpg" alt ="amd">
          <div class="welcome-text">
          <h4>ZOTAC 1070 AMP Extreme มือสอง 7,250.00  </h4></div>
          <img src = "@/assets/pic6.jpg" alt ="amd">
          <div class="welcome-text">
          <h4>Asus RTX ROG Strix 2080 o8g ตัวท็อปของรุ่น มือสอง 23,000.00 </h4></div>
          <img src = "@/assets/pic7.jpg" alt ="amd">
          <div class="welcome-text">
          <h4> GTX 1080 Ti GameRock Premium Edition  11GB 12,490.00  </h4></div>
          <br><hr></center>
          <form class="box1" v-on:submit.prevent="createBlog">
         
            <p> ชื่อ : <input type="text" class="form-control" v-model="blog.firstname" /> </p>
            
            <p> นามสกุล : <input type="text" class="form-control" v-model="blog.lastname" /> </p>
            
            <p> สินค้า :
              <select required class="form-control"  v-model="blog.nroom">
                      <option>EVGA 1080 TI มือสอง ราคาถูก ประกัน 1.9 ปี 12,490.00</option>
                      <option>GALAX GTX 1050 Ti EXOC 4GB Dual FAN มือสอง ราคาถูก 3,490.00</option>
                      <option>GALAX GTX 1060 6GB EXOC การ์ดจอมือสอง ราคา 4990 บาท </option>
                      <option>GTX 1080 TI ราคามือสอง ยีห้อ GALAX โปรโมชั่น ลดราคา 14,590.00</option>
                      <option>ZOTAC 1070 AMP Extreme มือสอง 7,250.00</option>
                      <option>Asus RTX ROG Strix 2080 o8g ตัวท็อปของรุ่น มือสอง 23,000.00</option>
                      <option>GTX 1080 Ti GameRock Premium Edition  11GB 12,490.00</option>
              </select>
            </p>

            <p> จำนวนที่ต้องการสั่งซื้อ : <input type="number" class="form-control" required v-model="blog.pnum" /></p>

            <p> เบอร์โทรศัพท์ : <input type="tel" class="form-control" required v-model="blog.tel" /></p>
            
            <p> ที่อยู่ : <input type="text" required class="form-control" v-model="blog.other" /></p>
        
            <p>
              <b-button pill variant="success" type="submit"
                >ยืนยันการสั่งซื้อ</b-button
              >
              <b-button
                pill
                variant="secondary"
                v-on:click="navigateTo('/blogs')"
                >ย้อนกลับ</b-button
              >
            </p>
          </form>

        </b-col>
        <b-col> </b-col>
      </b-row>
    </b-container>
  </div>

</template>



<script>
import BlogService from "@/services/BlogsService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "@/services/UploadService";
import App from "../../App.vue";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      //uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],

      pictures: [],
      pictureIndex: 0,

      blog: {
        title: "",
        thumbnail: "null",
        pictues: "null",
        content: "",
        category: "",
        status: ""
      },
      config: {
        /* toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "SuperScript"],
        ], */
        height: 300
      }
    };
  },
  methods: {
    async createBlog() {
      this.blog.pictures = JSON.stringify(this.pictures); //update ค่าของ blogs.pictrues
      try {
        await BlogService.post(this.blog);
        this.$router.push({
          name: "blogs"
        });
      } catch (err) {
        console.log(err);
      }
    },
    onBlur(editor) {
      console.log(editor);
    },
    onfocus(editor) {
      console.log(editor);
    },
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return x => {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {
      //reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      //this.uploadedFiles = []
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
      //upload data to the server
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        // update image uploaded display
        let pictureJSON = [];
        this.uploadedFileNames.forEach(uploadFilename => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }

          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename
            };
            this.pictures.push(pictureJSON);
          }
        });

        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(filedName, fileList) {
      //handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      //append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(filedName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });

      //save it
      this.save(formData);
    },
    clearUploadResult: function() {
      setTimeout(() => this.reset(), 5000);
    },

    //เรียกใช้ v-0n:cick.prevent ส่ง picture ไปลบ
    async delFile(material) {
      let result = confirm("Want to delete?");
      if (result) {
        let dataJSON = {
          filename: material.name
        };

        await UploadService.delete(dataJSON);

        for (var i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1);
            this.materialIndex--;
            break;
          }
        }
      }
    },

    /* thumbnail */
    useThumbnail(filename) {
      console.log(filename);
      this.blog.thumbnail = filename;
    }
  },

  created() {
    this.reset();
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    issaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  components: {
    VueCkeditor
  }
};
</script>
<style scoped>
.dropbox {
  outline: 2px dashed gray; /* the dash box */
  outline-offset: -10px;
  background: #fec3df;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: #fceebe;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
}

input,select {
      width: 450px;
    }
 img{
   width: 200px; 
   height: 200px;
 }   
</style>
