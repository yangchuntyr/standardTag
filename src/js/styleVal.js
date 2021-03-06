//**处理样式对象 加px和去px 
//
class styleDeal {
 

  //根据情况 加px或减px                borderWidth
  specialNames = ['width', 'height', 'borderWidth', 'fontSize',  'borderRadius']; 
  replacePx(val) {
      return new Promise((resolve) => {
          let obj = {...val};
          for(let  key in obj){
              if(this.specialNames.indexOf(key)>=0){
                  obj[key] = obj[key].toString().replace(/px/g, '');
         
              }
          }
    
          resolve(obj);
      });
 


      //  if(!val)
      //  {
      //    return null;
      //  }
      // var copy={...val};


      // for (let iterator of this.specialNames) {
      //   if (copy[iterator]) {
      //     copy[iterator] = (copy[iterator].toString()).replace(/px/g, "");
      //   }
      // }

      // console.log("替换对象之后是",copy)
      // return obj;
  }

  

  addPx(styleDescription) {
      //要加加px的样式名称
      const names=[ 'borderWidth', 'fontSize', 'borderRadius'];

      if(!styleDescription)
          return null;
      for (const iterator of names) {
          if (styleDescription[iterator]&&(styleDescription[iterator]+'').indexOf('px')<0) {
              styleDescription[iterator] = styleDescription[iterator] + 'px';
          }
      }

      return styleDescription;
  }
}

export default new styleDeal();