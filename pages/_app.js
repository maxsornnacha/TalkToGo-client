import "@/styles/globals.css";
import { ChatToggleProvider } from "@/components/Chats/ToggleChatContext";



export default function App({ Component, pageProps }) {

  return(
    <ChatToggleProvider>
          <Component {...pageProps} />
    </ChatToggleProvider>      
  )
 
}
