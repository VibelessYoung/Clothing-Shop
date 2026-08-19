import Header from "./components/Header/Header";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
