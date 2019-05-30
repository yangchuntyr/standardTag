<template>
  <div class="left">
    <div class="title" draggable="true">元件库</div>
    <div class="lib">
      <div class="block" v-for="(item,index) in items" :key="index">
        <div    @dragstart="start(index)" 
        :style="{backgroundImage:'url('+item.icon+')'}"
            draggable="true" 
               class="darg"
            @dragend="dragend(item,$event)">
          <!-- <img
            :src="item.icon"
            alt="图片加载失败"
            class="darg"
         
          > -->
        </div>

        <div class="tip" v-text="item.name"></div>
      </div>
    </div>
  </div>
</template>
<script>
import commonEvent from '../js/eventCtr';
import componentsLib from '../../static/json/componentLib';
console.log('componentsLib=', componentsLib);

var event = commonEvent.getEventInstance();
export default {
    data() {
        return {
            items: componentsLib
        };
    },
    methods: {
        dragend() {
            console.log('拖动结束', { ...arguments });
            event.triggerEvent(event.dragEndName, {
                ctrInfo: { ...arguments[0] },
                x: arguments['1'].pageX,
                y: arguments['1'].pageY
            });
        },
        start() {
            console.log('开始拖动', arguments);
        }
    }
};
</script>

<style scoped>
.left {
  width: 253px;
  height: 100%;
  border: solid lightcyan 1px;
}

.title {
  width: 100%;
  height: 55px;
  text-align: center;
  line-height: 55px;
  border-bottom: solid 1px lightgray;
}
.lib {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 10px 10px;
    flex-wrap: wrap;
}

.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;

}
.darg {
  width: 60px;
  height: 60px;
  background-size: 100% auto;
  background-color: #F2F2F2;
}

div.tip {
  color: #bfbfbf;
}
</style>
