import LazyExample from "./pages/LazyExample";
import StatsDashboard from "./pages/StatsDashboard";
import ProductSection from "./pages/ProductSection";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  return (
    <div>
      <LazyExample />
      <hr />
      <StatsDashboard />
      <hr />
      <ProductSection />
      <hr />
      <NotificationsPage />
    </div>
  );
}

export default App;
