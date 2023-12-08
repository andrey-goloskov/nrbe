import "./App.css"
import { useEffect } from "react"
import { customFetch } from "./customFetch.js"

function App() {
  useEffect(() => {
    let isUserSendAnalytics = localStorage.getItem("isUserSendAnalytics")

    if (!isUserSendAnalytics) {
      const anaData = {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth,
        screen: {
          availHeight: window.screen.availHeight,
          availWidth: window.screen.availWidth,
          availLeft: window.screen.availLeft,
          availTop: window.screen.availTop,
          height: window.screen.height,
          width: window.screen.width,
          top: window.screen.top,
          left: window.screen.left,
          colorDepth: window.screen.colorDepth,
          orientation: window.screen.orientation.type,
        },
      }

      const isProduction = process.env.NODE_ENV === "production"
      const apiURL = isProduction ? "-" : "http://localhost:80/"

      customFetch(`${apiURL}datas/api`, {
        options: { method: "GET" },
      }).then((response) => {
        console.log(response)
      })

      customFetch(`${apiURL}datas/`, {
        options: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(anaData),
        },
      }).then((res) => {
        if (res.status === 201) {
          localStorage.setItem("isUserSendAnalytics", true)
        }
      })
    }
  }, [])

  return (
    <div className="App">
      <p>Привет. Я развёрнутое приложение на облачной виртуальной машине.</p>
    </div>
  )
}

export default App
