import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App.tsx'
import './app/layout/index.css'


import { Provider } from 'react-redux'
import { store } from "./app/redux/store"

const container = document.getElementById("root")

if (container) {
  const root = ReactDOM.createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}

