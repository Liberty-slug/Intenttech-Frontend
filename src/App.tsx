import { BrowserRouter } from "react-router-dom";
import RouteComponents from "./RouteComponents";

function App() {
  return (
    <>
      <BrowserRouter>
        <RouteComponents />
      </BrowserRouter>
    </>
  );
}

export default App;
