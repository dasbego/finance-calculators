import { Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { ChakraProvider, Box } from "@chakra-ui/react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./App.css";
import CompoundInterestCalculator from "./components/CompounInterestCalculator";
import MyPortfolio from "./pages/MyPortfolio";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Layout({ children }) {
  return (
    <Flex direction="column" minHeight="100dvh" width="100vw">
      <Header />
      <Flex
        flex="1" // Flex grow to take available space
        width={{ base: "full", md: "auto" }} // Full width on small screens, auto on medium screens and up>
      >
        <Sidebar />
        <Box
          as="main"
          flex="1" // Flex grow to take available space
          flexDir="column"
          p={{ base: "2", md: "4" }} // Padding: 2 on base (small screens), 4 on medium screens and up
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
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <ChakraProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<CompoundInterestCalculator />} />
          <Route path="/myportfolio" element={<MyPortfolio />} />
        </Routes>
      </Layout>
    </ChakraProvider>
  );
}
