<template>
  <div class="hello ttt">

    <standardTag  :styleFromParent="styleFromParent" att="45" parentSelect=".ttt" ref="first" v-on:clickEvent="responeClick"/>
    <standardTag parentSelect=".ttt"  v-on:clickEvent="responeClick"/>
    
  </div>
</template>

<script>
import standardTag from "@/Components/standardTag";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
     styleFromParent:{top:30},
    };
  },
  components: {
    standardTag
  },
     mounted() {
      
    },
  methods: {
  
    responeClick() {
  
    
    }
  }
};
</script>


<style scoped>

.hello {
  width: 400xp;
  height: 500px;
  border: #42b983 solid 1px;
  position: relative;
}
</style>
