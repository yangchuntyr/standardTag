//**处理样式对象 加px和去px 
 //
class styleDeal {
  constructor(){
     
  }

  //根据情况 加px或减px
    specialNames=["width","height","borderWidth","fontSize","borderRadius"];
   replacePx(val){
  
    
    //要加去掉px的样式名称
        for (const iterator of this.specialNames) {
           if(val[iterator]){
            val[iterator]=val[iterator].replace("px","");
           }   
        }
    return val;
  }

  addPx(styleDescription){
    //要加加px的样式名称
    for (const iterator of this.specialNames) {
        if(styleDescription[iterator]){
            styleDescription[iterator]=val[iterator]+"px";
        }   
     }

    return  styleDescription;
  }
}

export default new styleDeal();