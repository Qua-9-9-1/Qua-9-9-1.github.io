import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function RootLayout() {
  return (
    <div>
      <Navbar />

      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
      
      <footer>
      </footer>
    </div>
  );
}