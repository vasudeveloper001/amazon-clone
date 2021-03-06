import React, { useEffect } from "react"
import Header from "./components/Header"
import Home from "./screens/Home"
import Footer from "./components/Footer"

import "./App.css"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Products from "./components/Products"
import Cart from "./screens/Cart"
import Login from "./components/Login"
import { auth } from "./firebase"
import { useStateValue } from "./components/StateProvider"
import Payment from "./screens/Payment"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Orders from "./screens/Orders"
import axios from "./axios"

const promise = loadStripe("pk_test_GGA4vSAelVuo40d1tnwnHZdU00glJZPfWf")

const App = () => {
  const [, dispatch] = useStateValue()

  useEffect(() => {
    const checkCpanelRoute = async () => {
      const res = await axios.get("/")
      console.log(res.data)
    }
    checkCpanelRoute()
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      } else {
        // the user logged out
        dispatch({
          type: "SET_USER",
          user: null,
        })
      }
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      <main className="app">
        <Header />
        <Switch>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/products/asus-store">
            <Products storepoint="asus" />
          </Route>
          <Route path="/products/acer-store">
            <Products storepoint="acer" />
          </Route>
          <Route path="/products/groceries">
            <Products storepoint="groceries" />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </main>
    </BrowserRouter>
  )
}

export default App
