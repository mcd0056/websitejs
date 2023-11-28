(function() {
  // CSS for the chat widget
  const css = `
      .chat-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          font-family: Arial, sans-serif;
          z-index: 1000;
      }
      .chat-button {
          background-color: #007bff;
          color: white;
          padding: 12px 25px;
          border-radius: 25px;
          cursor: pointer;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s, box-shadow 0.3s;
      }
      .chat-button:hover {
          background-color: #0056b3;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      }
      .chat-container {
          display: none;
          width: 400px;
          height: 500px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background-color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          transition: transform 0.3s;
      }
      .messages {
          height: calc(90% - 100px);
          overflow-y: auto;
          padding: 10px;
      }
      .chat-header {
          background-color: #007bff;
          color: white;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .chat-title {
          margin: 0;
          font-weight: bold;
      }
      .close-button {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          transition: transform 0.2s;
      }
      .close-button:hover {
          transform: rotate(90deg);
      }
      .input-area {
          display: flex;
          border-top: 1px solid #ddd;
          padding: 10px;
      }
      .user-input {
          flex-grow: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-right: 10px;
      }
      .send-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
      }
      .send-button:hover {
          background-color: #0056b3;
      }
      .spinner {
          display: none;
          justify-content: center;
          align-items: center;
          padding: 10px 15px;
          border-radius: 5px;
      }
      .spinner img {
          width: 24px;
          height: auto;
      }
      .message {
          max-width: 70%;
          margin-bottom: 10px;
          padding: 8px 12px;
          border-radius: 15px;
          word-break: break-word;
          line-height: 1.4;
          position: relative;
          animation: fadeIn 0.3s ease-out;
      }
      .bot-message {
          background-color: #f0f0f0;
          align-self: flex-start;
          margin-left: 10px;
          border-bottom-left-radius: 0;
      }
      .user-message {
          background-color: #007bff;
          color: white;
          align-self: flex-end;
          margin-right: 10px;
          border-bottom-right-radius: 0;
      }
      @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
      }
      .messages {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          overflow-y: auto;
          padding: 10px;
          height: calc(90% - 100px);
      }
      .messages .user-message {
          align-self: flex-end;
      }
      .chat-logo {
          height: 30px;
          margin-right: 10px;
      }
      .message {
          display: flex;
          align-items: center;
      }
      .bot-avatar, .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 8px;
      }
      @media screen and (max-width: 600px) {
          .chat-container {
              width: 90%;
              height: 60%;
              bottom: 5%;
              right: 5%;
              border-radius: 5px;
          }
          .message {
              max-width: 85%;
          }
          .chat-button {
              padding: 10px 20px;
              font-size: 14px;
          }
      }
  `;

  // HTML for the chat widget
  const html = `
      <div class="chat-widget">
          <div id="chatButton" class="chat-button">
              Chat With Us!
          </div>
          <div id="chatContainer" class="chat-container">
              <div class="chat-header">
                  <img src="https://i.imgur.com/7LVNdsA.png" alt="Logo" class="chat-logo" />
                  <span class="chat-title">Automatrix AI Chatbot</span>
                  <button id="closeButton" class="close-button">&times;</button>
              </div>
              <div id="messages" class="messages"></div>
              <div class="input-area">
                  <input type="text" id="userInput" placeholder="Type a message..." class="user-input">
                  <button id="sendButton" class="send-button">Send</button>
                  <div id="spinner" class="spinner" style="display: none;">
                      <img src="https://i.imgur.com/Rj6x3Lh.gif" alt="Loading...">
                  </div>
              </div>
          </div>
      </div>
  `;

  // Function to inject CSS
  function injectCSS() {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      document.head.appendChild(style);
  }

  // Function to inject HTML
  function injectHTML() {
      document.body.innerHTML += html;
  }

  // Your existing JavaScript code for the chat widget
    // Your existing JavaScript code for the chat widget
    function setupChatWidget() 
      let isFirstOpen = true; // Flag to track the first opening of the chat widget

      document.getElementById('chatButton').addEventListener('click', function() {
          document.getElementById('chatContainer').style.display = 'block';
          document.getElementById('chatButton').style.display = 'none';

          if (isFirstOpen) {
              streamMessage('Bot', "Welcome to our assistant bot, how may I help you today?");
              isFirstOpen = false; // Set the flag to false after the first open
          }
      });

      document.getElementById('closeButton').addEventListener('click', function() {
          document.getElementById('chatContainer').style.display = 'none';
          document.getElementById('chatButton').style.display = 'block';
      });

      document.getElementById('sendButton').addEventListener('click', sendMessage);

      // Function to display a message with avatar
      function displayMessage(sender, message) {
          var messagesContainer = document.getElementById('messages');
          var messageElement = document.createElement('div');
          messageElement.classList.add('message', sender === 'User' ? 'user-message' : 'bot-message');

          var avatarImg = document.createElement('img');
          avatarImg.src = sender === 'User' ? 'https://i.imgur.com/ztPvO4r.png' : 'https://i.imgur.com/K02Xv1C.png'; // Add your avatar paths
          avatarImg.classList.add(sender === 'User' ? 'user-avatar' : 'bot-avatar');
          messageElement.appendChild(avatarImg);

          var textElement = document.createElement('div');
          textElement.textContent = message;
          messageElement.appendChild(textElement);

          messagesContainer.appendChild(messageElement);
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }

      function sendMessage() {
          var userInput = document.getElementById('userInput');
          var message = userInput.value.trim();
          if (!message) return;

          userInput.value = '';
          displayMessage('User', message);
          toggleSpinner(true);

          fetch('https://website-backend-amcdonald24.replit.app/webchat', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: message, thread_id: "" }),
          })
          .then(response => response.json())
          .then(data => {
              toggleSpinner(false);
              if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('response')) {
                  streamMessage('Bot', data[0].response);
              } else {
                  displayMessage('Bot', 'No valid response');
              }
          })
          .catch(error => {
              toggleSpinner(false);
              displayMessage('Bot', 'Error: ' + error.message);
          });
      }

      document.getElementById('userInput').addEventListener('keypress', function(event) {
          if (event.key === 'Enter') {
              event.preventDefault();
              sendMessage();
          }
      });

      function toggleSpinner(show) {
          var spinner = document.getElementById('spinner');
          var sendButton = document.getElementById('sendButton');
          if (spinner && sendButton) {
              spinner.style.display = show ? 'flex' : 'none'; // Show or hide the spinner
              sendButton.style.display = show ? 'none' : 'block'; // Hide or show the send button
          }
      }

      function streamMessage(sender, message, index = 0) {
          if (index === 0) {
              displayMessage(sender, '');
          }

          var messagesContainer = document.getElementById('messages');
          var messageElements = messagesContainer.getElementsByClassName(sender === 'User' ? 'user-message' : 'bot-message');
          var messageElement = messageElements[messageElements.length - 1];
          var textElement = messageElement.lastChild; // Get the last child (text element)

          if (index < message.length) {
              textElement.textContent += message.charAt(index);
              setTimeout(function() {
                  streamMessage(sender, message, index + 1);
              }, 15);
          }
      }

  

    // Inject CSS and HTML then initialize the chat widget
    injectCSS();
    injectHTML();
    setupChatWidget();
})();
