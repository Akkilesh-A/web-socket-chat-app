import SimpleBroadcast from "./components/SimpleBroadcast";
import "@ant-design/v5-patch-for-react-19";

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-600 to-cyan-600">
      <SimpleBroadcast />
    </div>
  );
};

export default App;
