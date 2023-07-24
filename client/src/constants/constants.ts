export const chatData = [
    {
      id:"1",
      date: '2023-05-30',
      chat: 'Hello, how are you?',
      sendTime: '09:15 AM',
      userName: 'John',
    },
    {
      id:"2",
      date: '2023-05-30',
      chat: "Hi i'm good",
      sendTime: '09:20 AM',
      userName: 'Emily',
    },
    {
      id:"3",
      date: '2023-05-30',
      chat: 'Im doing great. What can I help you with?',
      sendTime: '09:25 AM',
      userName: 'Joji',
    },
    {
      id:"4",
      date: '2023-05-30',
      chat: 'I have a question about your product.',
      sendTime: '09:30 AM',
      userName: 'Emilia',
    },
    {
      id:"5",
      date: '2023-05-30',
      chat: 'Sure, feel free to ask. I am here to assist you.',
      sendTime: '09:35 AM',
      userName: 'Joe',
    },
  ];

  // export const MESSAGE_STATUS_TYPE ={
  //   'PENDING':"PENDING",
  //   "DELIVERED":"DELIVERED",
  //   "READ":"READ",
  //   "SENT":"SENT",
  //   "FAILURE":"FAILURE",
  // } as const;


  export type MESSAGE_STATUS_TYPE = 'Pending' | 'Delivered' | 'Read' | 'Sent' | 'Failure';

  // type STATUS_TYPE<T> = 



  