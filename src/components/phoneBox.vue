<template>
  <div
    class="hello parent"
    @click.self="clickPhone"
    id="boxPhone"
    :style="style"
    @dragover="dragover"
  >
    <standardTag
      :ref="'child'+index"
      v-for="(item, index) in items"
      :styleFromParent="item"
      :key="index"
      :typeProp="item.type"
      @selectedEvent="selectedEvent"
      parentSelect=".parent"
      :pageIdProp="pageId"
    />
  </div>
</template>

<script>
import standardTag from "@/Components/standardTag";
import styleDeal from "../js/styleVal.js";
import commonEvent from "../js/eventCtr";
import ProId from "../js/proId";
import PageStyle from "../../static/json/defaultStyle/PageDefaultStyle";
console.log("页面默认样式", PageStyle);

var event = commonEvent.getEventInstance();
const TypeMapStyle = {
  button: "ButtonDefaultStyle.json",
  image: "ImageDefaultStyle.json",
  input: "InputDefaultStyle.json"
};

export default {
  name: "phoneBox",
  data() {
    return {
      pageId: ProId.getUniqueId(),
      items: [], //用来转载组件
      style: PageStyle
    };
  },
  components: {
    standardTag
  },
  mounted() {
    event.listonEvent(event.dragEndName, val => this.dragEnd(val));
        event.listonEvent(
      event.editStyleChangeName,
      function(va) {
    
        if (va.obj === this) {
         
         // this.setStyle(styleVal.addPx({ ...va.style }));
          this.style=Object.assign({},this.style,va.style)
        }
      }.bind(this)
    );
  },
  methods: {
    clickPhone() {
      event.triggerEvent(event.childStyleChangeName, {
        style: { ...this.style },
        obj: this
      });
    },
    /**判断是否拖动到phone区域了
     *  @param pt 是鼠标坐标{x,y} */
    isInBoxPhone(pt) {
      var boxPhone = document.getElementById("boxPhone");
      var left = boxPhone.offsetLeft;
      var top = boxPhone.offsetTop;

      if (
        pt.x >= left &&
        pt.x <= left + boxPhone.clientWidth &&
        pt.y >= top &&
        pt.y <= top + boxPhone.clientHeight
      ) {
        return true;
      } else {
        return false;
      }
    },

    dragEnd(val) {
      console.log("在手机屏幕上 拖动结束", {
        ...val,
        backgroundImage: val.ctrInfo.icon
      });
      let isFitPlace = this.isInBoxPhone({
        x: val.x,
        y: val.y
      });

      if (isFitPlace) {
        //加载默认样式传递给子控件
        let style = require("../../static/json/defaultStyle/" +
          TypeMapStyle[val.ctrInfo.type]);
        const W2 = Math.ceil((style.width + "").replace("px", ""));
        const H2 = Math.ceil((style.height + "").replace("px", ""));
        this.items.push({
          ...this.getFitTopLeft(
            { width: W2, height: H2 },
            { x: val.x, y: val.y }
          ),
          ...style,
          backgroundImage: val.ctrInfo.icon,
          width: W2,
          height: H2,
          type: val.ctrInfo.type
        });
      }
    },

    /** 获得组件的初始位置 组件相对phone 采用 绝对定位布局
     * conponentSize {width:0,height:0} 组件的大小，
     * mousePoint {y:0,x:0} 鼠标点坐标 相当于整个可视区域的坐标
     */
    getFitTopLeft(conponentSize, mousePoint) {
      let boxPhone = document.getElementById("boxPhone");
      let left = boxPhone.offsetLeft;
      let top = boxPhone.offsetTop;
      boxPhone.clientWidth;
      boxPhone.clientHeight;

      let point = { top: 0, left: 0 };
      point.top = mousePoint.y - top;
      point.left = mousePoint.x - left;

      point.top =
        point.top - conponentSize.width / 2 < 0
          ? 10
          : point.top - conponentSize.width / 2;
      point.left =
        point.left - conponentSize.height / 2 < 0
          ? 10
          : point.left - conponentSize.height / 2;

      if (point.top + conponentSize.height > boxPhone.clientHeight) {
        point.top = boxPhone.clientHeight - conponentSize.height - 10;
      }

      if (point.left + conponentSize.width > boxPhone.clientWidth) {
        point.left = boxPhone.clientWidth - conponentSize.width - 10;
      }

      return point;
    },
    dragover() {},

    selectedEvent(a, obj) {}
  }
};
//:style="{backgroundImage:'url('+require('../assets/timg.jpg')+')'}"
</script>


<style scoped>
.hello {
  width: 414px;
  height: 736px;
  border: #42b983 solid 1px;
  position: relative;

  /* background-image:  url("../../static/timg.jpg");  
   background-repeat:no-repeat;
   background-size: 100% auto; */
}
</style>
