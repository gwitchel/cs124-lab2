import React from 'react'
import Login from "./Login";
import Register from "./auth/Register";
import Reset from "./auth/Reset";

function NotLoggedInApp() {
  return (
    <Login/>
  )
}

export default NotLoggedInApp