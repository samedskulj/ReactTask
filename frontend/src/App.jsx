import Routing from "./routes/Routing";
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
}

export default App;
