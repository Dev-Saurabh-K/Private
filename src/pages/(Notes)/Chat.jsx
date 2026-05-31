import { useEffect, useState } from "react";
import { useTopicStore } from "../../store/topicStore";
import { useStore } from "../../store/counterStore";
import axios from "axios";

const Chat = () => {
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

  const handleSubmitChat = async () => {
    await axios.post(
      SENDURL,
      {
        message: message,
        topic_id: topic_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    inc();
    setMessage("")
  };

  return (
    <div>
      {/* for chats */}
      <div className="bg-blue-300 w-full h-100">
        {messages.map((m, index) => (
          <div key={index}>
            <div>{m.usermessage}</div>
            <div>{m.aimessage}</div>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          className="w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="size-10 bg-blue-400" onClick={handleSubmitChat}>
          submit
        </div>
      </div>
    </div>
  );
};

export default Chat;
