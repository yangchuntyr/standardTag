<template>
  <div v-on:click.stop="childclick">

    <VueDraggableResizable
      :style="defautlOhterStyle"
      :parent="parentSelect"
      :handles="handles"
      :x="defultPostion.left"
      :y="defultPostion.top"
      :w="defultPostion.width"
      :h="defultPostion.height"
      @resizestop="onResizstop"
      @activated="onActivated"
      @deactivated="onDeactivated"
      @dragstop="onDragstop"
    >{{defautlOhterStyle&&defautlOhterStyle.text}}</VueDraggableResizable>
  </div>
</template>
<script>
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import axios from "axios";

const handlesParam = ["tl", "tm", "tr", "mr", "br", "bm", "bl", "ml"];

export default {
  name: "standardTag",
  props: {
    parentSelect: {
      //样式选择器指定的组件会成为控件拖拽的空间 如.class,#id,#id>.class
      type: String,
      required: true
    }
,
   styleFromParent:{
   type:Object,
   required:false,
   }

  },

  

  data: function() {
    return {
      handles: [],
      defultPostion: {
        top: 10,
        left: 10,
        width:200,
        height:200,
      },
      defautlOhterStyle:null,
      allStyle:{},
    };
  },
watch: {
  //父控件修改了子控件的样式要立即更新子控件的
   styleFromParent: {
     handler :function(newV,oldV) {
       console.log("监控发生变化")
     
       this.setStyle(oldV);
     } ,

     deep:true,
   } 
},
  created() {
    console.log("像素转化",this.$getPx(100))
  },
  mounted() {

    this.loadDefualtStyle();
  },
  methods: {
    loadDefualtStyle() {
   
      axios
        .get( "/static/defaultStyle.json")
        .then(function(response) {
          console.log("请求返回内容",response.data);
          this.setStyle(response.data); 
        }.bind(this))
        .catch(function(error) {
          console.log("请求样式json文件错误=",error);
        });
 
 
     
    },
//***获得最新样式的副本 */
   getStyleCopy(){
   
     return {...this.allStyle} ;
   },

//设置样式，可以只设置部分样式
   setStyle(styleJsonObj){

     if(!styleJsonObj)
     return;

       console.log("设置样式被执行")

     var posKeyName=["top","left","width","height"];
     var keysName=  Object.keys(styleJsonObj)

     //把top left 取出设置到位置样式对象
      var dpos=  this.defultPostion ||(this.defultPostion={});
      for(let a of posKeyName){
        //left top存在 且 设置为整数 或可以转化为整数
        let tem=styleJsonObj[a];
         if(tem&&(parseInt(tem)==tem)){
           dpos[a]=parseInt( tem);
         }
      }

      //设置除定位以外的其他样式
      var defautlOhterStyle=this.defautlOhterStyle ||(this.defautlOhterStyle={});
      var allStyle=this.allStyle||(this.allStyle={});
      for(let a in styleJsonObj){

          if(posKeyName.indexOf(a)<=-1){
            defautlOhterStyle[a]=  styleJsonObj[a];  
          }

          allStyle[a]=styleJsonObj[a];
          
      }

    

   }
,
   saveStyleToJson(styleObject){
     //写json文件提交  
   },

    onDragstop() {
      console.log("拖动结束", arguments);
      let left = arguments[0];
      let top = arguments[1];
      //保存属性参数
   
      this.setStyle({
       left,top
     })
    },
    onResizstop() {
      console.log("调整大小结束", arguments);
      let left = arguments[0];
      let top = arguments[1];
      let width = arguments[2];
      let height = arguments[3];
      //保存属性参数
     this.setStyle({
       left,top,width,height
     })
  
    },
    childclick() {
      console.log("子组件被点击了");
      this.$emit("clickEvent", this.a);
    },
    onActivated() {
      console.log("onActivated", arguments);
      this.handles = handlesParam;
      //保存属性参数
    },
    onDeactivated() {
      this.handles = [];
      //保存属性参数
    }
  },
  components: {
    VueDraggableResizable
  }
};
</script>
<style scoped>
.ttt {
  width: 300px;
  height: 400px;
  position: relative;
  border: solid lightblue 1px;
  border-radius: 3px;
}

.defautlOhterStyle {
  border: solid 1px lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: lightgoldenrodyellow;
  font-weight: bold;
}
</style>




