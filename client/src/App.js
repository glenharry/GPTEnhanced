import "./App.css";
import "./normal.css";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "How can I help you today?",
    },
    {
      user: "me",
      message: "I want to build an app",
    },
  ]);

  function clearChat() {
    setChatLog([]);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);
    const messages = chatLogNew.map((message) => message.message).join("\n");
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
      }),
    });
    const data = await response.json();
    await setChatLog([
      ...chatLogNew,
      { user: "gpt", message: `${data.message}` },
    ]);
    console.log(data.message);
    console.log("git test");
  }
  return (
    <div className="App">
      <aside className="sideMenu">
        <div className="sideMenuButton" onClick={clearChat}>
          <span className="sideMenuButtonIcon">+</span> New Chat
        </div>
      </aside>
      <section className="chatBox">
        <div className="chatLog">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        <div className="chatInputHolder">
          <form action="" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chatInputTextArea"
              name="chat-input"
              id="chat-input"
              rows="1"
              placeholder="Type your question here..."
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chatMessage ${message.user === "gpt" && "chatGPT"}`}>
      <div className="chatMessageCenter">
        <div className={`avatar ${message.user === "gpt" && "chatGPT"}`}></div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

export default App;

{
  /* <div className="chatMessage chatGTP">
    <div className="chatMessageCenter">
      <div className="avatar"></div>
      <div className="message">I am an ai </div>
    </div>
  </div> */
}

// https://www.youtube.com/watch?v=qwM23_kF4v4
