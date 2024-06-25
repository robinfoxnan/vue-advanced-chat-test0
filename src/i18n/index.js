// src/i18n/index.js
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    ROOMS_EMPTY: 'No rooms',
    ROOM_EMPTY: 'No room selected',
    NEW_MESSAGES: 'New Messages',
    MESSAGE_DELETED: 'This message was deleted',
    MESSAGES_EMPTY: 'No messages',
    CONVERSATION_STARTED: 'Conversation started on:',
    TYPE_MESSAGE: 'Type message',
    SEARCH: 'Search',
    IS_ONLINE: 'is online',
    LAST_SEEN: 'last seen ',
    IS_TYPING: 'is writing...',
    CANCEL_SELECT_MESSAGE: 'Cancel'
  },
  zh: {
    ROOMS_EMPTY: '没有会话',
    ROOM_EMPTY: '没有选择会话',
    NEW_MESSAGES: '新消息',
    MESSAGE_DELETED: '该消息已删除',
    MESSAGES_EMPTY: '没有消息',
    CONVERSATION_STARTED: '对话开始于：',
    TYPE_MESSAGE: '输入信息',
    SEARCH: '搜索',
    IS_ONLINE: '在线',
    LAST_SEEN: '上次在线',
    IS_TYPING: '正在输入...',
    CANCEL_SELECT_MESSAGE: '取消选择消息'
  }
};

const i18n = createI18n({
  locale: 'zh', // 设置默认语言
  messages,
});

export default i18n;
