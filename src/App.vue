<template>
  <div id="app"  @contextmenu="contextmenu($event)"   >
    <div class="head">头部</div>
    <div class="down">
      <div class="left">
        <div class="leftTop">页面-左上</div>
        <div class="leftDown">
          <leftBlock></leftBlock>
        </div>
        
      </div>

      <div class="middle">
        <div>(备注:此屏幕模拟的是iphone6s的屏幕大小 屏幕414*736)</div>
        <phoneBox/>
      </div>
      <div class="right">
        <editStyle></editStyle>
      </div>
 
    </div>
         <Menu  @menuItemClick="menuItemClick" ></Menu>
  </div>
</template>

<script>
import phoneBox from "./components/phoneBox";
import editStyle from "./components/styleEdit";
import leftBlock from "./components/leftBlock";
import Menu from "./components/menu"
import commonEvent from "./js/eventCtr";
let event=commonEvent.getEventInstance();
export default {
  data(){
    return {
  
    }
  },
  name: "App",
  components: {
    phoneBox,
    editStyle,
    leftBlock,
    Menu
  },
  methods:{
    menuItemClick(item){
   console.log("被点击的是",item.title)
    },
    contextmenu(_event){
  _event.preventDefault();
   event.triggerEvent(event.rightClickName,{x:_event.x,y:_event.y});
   
    }
  }
};
</script>

<style  scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1820px;
  height: 1080px;
}

.head{
width: 100%;
height: 100px;
border: 1px solid lightgrey;
}

.down{
  display: flex;
  justify-content: space-between;
}

.down>.left{
  width: 253px;

}

.down>.left>.leftTop{
  height: 302px;
  width: 100%;
  border: solid 1px lightblue;
}

.down>.left>.leftDown{
height: 375px;
width: 100%;
 border: solid 1px lightblue;
}
</style>
