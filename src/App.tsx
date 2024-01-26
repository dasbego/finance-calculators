import { Flex, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CompoundInterestCalculator from "./components/CompounInterestCalculator";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MyPortfolio from "./pages/MyPortfolio";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" minHeight="100vh" width="100vw">
      <Header />
      <Flex
        flex="1" // Flex grow to take available space
        width={{ base: "full", md: "auto" }} // Full width on small screens, auto on medium screens and up
      >
        <Sidebar />
        <Box
          as="main"
          flex="1" // Flex grow to take available space
          flexDir="column"
          width={{ base: "full", md: "auto" }} // Full width on small screens, auto on medium screens and up
        >
          {children}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CompoundInterestCalculator />} />
          <Route path="/myportfolio" element={<MyPortfolio />} />
        </Routes>
      </Layout>
    </Router>
  );
}
