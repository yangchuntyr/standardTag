<template>
  <div id="app">
    <leftBlock></leftBlock>
  <div>
     <div>(备注:此屏幕模拟的是iphone6s的屏幕大小 屏幕414*736)</div>
  <phoneBox/>
  </div>

  <editStyle></editStyle>
 
  </div>
</template>

<script>
import phoneBox from './components/phoneBox'
import editStyle from './components/styleEdit'
import leftBlock from "./components/leftBlock"
export default {
  name: 'App',
  components:{
    phoneBox,editStyle,leftBlock
  }
}
</script>

<style  scoped>



#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;

  justify-content: center;
  align-items: center;
}
</style>
