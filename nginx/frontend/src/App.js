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
      <div>
        <p style={{ fontSize: "20px" }}>
          1. Привет. Я развёрнутое приложение на облачной виртуальной машине.
        </p>
        <p style={{ fontSize: "18px" }}>
          2. Привет. Я развёрнутое приложение на облачной виртуальной машине.
        </p>
        <p style={{ fontSize: "16px" }}>
          3. Привет. Я развёрнутое приложение на облачной виртуальной машине.
        </p>
        <p style={{ fontSize: "14px" }}>
          4. Привет. Я развёрнутое приложение на облачной виртуальной машине.
        </p>
        <p style={{ fontSize: "12px" }}>
          5. Привет. Я развёрнутое приложение на облачной виртуальной машине.
        </p>
        <p style={{ fontSize: "10px" }}>
          6. Привет. Я развёрнутое приложение на облачной виртуальной машине.
        </p>
      </div>
      <div className="container_main">
        <div className="description">
          <p>
            Создателем интернет-мема стал 25-летний Кристофер Торрес из Далласа,
            ...
          </p>
          <p>
            В конце 2000-х годов Кристофер начал рисовать комиксы про
            приключения животного. Специально для их публикации он ...
          </p>
          <p>
            В один момент художник запустил прямую трансляцию, благодаря которой
            хотел спросить у своих друзей, что ему нарисовать. Однако на неё
            никто так и не пришёл. В итоге Торрес просто начал приду...
          </p>
        </div>
        <div className="container_img">
          <img
            src={"/static/nyancat775.png"}
            alt="картинка нян кота"
            title="нян кот"
          ></img>
        </div>
      </div>
    </div>
  )
}

export default App
