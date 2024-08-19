import logo from './logo.svg';
import './App.css';
import FileUploadComponent from './components/FileUpload/FileUploadComponent';
import Navbar from './components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { auth } from './service/firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);
  return (
    <div className="App bg-gradient-to-r from-emerald-200 to-emerald-400 h-full">
      <Navbar />
       
      <header className="App-header">
        {user &&
          <FileUploadComponent />
        }
      </header>
      
    </div>
  );
}

export default App;
