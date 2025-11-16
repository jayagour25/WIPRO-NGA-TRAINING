import React, { Suspense, useState } from "react";
import Home from "./pages/Home";
import PureDisplay from "./components/PureDisplay";
import ErrorBoundary from "./components/ErrorBoundary";
import ModalPortal from "./components/ModalPortal";

// Lazy load HeavyPage
const HeavyPage = React.lazy(() => import("./pages/HeavyPage"));

function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "lazy":
        return (
          <Suspense fallback={<p>Loading Heavy Page...</p>}>
            <HeavyPage />
          </Suspense>
        );
      case "pure":
        return <PureDisplay message="Rendered using PureComponent" />;
      case "error":
        return (
          <ErrorBoundary>
            <button onClick={() => { throw new Error("Test error!"); }}>
              Trigger Error
            </button>
          </ErrorBoundary>
        );
      case "portal":
        return <ModalPortal />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <h1>React Demo App</h1>
      <nav>
        <button onClick={() => setPage("lazy")}>Lazy Load</button>
        <button onClick={() => setPage("pure")}>Pure Component</button>
        <button onClick={() => setPage("error")}>Error Boundary</button>
        <button onClick={() => setPage("portal")}>Portal (Modal)</button>
      </nav>
      <hr />
      {renderPage()}
    </div>
  );
}

export default App;
