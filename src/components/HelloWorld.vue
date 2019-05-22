<template>
  <div class="hello ttt">
    <standardTag
      :styleChangeEvent="childStyleChangeEvent"
      :styleFromParent="styleFromParent"
      parentSelect=".ttt"
    />
    <!--     <standardTag   parentSelect=".ttt"  v-on:clickEvent="responeClick"/> -->
    <styleEdit :props-style="styleFromParent"></styleEdit>
  </div>
</template>

<script>
import standardTag from "@/Components/standardTag";
import styleEdit from "./styleEdit";
import styleDeal from "../js/styleVal.js";

export default {
  name: "HelloWorld",
  data() {
    return {
      styleFromParent: null
    };
  },
  components: {
    standardTag,
    styleEdit
  },
  mounted() {},
  methods: {
    childStyleChangeEvent(val) {
      // console.log("响应变化了 标准按钮样式发生变化");

      // var tem2 = styleDeal.replacePx(val);
      // console.log(
      //   "响应变化中",

      //   tem2
      // );

      // this.styleFromParent = tem2;
      // console.log("响应变化后", this.styleFromParent);
      styleDeal.replacePx(val).then((obj)=>{
        console.log("响应变化中",obj);
        this.styleFromParent = {...obj};
      });

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
