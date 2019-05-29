<template>
  <div class="fixedRight">
    <div>
      <div class="outerDiv">
        <span>标题</span>
        <input type="text" :disabled="disable" v-model="style.text" placeholder="输入">
      </div>
    </div>

    <div>
      <div class="outerDiv">
        <span>字体大小(px)</span>
        <input type="number" :disabled="disable" v-model="style.fontSize" min="10" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>字体颜色</span>

        <input type="color" v-model="style.color" :disabled="disable" placeholder="输入">
      </div>
    </div>

    <div>
      <div class="outerDiv">
        <span>宽(px)</span>
        <input type="number" min="10" v-model="style.width" :disabled="disable" placeholder="输入">
      </div>

      <div class="outerDiv" aria-disabled="true" >
        <span>高(px)</span>
        <input type="number" min="0" v-model="style.height" :disabled="disable" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>top(px)</span>
        <input type="number" v-model="style.top" min="0" :disabled="disable" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>left(px)</span>
        <input type="number" v-model="style.left" min="0" :disabled="disable" placeholder="输入">
      </div>
    </div>

    <div>
      <div class="outerDiv">
        <span>背景颜色</span>
        <input type="color" v-model="style.backgroundColor" placeholder="输入">
          <label @click="clearBackColor" >清空</label>
      </div>

      <div class="outerDiv">
        <span>背景图片</span>
        <input
          type="file"
          value="123.png"
          @change="getFiles($event)"
          accept="image/*"
          placeholder="输入"
        >

       <label @click="clearImage" >清空</label>

      </div>

      <div class="outerDiv">
        <span>边框颜色</span>
        <input type="color" v-model="style.borderColor" :disabled="disable" placeholder="输入">
      </div>
      <div class="outerDiv">
        <span>边框宽度(px)</span>
        <input type="number" min="0" :disabled="disable" v-model="style.borderWidth" placeholder="输入">
      </div>
      <div class="outerDiv">
        <span>圆角(px)</span>
        <input type="number" :disabled="disable" v-model="style.borderRadius" min="0" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>隐藏</span>
        <input type="checkbox" :disabled="disable" v-model="style.display" min="0" placeholder="输入">
      </div>

        <div class="outerDiv">
        <span>透明</span>
        <input type="number" :disabled="disable" v-model="style.opacity" min="0" max="1" step="0.1" placeholder="输入">
      </div>

    </div>

 
  </div>
</template>


<script>
import axios from "axios";

import commonEvent from "../js/eventCtr";
import rpxObj from "../js/styleVal";

var event = commonEvent.getEventInstance();

export default {
  data() {
    return {
      image: "",
      waitingUpFile: "",
      style: {},
      bindTarget: null
    };
  },
  computed:{
  disable:(vm)=>{
     if(vm.bindTarget&&vm.bindTarget.pageId){
        return true;
     }else{
       return false;
     }
  },
  },
  props: {
    propsStyle: {
      type: Object
    }
  },
  mounted() {
    event.listonEvent(
      event.childStyleChangeName,
      function(va) {
        console.log(event.childStyleChangeName + "  样式编辑器中执行", va);

        this.bindTarget = va.obj;

        rpxObj.replacePx(va.style).then(obj => {
          if (obj.display == "none") {
            obj.display = false;
          }
          this.style = Object.assign({}, this.style, obj);
        });
      }.bind(this)
    );
  },

  watch: {
    style: {
      handler: function(newV) {
        var isShow = newV.display;
        console.log("newV", newV);
        event.triggerEvent(event.editStyleChangeName, {
          style: { ...newV, ...{ display: isShow ? "flex" : "none" } },
          obj: this.bindTarget
        });
      },
      deep: true
    },
    //父控件修改了子控件的样式要立即更新子控件的
    propsStyle: {
      handler: function(newV, oldV) {
        console.log("样式编辑器样式属性被改变", newV);
      },

      deep: true
    }
  },
  methods: {
    //清空背景颜色
    clearBackColor(){
      if("backgroundColor" in this.style)
    this.style.backgroundColor="";
    },
    clearImage(){
      if("backgroundImage" in this.style)
    this.style.backgroundImage="";
    },
    getFiles(val) {
      //等待上传的文件
      this.waitingUpFile = val.target.files[0];
      if (this.style.hasOwnProperty("backgroundImage")) {
        this.style["backgroundImage"] =
          "url(" + this.getObjectURL(val.target.files[0]) + ")";
      } else {
        this.$set(
          this.style,
          "backgroundImage",
          "url(" + this.getObjectURL(val.target.files[0]) + ")"
        );
      }
    },
    //***获取文件地址 用来预览图片 */
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      }
      return url;
    },

    uploadFile: function(apiUrl) {
      if (!this.waitingUpFile) return;

      let param = new FormData(); // 创建form对象
      param.append("imgFile", this.waitingUpFile); //对应后台接收图片名

      var options = {
        // 设置axios的参数
        url: apiUrl,
        data: param,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      axios
        .post(options)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(error) {
          console.log("发生错误", error);
        });
    },

 
  }
};
</script>

<style scoped>
.fixedRight {

  padding: 5px;
  border: 1px solid lightgray;
}
.outerDiv {
  margin-bottom: 5px;
  display: flex;
    /* justify-content: center; */
    align-items: center;
}
.outerDiv > span {
  min-width: 80px;
  margin-right: 10px;
  text-align: right;
  display: inline-block;
}

.outerDiv > input {
  height: 30px;
  text-indent: 10px;
  width: 175px;
}

.fixedRight > div {
  margin-bottom: 20px;
}

#saveBtn {
  background-color: antiquewhite;
  color: yellowgreen;
  font-size: 20px;
}
</style>

