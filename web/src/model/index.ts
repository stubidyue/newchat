export  class Msg {
    username:string;
    content:string;
    currentTime:String;
    constructor(username:string,content:string,currentTime:String){
      this.username=username
      this.content=content
      this.currentTime=currentTime
    }
  }