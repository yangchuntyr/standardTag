<template>
  <!-- <div  :style="zStyle" > 以后扩展什么的可能用得上  -->
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
      :zIndex="zStyle.zIndex"
    >
      <label v-text="defautlOhterStyle&&defautlOhterStyle.text"></label>
    </VueDraggableResizable>
  <!-- </div> -->
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

import styleVal from '../js/styleVal';

import commonEvent from '../js/eventCtr';
import ProId from '../js/proId';
var event = commonEvent.getEventInstance();
const handlesParam = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'];
//控件类型对应的默认样式文件

export default {
    name: 'standardTag',
    props: {
        
        typeProp: {
            //父组件传递过来 的组件类型
            type: String,
            required: true
        },
        pageIdProp: {
            type: String
        },

        parentSelect: {
            //样式选择器指定的组件会成为控件拖拽的空间 如.class,#id,#id>.class
            type: String,
            required: true
        },
        styleFromParent: {
            type: Object,
            required: false,
            default: null
        }
    },

    data: function() {
        return {
            zStyle:{
                zIndex:ProId.getOrderId(),
                position: 'absolute',
                left:'opx',
                top:'0px'
            },
            idData: {
                id: ProId.getUniqueId(), //组件id
                type: this.typeProp, //组件类型
                pageId: this.pageIdProp //组件所在的页面id
            },
            handles: [],
            defultPostion: {
                top: this.styleFromParent.top,
                left: this.styleFromParent.left,
                width: this.styleFromParent.width,
                height: this.styleFromParent.height
            },
            defautlOhterStyle: {}
        };
    },
    watch: {},
    destroyed(){
        console.log('组件'+this.idData.id+'已经被删除');
    },
    created() {
    //这里判断是否加载背景图片
   
        let style = { ...this.styleFromParent };

        switch (this.idData.type) {
        case 'image':
            style = {
                ...style,
                backgroundImage: 'url(' + this.styleFromParent.backgroundImage + ')'
            };
            break;
        case 'input':
            break;
        case 'button':
            break;
        }

        this.setStyle(style);
    },
  
    mounted() {
        this.triggerStyleChangeEvent();
        event.listonEvent(
            event.editStyleChangeName,
            function(va) {
      
                if (va.obj === this) {
                    this.setStyle(styleVal.addPx({ ...va.style }));
                }
            }.bind(this)
        );
    },

    methods: {
  
        //**导出组件的位置信息 宽 高 top left zindex */
        exportPostionInfo(){
            return {
                ...this.defultPostion,
                zIndex: this.zStyle.zIndex
            };
        },

        triggerStyleChangeEvent() {
            event.triggerEvent(event.childStyleChangeName, {
                style: this.getAllStyle(),
                obj: this
            });
        },

        getAllStyle() {
            return { ...this.defultPostion, ...this.defautlOhterStyle };
        },
        //设置样式，可以只设置部分样式
        setStyle(styleJsonObj) {
            if (!styleJsonObj) return;

            console.log('待设置的样式', styleJsonObj);

            var posKeyName = ['top', 'left', 'width', 'height'];
           

            //把top left 取出设置到位置样式对象

            for (let a of posKeyName) {
                let tem = (styleJsonObj[a] + '').replace('px', '');

                if (tem && parseInt(tem) == tem) {
                    if (a in this.defultPostion) {
                        this.defultPostion[a] = parseInt(tem);
                    } else {
                        this.$set(this.defultPostion, a, parseInt(tem));
                    }
                }
            }

 
            if (!this.defautlOhterStyle) {
                this.defautlOhterStyle = {};
            }

            for (let a in styleJsonObj) {
                if (posKeyName.indexOf(a) <= -1) {
                    if (a in this.defautlOhterStyle) {
                        this.defautlOhterStyle[a] = styleJsonObj[a];
                    } else {
                        this.$set(this.defautlOhterStyle, a, styleJsonObj[a]);
                    }
                }

      
            }

            console.log(
                '设置后 defautlOhterStyle  defultPostion',
                this.defautlOhterStyle,
                this.defultPostion
            );
        },
        //写json文件提交
        saveStyleToJson() {
            var jsonVal = {
                fileName:
          this.idData.type + '_' + this.idData.id, //预览组件时根据json文件名称可以判断这份配置的对象位置
                style: { ...this.getAllStyle() },
                idData: { ...this.idData },
                     
                //还要补充事件代码保存为json
                //屏幕适配办法 涉及到的大小单位都是px 保存设计时的屏幕宽度 在预览或运行时 获取运行环境屏幕宽度，
                //根据runScreenWidth/designScreenWidth*json配置里的组件宽度  就等于实际运行时的组件宽度
            };

            
        },

        onDragstop() {
            console.log('拖动结束', arguments);
            let left = arguments[0];
            let top = arguments[1];
            //保存属性参数
            if (left == this.defultPostion.left && this.defultPostion.top == top) {
                return;
            }
            this.setStyle({
                left,
                top
            });

            this.triggerStyleChangeEvent();
        },
        onResizstop() {
            console.log('调整大小结束', arguments);
            let left = arguments[0];
            let top = arguments[1];
            let width = arguments[2];
            let height = arguments[3];
            if (
                left == this.defultPostion.left &&
        this.defultPostion.top == top &&
        this.defultPostion.width == width &&
        this.defultPostion.height == height
            ) {
                return;
            }
            //保存属性参数
            this.setStyle({
                left,
                top,
                width,
                height
            });

            this.triggerStyleChangeEvent();
        },
        // childclick() {
        //     this.$emit('clickEvent');
        // },
        onActivated() {
            this.handles = handlesParam;
            let allStyle = this.getAllStyle();
            this.$emit('selectedEvent', allStyle, this);
            this.triggerStyleChangeEvent();
            //保存属性参数
        },
        onDeactivated() {
            this.handles = [];
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
</style>




