<template>
  <div class="fixedRight">
    <div>
      <div class="outerDiv">
        <span>标题</span>
        <input type="text" v-model="propsStyle.text" placeholder="输入">
      </div>
    </div>

    <div>
      <div class="outerDiv">
        <span>字体大小(px)</span>
        <input type="number" v-model="propsStyle.fontSize" min="10" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>字体颜色</span>
      
             <input type="color" v-model="style.color"  value="#2D9900" placeholder="输入" >
      </div>
    </div>

    <div>
      <div class="outerDiv">
        <span>宽(px)</span>
        <input type="number" min="10" v-model="style.width" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>高(px)</span>
        <input type="number" min="0" v-model="style.height" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>top(px)</span>
        <input type="number" v-model="style.top" min="0" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>left(px)</span>
        <input type="number" v-model="style.left" min="0" placeholder="输入">
      </div>
    </div>

    <div>
      <div class="outerDiv">
        <span>背景颜色</span>
        <input type="color" v-model="style.backgroundColor"  value="#2D9900" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>背景图片</span>
        <input type="file"   accept="image/*" placeholder="输入">
      </div>

      <div class="outerDiv">
        <span>边框颜色</span>
        <input type="color" v-model="style.borderColor" placeholder="输入">
      </div>
      <div class="outerDiv">
        <span>边框宽度(px)</span>
        <input type="number" min="0" v-model="style.borderWidth" placeholder="输入">
      </div>
      <div class="outerDiv">
        <span>圆角(px)</span>
        <input type="number" v-model="style.borderRadius" min="0" placeholder="输入">
      </div>
    </div>

      <div id="saveBtn" @click="saveSytle">保存</div>

  </div>
</template>


<script>
export default {
  data(){
    return {
      style:{
backgroundColor:"#ffffff"
      }
    }
  },
  props:{
    propsStyle:{
      type:Object,
    
    }
  },
  mounted(){
    this.style={...this.propsStyle} ;
  },
  methods:{
    saveSytle(){
      this.$emit("updateStyle",{...this.style})
      console.log({...this.style})
    }
  }
};
</script>

<style scoped>
.fixedRight {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px;
  border: 1px solid lightgray;


}
.outerDiv {
  margin-bottom: 5px;
}
.outerDiv > span {
  min-width: 80px;
  margin-right: 10px;
  text-align: right;
  display: inline-block;
}

.outerDiv > input {
  height: 30px;
  text-indent: 10px;
}

.fixedRight > div {
  margin-bottom: 20px;
}

#saveBtn{
  background-color:antiquewhite;
  color: yellowgreen;
  font-size: 20px; 
}
</style>

