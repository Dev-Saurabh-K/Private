import { useEffect, useState } from "react";
import { useTopicStore } from "../../store/topicStore";
import { useStore } from "../../store/counterStore";
import { Send, X } from "lucide-react";
import axios from "axios";

const Chat = ({ topic, selectedText, setSelectedText, closeReply }) => {
  //for refreshing dependency on useeffect
  const count = useStore((state) => state.count);
  const inc = useStore((state) => state.inc);
  const topic_id = useTopicStore((state) => state.topic_id);
  const token = localStorage.getItem("access_token");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const SENDURL = `${import.meta.env.VITE_API_URL}/api/notes/chat/send`;
  const GETURL = `${
    import.meta.env.VITE_API_URL
  }/api/chat/retrive?topic_id=${topic_id}`;

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(GETURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
    };
    fetchMessages();
  }, [count]);

  const handlePressEnter = async (event) => {
    if (event.key === "Enter") {
      console.log("enter pressed!");
      handleSubmitChat();
    }
  };

  const handleSubmitChat = async () => {
    // if(selectedText){
    //   setMessage((prev)=>`${prev} ${selectedText}`);
    // }
    await axios.post(
      SENDURL,
      {
        message: `${message} ${selectedText}`,
        topic_id: topic_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    inc();
    setMessage("");
    setSelectedText("");
  };

  return (
    <div className="w-full h-10/12 flex flex-col border border-slate-300 rounded-md bg-slate-200 text-slate-950 items-center">
      <div className="w-full flex justify-around items-center md:text-xl bg-slate-950 text-white rounded-md p-2 ">
        <div className="font-semibold ">SynaptiQ</div>
        <div>Ask Doubts About the Topic</div>
      </div>
      <div className="w-fit p-1 border border-slate-950 rounded-xl mt-2 font-semibold">
        Topic: {topic}
      </div>
      {/* for chats */}
      <div className=" w-full h-11/12 flex flex-col p-2 gap-6 overflow-y-auto hide-scrollbar">
        {messages.map((m, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="text-white text-2xl bg-slate-700 rounded-md p-2 w-fit h-fit ml-auto">
              <div className=" mr-auto w-fit h-fit px-8 text-lg">
                {m.usermessage}
              </div>
            </div>
            <div className="font-sans w-fit h-fit p-2 bg-slate-300 rounded-md">
              {m.aimessage}
            </div>
          </div>
        ))}
      </div>
      <div className=" w-full border-t border-slate-300 rounded-md flex flex-col relative">
        {selectedText && (
          <div className="border-l-4 border-gray-600 rounded-md p-1 ">
            <div
              className="absolute top-0 right-0 h-fit w-fit rounded-full cursor-pointer"
              onClick={closeReply}
            >
              <X />
            </div>
            <div className="text-green-600">You</div>
            <div>{selectedText}</div>
          </div>
        )}

        <div className="flex flex-row">
          <input
            type="text"
            className="w-10/12 p-2 font-sans font-semibold"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handlePressEnter}
          />
          <div
            className="w-fit p-4 px-8 h-15 bg-slate-400 rounded-md flex items-center justify-center cursor-pointer hover:bg-slate-500"
            onClick={handleSubmitChat}
          >
            <Send className="text-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
