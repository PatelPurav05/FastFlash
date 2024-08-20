import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import { Button, Box, Modal, Typography, styled, NativeSelect, TextField } from '@mui/material';

import { quantum } from 'ldrs'
import { auth, db } from '../../service/firebase';
import { addDoc, collection } from 'firebase/firestore';
quantum.register()

function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [vocab, setVocab] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [vocabCount, setVocabCount] = useState(10);
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);


  const VisuallyHiddenInput = styled('input')({
    display: 'none',
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/get_gemini_response/${vocabCount}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setVocab(data);
      console.log(data);

      // const name = prompt("Enter a name for this set of flashcards:");

      if (name) {
        // Create a new document in the flashcards collection under the user's document
        const flashcardsCollectionRef = collection(db, 'users', user.uid, 'flashcards');
        await addDoc(flashcardsCollectionRef, {
          name: name,
          cards: data, // Save the flashcards data under 'cards'
          createdAt: new Date(),
        });
        console.log('Flashcards set saved successfully');
      } else {
        console.log('Set name was not provided. Flashcards not saved.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setVocab([]);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleOpen = () => {setOpen(true); setFile(null)};
  const handleClose = () => setOpen(false);

  return (
    <div>
      {!loading &&
        <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#31416b', color: 'white' }}>
          Upload File
        </Button>
      }
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Generate Vocab
          </Typography>
          <form onSubmit={(e) => {handleSubmit(e); handleClose();}}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
            }}
          >
            <TextField 
              id="outlined-basic" 
              label="Name" 
              variant="outlined" 
              size="small" 
              sx={{ mb: 4 }} 
              onChange={(event) => setName(event.target.value)} 
            />
          </Box>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 , backgroundColor: "#10b981"}}
            >
              Choose File
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
              />
            </Button>
            <NativeSelect
              value={vocabCount}
              onChange={(event) => setVocabCount(event.target.value)}
              inputProps={{
                name: 'vocab-count',
                id: 'vocab-count-native',
              }}
              sx={{ my: 2, mb: 4, width: '100%' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </NativeSelect>
            {file && 
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!file}
                sx={{backgroundColor: '#10b981'}}
              >
                Submit
              </Button>
            } 
          </form>
        </Box>
      </Modal>

      {loading && <div role="status">
          <l-quantum
            size="45"
            speed="1.75" 
            color="black" 
          ></l-quantum>
          <span class="sr-only">Loading...</span>
      </div>}

      {vocab && !loading && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
            gap: 4,
            mt: 4,
          }}
        >
          {vocab.map((item, index) => (
            <Tile key={index} word={item.word} definition={item.definition} />
          ))}
        </Box>
      )}
    </div>
  );
}

export default FileUploadComponent;
