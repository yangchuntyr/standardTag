//生成一个7位数以上的唯一id

class ProUniqueId {
    constructor(){
        //以后保存到数据库后可以从这里获取数据库最新的最大的id来
       
        var maxId= localStorage.getItem("maxId")
        console.log("maxid只",maxId)
        if(!maxId){
          maxId=1000000;
        }
        this.id=Number.parseInt( maxId)+1;
    }
    static getInstance() {
      if (!ProUniqueId.instance) {
        ProUniqueId.instance = new ProUniqueId();
      }
      return ProUniqueId.instance;
    }


     getUniqueId(){
        // this.id++;
       //  localStorage.setItem("maxId",this.id)
       let time=new Date();
      // time.getTime();
         return  time.getTime();
     }

  }
  
  var proUniqueId = ProUniqueId.getInstance();

  export default proUniqueId;