import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WrappedDetails from "./Details";
import SearchParams from "./SearchParams";
import { Provider } from "react-redux";
import store from "../store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<WrappedDetails />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
