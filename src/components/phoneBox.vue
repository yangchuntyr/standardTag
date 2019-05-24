<template>
  <div class="hello parent" id="boxPhone" @dragover="dragover">
    <standardTag
      :ref="'child'+index"
      v-for="(item, index) in items"
      :styleFromParent="item"
      :key="index"
      @selectedEvent="selectedEvent"
      parentSelect=".parent"
      :pageIdProp="pageId"
    />
  </div>
</template>

<script>
import standardTag from "@/Components/standardTag";
import styleDeal from "../js/styleVal.js";
import dragData from "../js/dragData";
import commonEvent from "../js/eventCtr";
import DragData from "../js/dragData";
import ProId from "../js/proId"
var event = commonEvent.getEventInstance();

export default {
  name: "phoneBox",
  data() {
    return {
      pageId:ProId.getUniqueId(),
      items: [],
      dragData: new DragData()
    };
  },
  components: {
    standardTag
  },
  mounted() {
    event.listonEvent(event.dragEndName, val => this.dragEnd(val));
  },
  methods: {
    

    isInBoxPhone(pt) {
      var boxPhone = document.getElementById("boxPhone");
      var left = boxPhone.offsetLeft;
      var top = boxPhone.offsetTop;
     

      this.dragData.point.top = pt.y - top < 0 ? 60 : pt.y - top;
      this.dragData.point.left = pt.x - left < 0 ? 60 : pt.x - left;

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
    
      this.dragData.isFitPlace = this.isInBoxPhone({
        x: val.x,
        y: val.y
      });

      if (this.dragData.isFitPlace) {
    
        switch (val.ctrType) {
          case "button":
            this.items.push({ ...this.dragData.point });
            break;
        }
      } else {
      
      }
    },

    dragover() {
    
    },

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
