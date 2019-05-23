<template>
  <div class="hello parent" id="boxPhone"  @dragover="dragover" >
   
    <standardTag  :ref="'child'+index" v-for="(item, index) in items" :styleFromParent="item"  :key="index" @selectedEvent="selectedEvent" parentSelect=".parent"/>

    <!-- <standardTag @selectedEvent="selectedEvent" parentSelect=".parent"/>
    <standardTag @selectedEvent="selectedEvent" parentSelect=".parent"/> -->
  
   
  </div>
</template>

<script>
import standardTag from "@/Components/standardTag";

import styleDeal from "../js/styleVal.js";

import dragData from "../js/dragData"

import commonEvent from "../js/eventCtr";
import DragData from '../js/dragData';
var event = commonEvent.getEventInstance();



export default {
  name: "HelloWorld",
  data() {
    return {
    items:[],
    dragData:new DragData()
    };
  },
  components: {
    standardTag,
  
  },
  mounted() {
    event.listonEvent(event.dragEndName,(val)=> this.dragEnd(val))
  },
  methods: {
  

isInBoxPhone(pt){
 var boxPhone=document.getElementById("boxPhone");
    var left=boxPhone.offsetLeft;
    var top=boxPhone.offsetTop;
    console.log('left='+left+";"+"top="+top+";w="+boxPhone.clientWidth+";h="+boxPhone.clientHeight,pt)
    if(pt.x>=left
    &&pt.x<=(left+boxPhone.clientWidth)
    &&pt.y>=top
    &&pt.y<=(top+boxPhone.clientHeight))
    {

      return true;

    }else{
      return false;
    }
},

dragEnd(val){

console.log("拖动结束555",arguments)
  this.dragData.isFitPlace=this.isInBoxPhone({
    x:val.x,y:val.y
  })

  

  if(this.dragData.isFitPlace){
    console.log("进入")
    switch(val.ctrType){
      case "button": this.items.push( {...this.dragData.point});  break;
    }

   
  }else{
    console.log("等于false",this.dragData)
  }


},

dragover(){
   this.dragData.isFitPlace=true;
  this.dragData.point.top=arguments["0"].layerY;
  this.dragData.point.left=arguments["0"].layerX;
  console.log("正在拖动",arguments)

},

    selectedEvent(a, obj) {
    
    },
  
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
