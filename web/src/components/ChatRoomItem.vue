<script setup lang="ts">
import { onMounted, ref } from "vue"
import { Msg } from "@/model"

const props=defineProps<{
  username: string
}>();
//时间函数
const currentTime = ref('');
const updateCurrentTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleString(); // 根据需要格式化时间
  console.log(currentTime.value)
};
updateCurrentTime();

const toSendMsg = ref("");

const username=props.username;

const receiveMsgList = ref<Msg[]>([])

const ws = new WebSocket('ws://localhost:3000');

onMounted(() => {
  // WebSocket 服务器的 URL
  const wsUrl = 'ws://localhost:3000';

// 创建 WebSocket 连接
const ws = new WebSocket(wsUrl);

// 监听连接成功事件
ws.addEventListener('open', function () {
  console.log(username,'进入聊天室');
  const toSendMsg=ref('系统消息:'+username+'进入聊天室')
  const msgInfo= new Msg('xitong',toSendMsg.value,currentTime.value)
  ws.send(JSON.stringify(msgInfo));

  // 发送消息给服务器
});

// 监听接收到消息事件
ws.addEventListener('message', function (event) {
  updateCurrentTime()
  console.log('Blob content as string:', event.data);
  console.log(currentTime.value)
  receiveMsgList.value.push(JSON.parse(event.data))

});

// 监听连接关闭事件
ws.addEventListener('close', function () {
  console.log('Disconnected from WebSocket server');
});

// 监听连接错误事件
ws.addEventListener('error', function (error) {
  console.error('WebSocket error:', error);
});
})

function sendMsg(){
  const msgInfo= new Msg(username,toSendMsg.value,currentTime.value)
  ws.send(JSON.stringify(msgInfo));
  toSendMsg.value="";
}




</script>

<template>
  <el-col :span="20">
    <div class="chart-out-box">
      <div class="chart-room-head">
        <el-scrollbar height="400px">
          <div v-for="(item, index) in receiveMsgList" :key="index" style="width: 100%;display: flex;" :style="{justifyContent: item.username === username ? 'flex-end' : 'flex-start'}"> 
            <p v-if="item.username=='xitong'" class="scrollbar-demo-is-xitong">
               {{item.content}}</p>
            <p v-else-if="item.username == username" class="scrollbar-demo-item scrollbar-demo-is-own">
              <span style="font-size: 12px;font-weight: 600;margin-left: 10px;">{{item.currentTime}}</span><span>{{item.content}}</span></p>

            <p v-else class="scrollbar-demo-item scrollbar-demo-is-other">
                <span>{{item.username}}:{{ item.content }}</span><span style="font-size: 12px;font-weight: 600;margin-right: 10px;">{{item.currentTime}}</span></p>
          </div>
          
        </el-scrollbar>
      </div>
      <div class="chart-room-footer">
        <el-input v-model="toSendMsg" style="width: 90%;margin-left: 20px;" :rows="4" type="textarea" placeholder="请输入文字" />
        <el-button type="success" style="margin-left:10px" @click="sendMsg" >发送</el-button>
      </div>
    </div>
  </el-col>

</template>

<style lang="scss" scoped>
.chart-out-box {
  border: 1px solid black;
  border-radius: 10px;
  height: 80vh;
  box-shadow: 2px 2px 2px rgba($color: #000000, $alpha: 0.5);
}

.chart-room-head {
  height: 80%;
}

.chart-room-footer {
  display: flex;

}

.scrollbar-demo-item {
  width: 60%;
  display: flex;
  align-items: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.scrollbar-demo-is-own {
  justify-content: right;
  background-color: greenyellow;
  justify-content: space-between;
}

.scrollbar-demo-is-other {
  justify-content: left;
  justify-content: space-between;
}
.scrollbar-demo-is-xitong {
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);

  justify-content: center;
  background-color: white;
  font-size: 12px;
}

</style>
