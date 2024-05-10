import './App.css';
import TaskManager from './Components/TaskManager';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <TaskManager />
      <ToastContainer />
    </div>
  );
}

export default App;
