import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Blog } from "./pages/blog"
import { Signin } from "./pages/Signin"
import { Blogs } from "./pages/blogs"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Publish } from "./pages/Publish"

function App() {

  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route index element={<Signin/>}></Route>
          <Route path="/blogs" element={<Blogs/>}></Route>
          <Route path="/blog/:id" element={<Blog/>}></Route>
          <Route path="/publish" element={<Publish/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
