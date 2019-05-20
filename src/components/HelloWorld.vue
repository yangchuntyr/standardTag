<template>
  <div class="hello ttt">

    <standardTag @selectedEvent="onSelectedEvent"  :styleFromParent="styleFromParent" att="45" parentSelect=".ttt" ref="first" v-on:clickEvent="responeClick"/>
    <standardTag @selectedEvent="onSelectedEvent"  parentSelect=".ttt"  v-on:clickEvent="responeClick"/>
    <styleEdit :propsStyle="selectStyle"></styleEdit>

  </div>
</template>

<script>
import standardTag from "@/Components/standardTag";
import styleEdit from "./styleEdit"
import styleDeal from  "../js/styleVal.js"

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
     styleFromParent:{top:30},
     selectStyle:{}
    };
  },
  components: {
    standardTag,
    styleEdit
  },
     mounted() {
      
    },
  methods: {
  
  onSelectedEvent(valS){
   console.log("激活样式",valS);
   this.selectStyle=styleDeal.replacePx( valS);
  },
    responeClick() {
  
    }
  }
};
</script>


<style scoped>

.hello {
  /* width: 400xp; */
  height: 700px;
  border: #42b983 solid 1px;
  position: relative;
}
</style>
