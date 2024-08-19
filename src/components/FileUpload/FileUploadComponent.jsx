import React, { useState } from 'react';
import Tile from './Tile';
import { Button, Box, Modal, Typography, styled, NativeSelect } from '@mui/material';

function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [vocab, setVocab] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [vocabCount, setVocabCount] = useState(10);

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
    } catch (error) {
      console.error('Error uploading file:', error);
      setVocab([]);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#31416b', color: 'white' }}>
        Upload File
      </Button>
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
            Upload a File
          </Typography>
          <form onSubmit={(e) => {handleSubmit(e); handleClose();}}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 , backgroundColor: "#31416b"}}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!file}
              sx={{backgroundColor: '#31416b'}}
            >
              Upload
            </Button>
          </form>
        </Box>
      </Modal>

      {loading && <div role="status">
          <svg aria-hidden="true" class="inline w-64 h-64 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
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
