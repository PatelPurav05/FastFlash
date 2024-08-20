import React, { useState, useEffect } from 'react';
import { auth, db } from '../../service/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Tile from '../FileUpload/Tile';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const FlashcardSets = () => {
  const [sets, setSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchSets = async () => {
        const setsCollectionRef = collection(db, 'users', user.uid, 'flashcards');
        const setsSnapshot = await getDocs(setsCollectionRef);
        const setsList = setsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSets(setsList);
      };

      fetchSets();
    }
  }, [user]);

  const handleSetClick = (setId) => {
    const selected = sets.find(set => set.id === setId);
    setSelectedSet(selected);
    setFlashcards(selected.cards || []); // Assuming flashcards are stored under 'cards'
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ 
          fontFamily: 'Roboto, sans-serif', 
          fontWeight: 700, 
          color: '#3f51b5', 
          textAlign: 'center',
        }}
      >
        Your Flashcard Sets
      </Typography>
      <List 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 2 
        }}
      >
        {sets.map((set) => (
          <ListItem 
            key={set.id} 
            button 
            onClick={() => handleSetClick(set.id)}
            sx={{
              width: '70%', // Smaller width
              maxWidth: '400px', // Set a maximum width
              margin: '0 auto', // Center the tile horizontally
              borderRadius: '8px',
              backgroundColor: 'background.paper',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              padding: 2,
              transition: 'transform 0.2s, box-shadow 0.2s',
              textAlign: 'center', // Center the text
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ListItemText 
              primary={set.name} 
              primaryTypographyProps={{
                fontSize: '1rem', // Smaller font size
                fontWeight: 500,
                color: '#333',
                fontFamily: 'Roboto, sans-serif',
                letterSpacing: '0.5px',
              }}
            />
          </ListItem>
        ))}
      </List>

      {selectedSet && (
        <div>
          <Typography 
            variant="h5" 
            component="h3" 
            sx={{ 
              mt: 4, 
              fontFamily: 'Roboto, sans-serif', 
              fontWeight: 600, 
              color: '#2c387e',
              textAlign: 'center',
            }}
          >
            {selectedSet.name}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
              gap: 4,
              mt: 4,
            }}
          >
            {flashcards.map((card, index) => (
              <Tile key={index} word={card.word} definition={card.definition} />
            ))}
          </Box>
        </div>
      )}
    </div>
  );
};

export default FlashcardSets;
