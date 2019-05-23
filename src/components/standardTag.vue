<template>
  <div v-on:click.stop="childclick">
    <VueDraggableResizable
      :style="defautlOhterStyle"
      :parent="parentSelect"
      :handles="handles"
      :x="defultPostion.left"
      :y="defultPostion.top"
      :w="defultPostion.width"
      :h="defultPostion.height"
      @resizestop="onResizstop"
      @activated="onActivated"
      @deactivated="onDeactivated"
      @dragstop="onDragstop"
    >
      <label v-text="defautlOhterStyle&&defautlOhterStyle.text"></label>
    </VueDraggableResizable>
  </div>
</template>
<script>
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import axios from "axios";
import styleVal from "../js/styleVal";
import commonEvent from "../js/eventCtr";
var event = commonEvent.getEventInstance();
const handlesParam = ["tl", "tm", "tr", "mr", "br", "bm", "bl", "ml"];

export default {
  name: "standardTag",
  props: {
    styleChangeEvent: {
      type: Function,
      default: null
    },
    parentSelect: {
      //样式选择器指定的组件会成为控件拖拽的空间 如.class,#id,#id>.class
      type: String,
      required: true
    },
    styleFromParent: {
      type: Object,
      required: false,
      default: null
    }
  },

  data: function() {
    return {
      handles: [],
      defultPostion: {
        top: 10,
        left: 10,
        width: 100,
        height: 100
      },
      defautlOhterStyle: null,
      allStyle: {}
    };
  },
  watch: {
    //父控件修改了子控件的样式要立即更新子控件的
    styleFromParent: {
      handler: function(newV, oldV) {
        console.log("监控发生变化");
        var tem = styleVal.addPx({ ...newV });
        let isAllEquen = true;
        for (const key in tem) {
          if (newV[key] !== this.allStyle[key]) {
            isAllEquen = false;
            break;
          }
        }

        console.log("isAllEquen", isAllEquen);
        if (isAllEquen) {
          console.log("样式前后没有变化 不设置样式", newV, this.allStyle);
          return;
        }

      //  this.setStyle(styleVal.addPx({ ...newV }));
      },

      deep: true
    }
  },
  created() {},
  updated() {},
  mounted() {
    console.log("父亲样式:", this.styleFromParent);
    this.loadDefualtStyle();
  
    event.listonEvent(
      event.editStyleChangeName,
      function(va) {
        console.log(event.editStyleChangeName + "事件触发  子控件", va);
        if (va.obj === this) {
          this.setStyle(styleVal.addPx({ ...va.style }));
        }
      }.bind(this)
    );
  },

  methods: {
     loadDefualtStyle() {
    var tt=   axios
        .get("/static/defaultStyle.json")
        .then(
          function(response) {
            console.log("请求返回内容", response.data);
            var temp={...response.data,...this.styleFromParent}
            var dis=Math.floor(temp.width/2)
            temp.left=(temp.left-dis)<0?10:temp.left-dis;
            temp.top=(temp.top-dis)<0?10:temp.top-dis;
            this.setStyle(temp);
            
          }.bind(this)
        )
        .catch(function(error) {
          console.log("请求样式json文件错误=", error);
        });
    },
    //***获得最新样式的副本 */
    getStyleCopy() {
      return { ...this.allStyle };
    },

    triggerStyleChangeEvent() {
      event.triggerEvent(event.childStyleChangeName, {
        style: this.allStyle,
        obj: this
      });
    },

    //设置样式，可以只设置部分样式
    setStyle(styleJsonObj) {
      if (!styleJsonObj) return;

      console.log("设置样式被执行", styleJsonObj);

      var posKeyName = ["top", "left", "width", "height"];
      var keysName = Object.keys(styleJsonObj);

      //把top left 取出设置到位置样式对象
      var dpos = this.defultPostion || (this.defultPostion = {});
      for (let a of posKeyName) {
        //left top存在 且 设置为整数 或可以转化为整数
        let tem = styleJsonObj[a];
        if (tem && parseInt(tem) == tem) {
          dpos[a] = parseInt(tem);
        }
      }

      //设置除定位以外的其他样式
      // var defautlOhterStyle =  this.defautlOhterStyle || (this.defautlOhterStyle = {});

      var allStyle = this.allStyle || (this.allStyle = {});
      if (!this.defautlOhterStyle) {
        this.defautlOhterStyle = {};
      }

      for (let a in styleJsonObj) {
        if (posKeyName.indexOf(a) <= -1) {
          if (this.defautlOhterStyle.hasOwnProperty(a)) {
            this.defautlOhterStyle[a] = styleJsonObj[a];
          } else {
            this.$set(this.defautlOhterStyle, a, styleJsonObj[a]);
          }

          //  defautlOhterStyle[a] = styleJsonObj[a];
        }

        allStyle[a] = styleJsonObj[a];
      }

      console.log(
        "设置后 defautlOhterStyle  defultPostion",
        this.defautlOhterStyle,
        this.defultPostion
      );
    },
    saveStyleToJson(styleObject) {
      //写json文件提交
    },

    onDragstop() {
      console.log("拖动结束", arguments);
      let left = arguments[0];
      let top = arguments[1];
      //保存属性参数
      if (left == this.defultPostion.left && this.defultPostion.top == top) {
        return;
      }
      this.setStyle({
        left,
        top
      });

      this.triggerStyleChangeEvent();
    },
    onResizstop() {
      console.log("调整大小结束", arguments);
      let left = arguments[0];
      let top = arguments[1];
      let width = arguments[2];
      let height = arguments[3];
      if (
        left == this.defultPostion.left &&
        this.defultPostion.top == top &&
        this.defultPostion.width == width &&
        this.defultPostion.height == height
      ) {
        return;
      }
      //保存属性参数
      this.setStyle({
        left,
        top,
        width,
        height
      });

      this.triggerStyleChangeEvent();
    },
    childclick() {
      this.$emit("clickEvent");
    },
    onActivated() {
      this.handles = handlesParam;
      this.$emit("selectedEvent", this.allStyle, this);
      this.triggerStyleChangeEvent();
      //保存属性参数
    },
    onDeactivated() {
      this.handles = [];
      //保存属性参数
    }
  },
  components: {
    VueDraggableResizable
  }
};
</script>
<style scoped>
.ttt {
  width: 300px;
  height: 400px;
  position: relative;
  border: solid lightblue 1px;
  border-radius: 3px;
}

.defautlOhterStyle {
  border: solid 1px lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: lightgoldenrodyellow;
  font-weight: bold;
}
</style>




