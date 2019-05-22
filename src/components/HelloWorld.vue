<template>
  <div class="hello ttt" @click="cltest">
    <standardTag @selectedEvent="selectedEvent" parentSelect=".ttt"/>

    <standardTag @selectedEvent="selectedEvent" parentSelect=".ttt"/>
    <standardTag @selectedEvent="selectedEvent" parentSelect=".ttt"/>
    <!-- 
     <standardTag
      :styleChangeEvent="childStyleChangeEvent"
      :styleFromParent="styleFromParent"
      parentSelect=".ttt"
    />-->

    <!--     <standardTag   parentSelect=".ttt"  v-on:clickEvent="responeClick"/> -->
    <styleEdit :props-style="styleToEdit"></styleEdit>
  </div>
</template>

<script>
import standardTag from "@/Components/standardTag";
import styleEdit from "./styleEdit";
import styleDeal from "../js/styleVal.js";

import commonEvent from "../js/eventCtr";
var event = commonEvent.getEventInstance();

export default {
  name: "HelloWorld",
  data() {
    return {
      styleFromParent: {},
      styleToEdit: {}
    };
  },
  components: {
    standardTag,
    styleEdit
  },
  mounted() {},
  methods: {
    cltest() {
      event.triggerEvent("on", { a: 33 });
    },
    childStyleChangeEvent(val) {
      styleDeal.replacePx(val).then(obj => {
        console.log("响应变化中", obj);
        this.styleFromParent = { ...obj };
      });
    },
    selectedEvent(a, obj) {
      console.log("我被选择");
    },
    childStyleChangeEvent2(val, obj) {}
  }
};
//:style="{backgroundImage:'url('+require('../assets/timg.jpg')+')'}"
</script>


<style scoped>
.hello {
  /* width: 400xp; */
  height: 700px;
  border: #42b983 solid 1px;
  position: relative;
  /* background-image:  url("../../static/timg.jpg");  
   background-repeat:no-repeat;
   background-size: 100% auto; */
}
</style>
