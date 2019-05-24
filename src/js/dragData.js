//拖动的数据
export default class DragData{
    constructor(){
        //是否拖到了正确的位置
        this.isFitPlace=false;
        ///拖动时的坐标 相对于手机框的坐标
        this.point={top:0,left:0};
        //拖动的组件类型
        this.type="";//button image 
        this.status="";//拖动状态 
    }

    reSet(){
          //是否拖到了正确的位置
          this.isFitPlace=false;
          ///拖动时的坐标 相对于手机框的坐标
          this.point={top:0,left:0};
          //拖动的组件类型
          this.type="";// 
          this.status="";//拖动状态  
    }
}

