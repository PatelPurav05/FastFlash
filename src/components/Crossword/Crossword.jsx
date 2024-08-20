import React, { useEffect, useState } from 'react';
import Crossword from '@jaredreisinger/react-crossword';
import { auth, db } from '../../service/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Box, Typography, List, ListItem, ListItemText, createTheme, ThemeProvider } from '@mui/material';

const crosswordTheme = {
  highlightBackground: 'rgb(156, 163, 175)' // Light yellow for highlighted cells
};

const theme = createTheme({
    typography: {
      fontFamily: 'Lexend'
    }
  })

const CrosswordPuzzle = () => {
  const [data, setData] = useState(null); // Start with null to better handle conditional rendering
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
    
  function generateCrosswordData(vocabulary) {
    if (!vocabulary || vocabulary.length === 0) return null;

    const gridSize = 13; // Define the grid size (e.g., 13x13)
    const across = {};
    const down = {};
    let currentNumber = 1;

    vocabulary.forEach((item, index) => {
      const direction = index % 2 === 0 ? 'across' : 'down';
      const entry = {
        clue: item.definition,
        answer: item.word.toUpperCase(),
        row: index, // Simplified positioning logic
        col: 0, // Start at the first column or row
      };

      if (direction === 'across') {
        across[currentNumber] = entry;
      } else {
        down[currentNumber] = entry;
      }

      currentNumber += 1;
    });

    return {
      across,
      down,
    };
  }

  useEffect(() => {
    if (flashcards.length > 0) {
      const crosswordData = generateCrosswordData(flashcards);
      if (crosswordData) {
        setData(crosswordData);
        console.log("Generated Crossword Data:", crosswordData); // Log the data for debugging
      } else {
        setData(null); // Ensure data is null if no crossword data was generated
      }
    }
  }, [flashcards]);

  return (
    <div style={{ margin: '20px' }}>
      <div style={{ padding: '20px' }}>
      <ThemeProvider theme={theme}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Lexend', 
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
                  fontFamily: 'Lexend',
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
                fontSize: 100,
                fontFamily: 'Lexend', 
                fontWeight: 600, 
                color: '#f7fee7',
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
              
              
            </Box>
          </div>
        )}

        {data && data.across && data.down && (
            <Crossword data={data} theme={crosswordTheme} />
        )}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default CrosswordPuzzle;
