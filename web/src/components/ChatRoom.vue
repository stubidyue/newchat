<script setup lang="ts">
import {ref,computed} from 'vue'
import ChatRoomItem from './ChatRoomItem.vue'
const usercheck=ref(false)

const allUserList = [
  {
    id:1,
    name:"小坏越"
  },
  {
    id:2,
    name:"小笨蛋"
  }
  ,{
    id:3,
    name:"小帅哥"
  },{
    id:4,
    name:"小美女"
  },{
    id:5,
    name:"小哈皮"
  }
];
const partUsersList=[];

/* let index =0 ;
for (let round=0;round<allUserList.length/4;round++){
    let userList =[];
    for (let i=0;i<4&& index< allUserList.length;i++){
      userList.push(allUserList[index++]);
    }
    partUsersList.push(userList)
} */
const reativePartUsersList = ref(partUsersList)
const userinfocheck=(x)=>{
  partUsersList.push([allUserList[x]])
  usercheck.value=true
}




</script>

<template >
  <div v-if="usercheck==false" class="buttoninfo">
  <el-button type="primary" v-for="(user,index) in allUserList" :key="index" @click="userinfocheck(index)">{{ user.name }}</el-button>
</div>
      <div v-else>
        
        <el-row v-for="(userList,index) in reativePartUsersList" :key="index" :gutter="20" class="chat-out-box">
          <ChatRoomItem v-for="userInfo in userList" :key="userInfo.id"  :username="userInfo.name"/>
        </el-row>
    </div>
      
    
         
    
</template>

<style scoped>
.buttoninfo{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat-out-box {
  margin-bottom: 10px;
}


</style>
