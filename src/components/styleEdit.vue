<template>
  <div class="fixedRight">
    <div>
      <div class="outerDiv">
        <span>标题</span>
        <input type="text" v-model="Style.text" placeholder="输入">
      </div>
    </div>

    <div>
      <div class="outerDiv">
        <span>字体大小(px)</span>
        <input type="number" v-model="Style.fontSize" min="10" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>字体颜色</span>

        <input type="color" v-model="Style.color" placeholder="输入">
      </div>
    </div>

    <div>
      <div class="outerDiv">
        <span>宽(px)</span>
        <input type="number" min="10" v-model="Style.width" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>高(px)</span>
        <input type="number" min="0" v-model="Style.height" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>top(px)</span>
        <input type="number" v-model="Style.top" min="0" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>left(px)</span>
        <input type="number" v-model="Style.left" min="0" placeholder="输入">
      </div>
    </div>

    <div>
      <div class="outerDiv">
        <span>背景颜色</span>
        <input type="color" v-model="Style.backgroundColor" placeholder="输入">
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
      </div>

      <div class="outerDiv">
        <span>边框颜色</span>
        <input type="color" v-model="Style.borderColor" placeholder="输入">
      </div>
      <div class="outerDiv">
        <span>边框宽度(px)</span>
        <input type="number" min="0" v-model="Style.borderWidth" placeholder="输入">
      </div>
      <div class="outerDiv">
        <span>圆角(px)</span>
        <input type="number" v-model="Style.borderRadius" min="0" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>隐藏</span>
        <input type="checkbox" v-model="Style.display" min="0" placeholder="输入">
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
      Style: {},
      bindTarget: null
    };
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
          this.Style = Object.assign({}, this.Style, obj);
        });
      }.bind(this)
    );
  },

  watch: {
    Style: {
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
    getFiles(val) {
      //等待上传的文件
      this.waitingUpFile = val.target.files[0];
      if (this.Style.hasOwnProperty("backgroundImage")) {
        this.Style["backgroundImage"] =
          "url(" + this.getObjectURL(val.target.files[0]) + ")";
      } else {
        this.$set(
          this.Style,
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
  /* position: absolute;
  right: 20px;
  top: 50%; */
  /* transform: translateY(-50%); */
  padding: 5px;
  border: 1px solid lightgray;
}
.outerDiv {
  margin-bottom: 5px;
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

