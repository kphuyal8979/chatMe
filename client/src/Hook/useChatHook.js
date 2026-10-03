import {create} from 'zustand'
import { axiosInstance } from '../api/axios';
import { toast } from 'react-hot-toast';
import { useAuthHook } from './useAuthHook';

export const useChatHook = create((set,get)=>({
    allContacts:[],
    chats: [],
    messages:[],
    activeTab:"chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    setActiveTab: (tab) => set({activeTab: tab}),
    setSelectedUser: (user) => set({selectedUser: user}),

    getAllContacts: async()=>{
        set({ isUsersLoading: true });

        try{
            const res = await axiosInstance.get('/messages/contacts');
            set({ allContacts: res.data });
        }
        catch(err){
            toast.error(err.response.data.message || "Something went wrong while fetching contacts");
        }
        finally{
            set({ isUsersLoading: false });
        }
    },
   getMyChatPartners: async()=>{
        set({ isUsersLoading: true });

        try{
            const res = await axiosInstance.get('/messages/chats');
            set({ chats: res.data });
        }
        catch(err){
            toast.error(err.response.data.message || "Something went wrong while fetching chats");
        }
        finally{
            set({ isUsersLoading: false });
        }
    },
getMessagesByUserId:async(userId)=>{
        set({ isMessagesLoading: true });
        try{
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        }catch(err){
            toast.error(err.response.data.message || "Something went wrong while fetching messages");
        }finally{
            set({ isMessagesLoading: false });
        }
},
sendMessage:async(messageData) =>{
    const {selectedUser,messages} = get()
    const { authUser } = useAuthHook.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };
    // immidetaly update the ui by adding the message
    set({ messages: [...messages, optimisticMessage] });
    try{
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
        set({messages:messages.concat(res.data)})
    }
    catch(error){
        set({messages:messages})
        toast.error.response.data.message
    }
},
subscribeToMessages:()=>{
    const {selectedUser} = get()
    if(!selectedUser) return

    const socket = useAuthHook.getState().socket;


    socket.on("newMessage",(newMessage)=>{
        const currentMessages = get().messages
        set({messages:[...currentMessages,newMessage]})
    })


},
unSubscribeFromMessages:()=>{
    const socket = useAuthHook.getState().socket;
    socket.off("newMessage")
}

}))