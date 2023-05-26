import { Provider } from "react-redux";
import Routers from "./routers/Routers";
import store from "./redux/Store"
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <Routers/>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;

// test push code 