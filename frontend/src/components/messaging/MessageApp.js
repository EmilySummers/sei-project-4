import React from 'react'
// import Chatkit, { ChatManager } from '@pusher/chatkit-client-react'
import Chatkit from '@pusher/chatkit-client'

import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'

const instanceLocator = "v1:us1:e5a1fcac-3d9a-42de-921c-15646850583f"
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e5a1fcac-3d9a-42de-921c-15646850583f/token"
const username = "Emily"
const roomId = "4f67e1e7-62f1-4c4f-a0d2-404ac53039ce"

class MessageApp extends React.Component {
  state = {
    messages: []
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: username,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    })
    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.currentUser.subscribeToRoom({
          roomId: roomId,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        })
      })
  }

  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text,
      roomId: roomId
    })
  }

  render() {
    return (
      <div className="app">
        <p className="title">My awesome chat app</p>
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages} />
        <SendMessageForm
          sendMessage={this.sendMessage} />
      </div>
    )
  }
}

export default MessageApp