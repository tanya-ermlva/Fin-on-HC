import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { BasicLayout } from "./layouts/BasicLayout"
import { CommandKDemo } from "./components/pages/CommandKDemo"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BasicLayout>
        <CommandKDemo />
      </BasicLayout>
    ),
  }
])

export function App() {
  return <RouterProvider router={router} />
}

export default App
