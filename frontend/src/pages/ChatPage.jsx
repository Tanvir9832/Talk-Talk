import { useGetApi } from "../hooks/useApiHandle"


const ChatPage = () => {
    const data = useGetApi("chat");
    console.log(data);
  return (
    <div>
        {
            data.map((chat)=>{

                return(
                    <p key={chat._id}>{chat.chatName}</p>
                )
            })
        }
    </div>
  )
}

export default ChatPage