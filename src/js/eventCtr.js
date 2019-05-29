import Vue from 'vue';

//使用vue 的$on 和 $emit 在整个项目里传递事件和响应事件

console.log("开始运行")
var tem= function() {
    
  var Event=null;//唯一的事件
 
  function CreateEvent() {
    this.event=new Vue(); 
  
    //子控件样式改变事件名称
    this.childStyleChangeName="childStyleChange";
    //编辑框控件样式改变事件
    this.editStyleChangeName="editStyleChangeName";
    this.dragEndName="dragEndName";
    //右键点击弹出菜单事件
    this.rightClickName="rightClickName";
    this.listonEvent=function(eventName,fn) {
       
        this.event.$on(eventName,fn)

      
    }  

    //***  *//
    this.triggerEvent=function(eventName,sendData) {
        if((typeof sendData) !=='object' )
        throw "触发事件传递的数据必须是对象";
        this.event.$emit(eventName,{...sendData});  
    }

  }
  return {

      getEventInstance:function() {
         if(!Event) {
             Event=new CreateEvent();
         }

         return Event;
      },
    
     
  }

};

 export default tem();