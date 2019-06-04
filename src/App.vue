<template>
  <div id="app"    >
    <div class="head">头部</div>
    <div class="down">
      <div class="left">
        <div class="leftTop">
          <PageManage/>
        </div>
        <div class="leftDown">
          <leftBlock></leftBlock>
        </div>
        
      </div>

      <div class="middle">
      
        <mainPage/>
      </div>
      <div class="right">
        <editStyle></editStyle>
      </div>
 
    </div>
         <!-- <Menu  @menuItemClick="menuItemClick" ></Menu> -->
  </div>
</template>

<script>

import editStyle from './components/styleEdit';
import leftBlock from './components/leftBlock';
import PageManage from './components/pageMange';
import mainPage  from './components/mainPage';
export default {
    data(){
        return {
  
        };
    },
    name: 'App',
    components: {
   
        editStyle,
        leftBlock,
        PageManage,
        mainPage
    },
    methods:{
   
     
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
height: 77px;
border: 1px solid lightgrey;
}
.middle{
  width: 930px;
}
.down{
  display: flex;
  justify-content: flex-start;
  
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
