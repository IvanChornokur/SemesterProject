import { useState, useEffect, useRef } from "react";
import { REST, AUCTION, CHAT } from "../env/config.jsx";
export default function Chat({ userName, id }) {
   const [chatStomp, setChatStomp] = useState(null);
   const [messages, setMessages] = useState([]);
   const chatContainerRef = useRef(null);
   const scrollToBottom = () => {
      if (chatContainerRef.current) {
         chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
      }
   };

   useEffect(() => {
      const socket = new SockJS(CHAT.connect);
      const chatStomp = Stomp.over(socket);
      chatStomp.connect({}, () => {
         fetch(CHAT.getMessages(id))
            .then((res) => res.json())
            .then((data) => {
               setMessages(data);
               scrollToBottom();
            });

         setChatStomp(chatStomp);
         chatStomp.subscribe(CHAT.subscribe(id), (response) => {
            console.log(JSON.parse(response.body));
            setMessages((mesgs) => [...mesgs, JSON.parse(response.body)]);
            scrollToBottom();
         });
      });
      return () => {
         if (chatStomp.connected) {
            chatStomp.disconnect();
         }
      };
   }, []);
   const [activeChat, setActiveChat] = useState(false);

   return (
      <aside className={"chat" + ` ${activeChat ? "--active" : ""}`}>
         <h3>Auction chat</h3>
         <ul className="message-list" ref={chatContainerRef}>
            {messages &&
               messages.map((el, i) => (
                  <Message
                     key={i}
                     sender={el.sender}
                     message={el.message}
                     color={el.color}
                  />
               ))}
         </ul>
         <ChatUI chatStomp={chatStomp} userName={userName} id={id} />
      </aside>
   );
}

function Message({ sender, message, color }) {
   return (
      <li>
         <span style={{ color: color }}>{sender}: </span> <span>{message}</span>
      </li>
   );
}

function ChatUI({ chatStomp, userName, id }) {
   const [color, setColor] = useState("#dc4c64");
   const [message, setMessage] = useState("");
   return (
      <form
         className="chat-ui"
         onSubmit={(e) => {
            e.preventDefault();
            const sendData = {
               message,
               sender: userName,
               color
            };
            // bidStomp.send(CHAT.sendTo(id),{}, )
            chatStomp.send(CHAT.sendTo(id), {}, JSON.stringify(sendData));
            setMessage("");
         }}
      >
         <fieldset className="left">
            <textarea
               value={message}
               onChange={({ target }) => setMessage(target.value)}
            ></textarea>
         </fieldset>
         <fieldset className="right">
            <button>Send</button>
            <select
               style={{
                  backgroundColor: color,
                  color: color === "#fbfbfb" ? "#332d2d" : "#fbfbfb"
               }}
               value={color}
               onChange={({ target }) => setColor(target.value)}
            >
               <option value="#fbfbfb">white</option>
               <option value="#dc4c64">red</option>
               <option value="#14a44d">green</option>
               <option value="#3b71ca">blue</option>
            </select>
         </fieldset>
      </form>
   );
}
