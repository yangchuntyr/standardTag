//生成一个7位数以上的唯一id

class ProUniqueId {
    constructor(){
        //以后保存到数据库后可以从这里获取数据库最新的最大的id来
       
        var maxId= localStorage.getItem('maxId');
        console.log('maxid只',maxId);
        if(!maxId){
            maxId=1;
        }
        this.id=Number.parseInt( maxId)+1;
    }
    static getInstance() {
        if (!ProUniqueId.instance) {
            ProUniqueId.instance = new ProUniqueId();
        }
        return ProUniqueId.instance;
    }


    //*返回时间时间戳用于做唯一id */
    getUniqueId(){
       
        let time=new Date();
     
        return  time.getTime();
    }
    /**获得自动增加的id */
    getOrderId(){
        this.id++;
        localStorage.setItem('maxId',this.id);
        return this.id+100;
    }

}
  
var proUniqueId = ProUniqueId.getInstance();

export default proUniqueId;