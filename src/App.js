import logo from './logo.svg';
import './App.css';
import FileUploadComponent from './components/FileUpload/FileUploadComponent';
import Navbar, { StickyNavbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App bg-gradient-to-r from-blue-400 to-purple-400 h-screen">
      <Navbar />
      <header className="App-header">
        
        <FileUploadComponent />
      </header>
    </div>
  );
}

export default App;
