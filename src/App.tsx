import { Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function Layout() {
  return (
    <Flex direction="column" minHeight="100dvh" width="100vw">
      <Header />
      <Flex
        flex="1" // Flex grow to take available space
        width={{ base: "full", md: "auto" }} // Full width on small screens, auto on medium screens and up>
      >
        <Sidebar />
        <Body />
      </Flex>
      <Footer />
    </Flex>
  );
}

function App() {
  return (
    <ChakraProvider>
      <Layout />
    </ChakraProvider>
  );
}

export default App;
