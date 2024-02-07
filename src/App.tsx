import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Applications from "./Applications";
import Header from "./Header";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <Header />
      <Applications />
    </div>
    </QueryClientProvider>
  );
}

export default App;
