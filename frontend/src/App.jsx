import Routing from "./routes/Routing";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Routing />
      </Provider>
    </CookiesProvider>
  );
}

export default App;
