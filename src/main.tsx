import Routers from "@/app/layouts/Routers";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@/styles/index.css"
import { store } from "@/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ReactDOM.createRoot(document.querySelector('body')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routers />
      </LocalizationProvider>
    </BrowserRouter>
  </Provider>
)

