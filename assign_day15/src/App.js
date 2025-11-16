import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const styles = {
    background: theme === "light" ? "#fff" : "#222",
    color: theme === "light" ? "#000" : "#fff",
    height: "100vh",
    padding: "20px",
  };

  return (
    <div style={styles}>
      <h1>Theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default App;
