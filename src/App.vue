<template>
  <vue-advanced-chat
    ref="chat"
    :text-messages="JSON.stringify({
        ROOMS_EMPTY: $t('ROOMS_EMPTY'),
        ROOM_EMPTY: $t('ROOM_EMPTY'),
        NEW_MESSAGES: $t('NEW_MESSAGES'),
        MESSAGE_DELETED: $t('MESSAGE_DELETED'),
        MESSAGES_EMPTY: $t('MESSAGES_EMPTY'),
        CONVERSATION_STARTED: $t('CONVERSATION_STARTED'),
        TYPE_MESSAGE: $t('TYPE_MESSAGE'),
        SEARCH: $t('SEARCH'),
        IS_ONLINE: $t('IS_ONLINE'),
        LAST_SEEN: $t('LAST_SEEN'),
        IS_TYPING: $t('IS_TYPING'),
        CANCEL_SELECT_MESSAGE: $t('CANCEL_SELECT_MESSAGE')
      })"

    :current-user-id="currentUserId"
    :rooms="JSON.stringify(rooms)"
    :messages="roomMessages"
    
    :menu-actions="JSON.stringify(menuActions)"
		:message-selection-actions="JSON.stringify(messageSelectionActions)"

    :loading-rooms="loadingRooms"
		:rooms-loaded="messagesLoaded"
    :room-id="roomId"
    :room-message="roomMessage"
    :messages-loaded = "true"
    @add-room="addRoom($event.detail[0])"
    @fetch-messages="fetchMessages($event.detail[0])"
    @send-message="sendMessage($event.detail[0])"
    

 

    
  />
</template>

<script>
  import { register } from 'vue-advanced-chat'
  register()

  // Or if you used CDN import
  // window['vue-advanced-chat'].register()

  function formatDate(date) {  
        const year = date.getFullYear();  
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() 返回的是0-11，所以需要+1  
        const day = String(date.getDate()).padStart(2, '0');  
        const hours = String(date.getHours()).padStart(2, '0');  
        const minutes = String(date.getMinutes()).padStart(2, '0');  
        const seconds = String(date.getSeconds()).padStart(2, '0');  
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  
    }

  // 定义一组图标
  const icons = [
        'https://img.zcool.cn/community/011be85e7c4746a801216518820a5c.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100',
        'https://img2.baidu.com/it/u=791571287,3993258068&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        'https://img95.699pic.com/photo/30089/8039.jpg_wh300.jpg%21/fh/300/quality/90',
        'https://photo.16pic.com/00/86/39/16pic_8639554_b.jpg',
      ];

  // 存储所有用户
  const users = {
      "1" :{
        _id: '1',
        username: '小花儿',
        avatar: icons[2],
        status: {
          //state: 'online',
          //lastChanged: '今天, 14:30'
        }
      },
      "2": {
        _id: '2',
        username: '飞鸟',
        avatar: icons[3],
        status: {
          state: 'offline',
          lastChanged: '6月14日, 20:00'
        }
      }
    };

  const aMsg ={
    _id: '1',
    indexId: 1,
    content: '小花发送的测试消息',
    senderId: users["1"]._id,
    username: users["1"].username,
    avatar: users["1"].avatar,
    date: '13 November',
    timestamp: '10:20',
    system: false,
    saved: true,
    distributed: true,
    seen: true,
    deleted: false,
    failure: false,
    disableActions: false,
    disableReactions: false,
  };

  const bMsg ={
    _id: '2',
    indexId: 1,
    content: '飞鸟的测试消息',
    senderId: users["2"]._id,
    username: users["2"].username,
    avatar: users["2"].avatar,
    date: '11 月3 日',
    timestamp: '10:20',
    system: false,
    saved: true,
    distributed: true,
    seen: true,
    deleted: false,
    failure: false,
    disableActions: false,
    disableReactions: false,
  };

  let roomMsgMap = {
    "1": [aMsg],
    "2": [bMsg],
  };

  export default {
    data() {
      return {
        currentUserId: '1',
        roomsLoaded: true,
        loadingRooms: false,
        messagesLoaded: true,
        roomId : "1",
        currentMsgSeq:1,
        roomMessage:"",
      //   zhText: {
          
      // },
      
        rooms: [{
              roomId: '1',
              roomName: '飞鸟 的聊天',
              avatar: icons[0],
              unreadCount: 1,
              lastUpdated: Date.now(),
              index: 1,
              lastMessage: {
                _id: '1',
                content: '在么？在么？',
                senderId: '1',
                username: '小花儿',
                timestamp: '10:20',
                saved: true,
                distributed: false,
                seen: true,
                new: true
              },
              users: [
              users["1"], users["2"]
              ],
              typingUsers: [ '1' ]
            },
            {
              roomId: '2',
              roomName: '群聊',
              avatar: icons[1],
              unreadCount: 4,
              lastUpdated: Date.now(),
              index: 2,
              lastMessage: {
                _id: '2',
                content: '昨天我们做了一个测试……',
                senderId: '1',
                username: '飞鸟',
                timestamp: '10:20',
                saved: true,
                distributed: false,
                seen: true,
                new: true
              },
              users: [ users["1"], users["2"]
              ],
              typingUsers: [ '2' ]
            }
          ],
        roomMessages: [],
        // 左侧会话的小菜单
        roomActions:   
        [
           { name: 'inviteUser', title: '邀请用户' },
           { name: 'removeUser', title: '移除用户' },
           { name: 'deleteRoom', title: '清空会话' }
        ],
        // 右上角菜单
        menuActions: [
          { name: 'inviteUser', title: '邀请用户' },
           { name: 'removeUser', title: '移除用户' },
           { name: 'deleteRoom', title: '清空会话' }
        ],
        messageSelectionActions: [{ name: 'deleteMessages', title: 'Delete' }],
      }
    }, // end data

    
  computed: {
  
  },
  methods: {
    handleSendMessage({ roomId, text, author }) {
      const newMessage = {
        text,
        author,
        date: new Date()
      }
      this.messages[roomId].push(newMessage)
    },

    // 点击了聊天会话，会触发这个回调函数，在这里加载消息
    fetchMessages({ room, options = {} }) {
      this.messagesLoaded = false;
			this.$emit('show-demo-options', false)
      if (options.reset) {
				//this.resetMessages()
			}
      console.log("选项：" +options);
      console.log("选中会话：" +room.roomId);

      this.roomMessages = roomMsgMap[room.roomId]
      this.messagesLoaded = true

  },

  // 点击了发送按钮，则执行发送消息
  async sendMessage({ content, roomId, files, replyMessage }) {
      console.log("当前发送消息到对话：" + roomId );
      this.currentMsgSeq =  this.currentMsgSeq + 1;
      const u = users[this.currentUserId];

			const message = {
      
        _id : this.currentMsgSeq.toString(),
				senderId: this.currentUserId,
        username: u.username,
        avatar: u.avatar,
        content: content,
				timestamp: formatDate(new Date()),
        date: '6月25日',
      system: false,
      saved: true,
      distributed: true,
      seen: true,
      deleted: false,
      failure: false,
      disableActions: false,
      disableReactions: false,
			}

			if (files) {
				message.files = this.formattedFiles(files)
        console.log(files);
			}

			if (replyMessage) {
				message.replyMessage = {
					_id: replyMessage._id,
					content: replyMessage.content,
					sender_id: replyMessage.senderId
				}

				if (replyMessage.files) {
					message.replyMessage.files = replyMessage.files
				}
			}

      this.messagesLoaded = false
      roomMsgMap[roomId].push(message);
      // console.log(roomMsgMap[roomId]);

      this.roomMessages = [...roomMsgMap[roomId]]
      // 注意，下面的用法不行，不刷新
      //this.roomMessages = roomMsgMap[roomId]
      console.log(this.roomMessages);
      this.messagesLoaded = true

		},
    formattedFiles(files) {
			const formattedFiles = []

			files.forEach(file => {
				const messageFile = {
					name: file.name,
					size: file.size,
					type: file.type,
					extension: file.extension || file.type,
					url: file.url || file.localUrl
          // 注意，这里设置了HTTP的图片地址后，能正确加载，证明上传完毕，上传过程就停止了，不转了
          //url :"https://img0.baidu.com/it/u=1746301175,572912059&fm=253&fmt=auto&app=120&f=JPEG?w=580&h=500"
				}

				if (file.audio) {
					messageFile.audio = true
					messageFile.duration = file.duration
				}

				formattedFiles.push(messageFile)
			})

			return formattedFiles
		},

		openFile({ file }) {
			window.open(file.file.url, '_blank')
		},
  

}// methods,

}// end default
</script>