import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { GithubDataProvider } from "./context/GithubDataContext";

export function App() {
  return (
    <GithubDataProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </GithubDataProvider>
  );
}
