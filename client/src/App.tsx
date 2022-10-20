import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate} from "react-router-dom";
import {Layout} from "./components/Layout";
import {RequireAuth} from "./service/requireAuth";
import {HomePage} from "./pages/HomePage";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import {Settings} from "./pages/Settings";

export const App = () => {
    const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={
        <RequireAuth>
          <HomePage/>
        </RequireAuth>
      }/>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='signin' element={<SignIn/>}/>
      <Route path='settings' element={<Settings  />}/>
      <Route path='*' element={<Layout/>}/>
    </Route>
  ))

  return (
    <RouterProvider router={router}/>
  )
}
