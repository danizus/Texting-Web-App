const daniyalSelect = document.querySelector("#daniyal-select");
const sharimSelect = document.querySelector("#sharim-select");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".texts");
const chatInputForm = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const clearBtn = document.querySelector(".clearchat");
let messages = JSON.parse(localStorage.getItem('messages')) || []

// this will create a message template that will be used later and i will add this to the html text div whenever the user inputs a message
const createChatMessageElement = (message)=>{
   return `
    <div class="message ${message.sender === 'Daniyal'? 'red-bg':'gray-bg' }">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
</div>
`


}
window.onload = ()=>{
    messages.forEach((message)=> {
        chatMessages.innerHTML +=  createChatMessageElement(message)
        
    });
}

let messageSender = "Daniyal";
//this will change the msg heading 
const updateMessageSender = (name)=>{
    messageSender = name;
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `type here ${messageSender}...`;
    chatInput.focus();

}
// will change the color and will update message sender
daniyalSelect.onclick =() => {
    updateMessageSender("Daniyal");
    daniyalSelect.classList.add("active-person");
    sharimSelect.classList.remove("active-person");

}
sharimSelect.onclick =() => {
    updateMessageSender("Sharim")
    sharimSelect.classList.add("active-person");
    daniyalSelect.classList.remove("active-person")
}
// this will send the message and runs the createMessageElement function and pass a message object to it
const sendMessage = (e)=>{
    e.preventDefault();
    const timestamp = new Date().toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true})
    const message = {
        sender:messageSender,
        text:chatInput.value,
        timestamp,
    }
    // add this object to the array messages so that we can store it

    messages.push(message);
    localStorage.setItem('messages',JSON.stringify(messages));
    // to remove the input bar
    chatInputForm.reset();
    // to get to the bottom text
    chatMessages.scrollTop = chatMessages.scrollHeight;


    chatMessages.innerHTML += createChatMessageElement(message);
    
} 
// sends message
chatInputForm.addEventListener('submit',sendMessage);


clearBtn.addEventListener('click',()=>{
    localStorage.clear()
    chatMessages.innerHTML = '';
})