import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./layouts/RootLayout"
import { BasicLayout } from "./layouts/BasicLayout"
import { HomePage } from './components/home/HomePage'
import { ChatPage } from './components/chat/ChatPage'
import { HelpPage } from './components/help/HelpPage'
import { NewsPage } from './components/news/NewsPage'
import { CommandKDemo } from "./components/pages/CommandKDemo" 

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/messages",
        element: <ChatPage />
      },
      {
        path: "/help",
        element: <HelpPage />
      },
      {
        path: "/news",
        element: <NewsPage />
      }
    ]
  },
  {
    path: "/cmdk",
    element: (
      <BasicLayout>
        <CommandKDemo />
      </BasicLayout>
    ),
  },
])

export function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
