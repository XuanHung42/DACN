import { Provider } from "react-redux";
import Routers from "./routers/Routers";
import store from "./redux/Store"

function App() {
  return (
    <Provider store={store}>
      <Routers/>
    </Provider>
  );
}

export default App;

// test push code 