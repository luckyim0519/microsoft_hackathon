import ReactDOM from "react-dom/client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Form from "./pages/Form.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/">
            <Form />
          </Route>
      </Switch>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);