<template>
  <div id="menue" :style="mousePoint" v-if="isShow" @mouseleave="lostCenter"  @contextmenu.stop="contextmenu($event)">
    <div @click="clickItem(item)" class="row" v-for="(item ,index) in items" :key="index" v-text="item.title"></div>
 
  </div>
</template>

<script>
import commonEvent from '../js/eventCtr';
import ProId from '../js/proId';
let event=commonEvent.getEventInstance();
export default {
    data() {
        return {
            isShow:false,
            items: [{ title: '删除' }, { title: '复制' },{ title: '编辑' }],
            mousePoint:{
                left:'0px',
                top:'0px',
                zIndex:ProId.getOrderId(),
            },
            otherP:{}
        };
    },
    props:[ 'prpPoint',],
    created(){
        event.listonEvent(event.rightClickName,(_event)=>{
            console.log('右键点击被触发',_event);
   
            this.mousePoint.zIndex=ProId.getOrderId();
            this.isShow=true;
            this.mousePoint.left=_event.x+'px';
            this.mousePoint.top=_event.y+'px';
            this.otherP.cx=_event.cx;
            this.otherP.cy=_event.cy;
        });
    },
    computed:{


   
    },
    methods:{
        lostCenter(){
            this.isShow=false;
          
        
        },
        contextmenu(event){
            event.preventDefault();
        },
        clickItem(item){
            this.isShow=false;
            // this.$emit('menuItemClick',{...item},
            //     {top:this.mousePoint.top.replace('px',''),
            //         left:this.mousePoint.left.replace('px','')}); 

            this.$emit('menuItemClick',{...item},
                {top:this.otherP.cy,
                    left:this.otherP.cx}); 
        }
    }
};
</script>

<style scoped>
#menue {
  position: fixed;
  /* left: 110px;
  top: 120px; */

  border: 1px solid #bfbfbf;
}

.row{
  border-bottom: 1px solid #bfbfbf;
  height: 30px;
  line-height: 30px;
  text-align: center;
 padding: 10px 20px;
 background-color: #ffffff;
}

 .row:hover{
            background-color: #eeeeee;
        }
</style>



