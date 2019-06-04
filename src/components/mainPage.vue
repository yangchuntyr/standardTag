<template>
  <div>
    <div class="tab">
      <el-tag
        :key="tag.name"
        v-for="tag in pages"
        closable
        :disable-transitions="false"
        @close="handleClose(tag.name)"
          @click="tagClick(tag.name)"
      >{{tag.name}}</el-tag>
      <!-- <el-input
        class="input-new-tag"
        v-if="!inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
      
        @keyup.enter.native="handleInputConfirm"
      
      ></el-input> -->
      <el-button    class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
    <div class="phone">
      <div>当前页面-{{currentName}}</div>
      <PhoneBox v-for="(item ,index) in pages" :currentPageNamePrp='currentName' :pageName="item.name" :key="index"  style=" margin: 0 auto;"></PhoneBox>
    </div>
  </div>
</template>


<script>
import PhoneBox from './phoneBox';
import Event from '../js/eventCtr';
const event=Event.getEventInstance();
export default {
    data() {
        return {
            currentName:'首页',
            pages:[
                {name:'首页'},
              
            ],
          
            inputVisible: false,
            inputValue: ''
        };
    },
    components: {
        PhoneBox
    },
    mounted(){
        event.currentPageName=this.currentName;
    },
    watch:{
        currentName(newV,old){
            console.log('当前页面是',newV,'前一个当前页面是是'+old);
            event.currentPageName=newV;
           
        }
    },

 
    methods: {
        tagClick(tag){
            //切换页面
            this.currentName=tag;
            console.log('tab被点击了',tag);
        },
        //打开是否删除的对话框，确定要删除执行函数 sucf
        openCfmDialog(sucF) {
            this.$confirm('删除后不可恢复，确定要继续吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(sucF)
                {
                    sucF();
                }
             
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleClose(tag) {
            console.log('handleClose被执行');
            this.openCfmDialog(()=>{
           
               
                let pIndex=  this.pages.findIndex((item)=>item.name==tag);
                this.pages.splice(pIndex,1);
                if(pIndex>=1){
                    this.currentName= this.pages[pIndex-1].name;
                }else{
                    this.currentName='';
                }
            });
            
        },

        showInput() {
            // this.inputVisible = true;
            // this.$nextTick(_ => {
            //     this.$refs.saveTagInput.$refs.input.focus();
            // });
            this.handleInputConfirm(Math.random()+'abc');
        },

    
        handleInputConfirm(inputValue) {
            console.log('handleInputConfirm被执行');
            // let inputValue = inputValue;
            const pIndex= this.pages.findIndex((item)=>item.name==inputValue);
            if(inputValue){
                if(pIndex<0){
            
                    this.currentName=inputValue;
                    console.log('加入新页面 加入的名称是  ',inputValue);
                    this.$nextTick(()=>{
                        this.pages.push({name:inputValue});
                    });
                
                
                }else{
                    this.$message({
                        type: 'error',
                        message: '页面名称不能重复'
                    }); 
                }
            }
               
          
            this.inputVisible = false;
            this.inputValue = '';
         
        }
    }
};
</script>

<style scoped>
.tab{
    text-align: left;
    border-bottom: 1px solid #bfbfbf;
    width: 100%;

}
.el-tag {
  margin-left: 0px;
  border-radius: 0px;
  background-color: #fff;
  height: 48px;

  line-height: 48px;
  color: #444;
  min-width: 130px;
      text-align: center;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.phone{
    width: 100%;
    text-align: center;
}
</style>
