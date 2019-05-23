<template>
    
<div class="left">
    <div @dragstart="start" draggable="true" @dragend="dragend">按钮1</div>
    <div @dragstart="start"  draggable="true" @dragend="dragend">按钮2</div>
</div>


</template>
<script>
import commonEvent from "../js/eventCtr";
var event = commonEvent.getEventInstance();
export default {
    methods:{
        dragend(){ 
            
            console.log("拖动结束",arguments)
            event.triggerEvent(event.dragEndName,
            {ctrType:"button",
            x:arguments["0"].clientX,
            y:arguments["0"].clientY
            }
            )
            },
        start(a)
        {
            console.log("开始拖动",arguments)
        }
    }
}
</script>

<style scoped>
.left{
    width: 200px;
    height: 100%;
    border: solid lightcyan 1px;
}
.left>div{
    width: 100px;
    height: 100px;
    border: solid 1px lightblue;
}
</style>
