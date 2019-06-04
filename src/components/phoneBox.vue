<template>
  <div 
    @contextmenu="contextmenu($event)"
    class="hello parent"
    @click.self="clickPhone"
    :id="pageId"
    :style="style"
  
  >
  <div>
    <standardTag
      :ref="'child'+index"
      v-for="(item, index) in items"
      :styleFromParent="item"
      :key="index"
      :typeProp="item.type"
  
      :parentSelect="'#'+pageId"
      :pageIdProp="pageId"
    />
</div>
      <Menu  @menuItemClick="menuItemClick" v-show="isShowPage" ></Menu>
   
  </div>
</template>

<script>

import standardTag from '@/Components/standardTag';
import Menu from './menu';
import commonEvent from '../js/eventCtr';
import ProId from '../js/proId';
import PageStyle from '../../static/json/defaultStyle/PageDefaultStyle';

//  parentSelect=".parent"
const event = commonEvent.getEventInstance();
const TypeMapStyle = {
    button: 'ButtonDefaultStyle.json',
    image: 'ImageDefaultStyle.json',
    input: 'InputDefaultStyle.json'
};

export default {
    name: 'phoneBox',
    data() {
        return {
          
            pageId: 'a'+ProId.getUniqueId()+'z',
            items: [], //用来转载组件
            style: {...PageStyle},
            name:this.pageName,
            isShowPage:true,
        };
    },
    
   
    props:['pageName','currentPageNamePrp'],
    components: {
        standardTag,
        Menu
    },
    watch:{
     

        currentPageNamePrp(newV){
       
            let ret=newV==this.name;
      
            this.isShowPage=ret;
            if(ret){
                this.style.display='flex';
             
            }else{
              
                this.style.display='none';
         
            }
        }
    },
    destroyed(){
      
        console.log('页面-'+this.pageName+'-已经删除');
    },
    created(){
        console.log('boxphone 创建成功',this.name );
        event.listonEvent(event.dragEndName, val => this.dragEnd(val));
        event.listonEvent(
            event.editStyleChangeName,
            function(va) {
    
                if (va.obj === this) {
         
                  
                    this.style=Object.assign({},this.style,va.style);
                }
            }.bind(this)
        );
    },
    mounted() {
     
        console.log('boxphone 挂载完成被执行 页面名称是',this.name );
    
    },
    methods: {


        //打开是否删除的对话框，确定要删除执行函数 sucf
        openCfmDialog(sucF) {
            this.$confirm('确定要删除吗', '提示', {
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

        //**获得所有可移动的组件的位置信息 相对整个bodyd的坐标（left top width height z-index） */
        getAllChildPostion(){
            let boxPhone = document.getElementById(this.pageId);
     
            let left = boxPhone.offsetLeft?boxPhone.offsetLeft:0;
            let top = boxPhone.offsetTop?boxPhone.offsetTop:0; 
            let positionArry=new Map();
            for(let a in this.items){
                console.log('子组件',this.$refs,this.$refs['child'+a],a);
                let tem=  this.$refs['child'+a][0].exportPostionInfo();
                tem.top=tem.top+top;
                tem.left=tem.left+left;
                positionArry.set(a,tem);

            }

            return positionArry;
        },
        /**找到在菜单下面的组件
         * @param menuPoint {left:0,top:0} 菜单坐标 相当于body 包括滚动条的位置
         * @returns 返回一个数组 maxZIndexChild[0] 存储组件序号 
        */
        findChildUnderMenu(menuPoint){
            console.log('menuPoint',menuPoint);
            let {left:menuLeft,top:menuTop}=menuPoint;
            let childs=new Map();
            const ps=  this.getAllChildPostion();
            //比较坐标找到在菜单下面有几个可移动的块
            if(!ps||ps.size<0.01){
                return null;
            }
            for(let [a,v] of ps){
                console.log('aaa=',a);
                let pos=v;
                console.log('menuLeft'+menuLeft+';menuTop='+menuTop,pos);
                if(menuLeft>=pos.left&&menuLeft<=pos.left+pos.width&&menuTop>=pos.top&&menuTop<=pos.top+pos.height){
                    childs.set(a,pos);  
                }
            }

            if(childs.size<0.001){
                return null;
            }
            //比较z-index 看谁的z-index最大
            let maxZIndexChild=null;
          
            for(let [key, value] of childs){
               
                if(!maxZIndexChild)
                {
                    maxZIndexChild=[key,value];
                }else{

                    if(maxZIndexChild[1].zIndex<value.zIndex){
                        maxZIndexChild[0]=key;
                        maxZIndexChild[1]=value;
                    }

                }
            }
            return maxZIndexChild;
        },



        //**点击背景绑定样式编辑框 让颜色编辑框可以修改背景颜色或背景图片 */
        clickPhone() {
            console.log('执行获取子组件信息',this.getAllChildPostion());
            event.triggerEvent(event.childStyleChangeName, {
                style: { ...this.style },
                obj: this
            });
        },

        

        /**判断是否拖动到phone区域了
     *  @param pt 是鼠标坐标{x,y} */
        isInBoxPhone(pt) {
            var boxPhone = document.getElementById(this.pageId);
            var left = boxPhone.offsetLeft?boxPhone.offsetLeft:0;
            var top = boxPhone.offsetTop?boxPhone.offsetTop:0;
            console.log('手机页面-'+this.pageName+'-位置 left='+left+';top='+top+';w='+boxPhone.clientWidth+';h='+boxPhone.clientHeight);
            if (
                pt.x >= left &&
        pt.x <= left + boxPhone.clientWidth &&
        pt.y >= top &&
        pt.y <= top + boxPhone.clientHeight
            ) {
                return true;
            } else {
                return false;
            }
        },

        dragEnd(val) {
            
            if(event.currentPageName!==this.pageName)
            {
                return ;
            }
            console.log('在手机屏幕上 拖动结束', {
                ...val,
                backgroundImage: val.ctrInfo.icon
            });
            let isFitPlace = this.isInBoxPhone({
                x: val.x,
                y: val.y
            });

            if (isFitPlace) {
                //加载默认样式传递给子控件
                let style = require('../../static/json/defaultStyle/' +
          TypeMapStyle[val.ctrInfo.type]);
                const W2 = Math.ceil((style.width + '').replace('px', ''));
                const H2 = Math.ceil((style.height + '').replace('px', ''));
                this.items.push({
                    ...this.getFitTopLeft(
                        { width: W2, height: H2 },
                        { x: val.x, y: val.y }
                    ),
                    ...style,
                    backgroundImage: val.ctrInfo.icon,
                    width: W2,
                    height: H2,
                    type: val.ctrInfo.type
                });
            }else{
                console.log('没有拖到手机盒子里');
            }

          
        },

        /** 获得组件的初始位置 组件相对phone 采用 绝对定位布局
     * conponentSize {width:0,height:0} 组件的大小，
     * mousePoint {y:0,x:0} 鼠标点坐标 相当于整个可视区域的坐标
     */
        getFitTopLeft(conponentSize, mousePoint) {
            let boxPhone = document.getElementById(this.pageId);
            let left = boxPhone.offsetLeft?boxPhone.offsetLeft:0;
            let top = boxPhone.offsetTop?boxPhone.offsetTop:0; 
            boxPhone.clientWidth;
            boxPhone.clientHeight;

            let point = { top: 0, left: 0 };
            point.top = mousePoint.y - top;
            point.left = mousePoint.x - left;

            point.top =
        point.top - conponentSize.width / 2 < 0
            ? 10
            : point.top - conponentSize.width / 2;
            point.left =
        point.left - conponentSize.height / 2 < 0
            ? 10
            : point.left - conponentSize.height / 2;

            if (point.top + conponentSize.height > boxPhone.clientHeight) {
                point.top = boxPhone.clientHeight - conponentSize.height - 10;
            }

            if (point.left + conponentSize.width > boxPhone.clientWidth) {
                point.left = boxPhone.clientWidth - conponentSize.width - 10;
            }

            return point;
        },

        //***点击菜单响应事件 item{title:""},menuPoint 鼠标点击时的坐标可视区域坐标*/
        menuItemClick(item,menuPoint){
            if(event.currentPageName!==this.pageName)
            {
                return ;
            }
            console.log('菜单被点击',item);
            try {
                
            
                switch(item.title)
                {
                case '删除': 
                    let ret=  this.findChildUnderMenu(menuPoint);
                    if(ret){
                        this.openCfmDialog(()=>{
                            this.items.splice(ret[0],1);
                            console.log('已删除的组件序号是',ret[0]);
                            this.$message({
                                type: '恭喜',
                                message: '删除成功!'
                            });
                        });
                      
                    }
                    else{
                        console.log('在菜单下没有可删除的组件');
                    }
                    break;
                }}
            catch (error) {

                console.log('发生错误',error);
                
            }
        },
        contextmenu(_event){
            _event.preventDefault();
            console.log('phonebox右键单击',_event);
          
            event.triggerEvent(event.rightClickName,{x:_event.x,y:_event.y,cx:_event.pageX,cy:_event.pageY});
   
        }
       
    }
};
//:style="{backgroundImage:'url('+require('../assets/timg.jpg')+')'}"
</script>


<style scoped>
.hello {
  width: 414px;
  height: 736px;
  border: #42b983 solid 1px;
  position: relative;

  /* background-image:  url("../../static/timg.jpg");  
   background-repeat:no-repeat;
   background-size: 100% auto; */
}

</style>
