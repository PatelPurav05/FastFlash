import React, { useEffect, useState } from 'react'
import { auth } from '../service/firebase'
import FileUploadComponent from '../components/FileUpload/FileUploadComponent'


const Flashcards = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);
  return (
    <div>
    {user &&
        <FileUploadComponent />
      }
    </div>
  )
}

export default Flashcards