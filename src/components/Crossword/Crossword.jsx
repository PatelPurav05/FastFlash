import React, { useEffect, useState } from 'react';
import Crossword from '@jaredreisinger/react-crossword';
import { auth, db } from '../../service/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Box, Typography, List, ListItem, ListItemText, createTheme, ThemeProvider } from '@mui/material';
import clg from 'crossword-layout-generator';

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
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [isCrosswordCorrect, setIsCrosswordCorrect] = useState(false);

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
    
  const convertToCrosswordData = (layoutResult) => {
    const across = {};
    const down = {};

    layoutResult.forEach((item, index) => {
      const { clue, answer, startx, starty, orientation } = item;
      const number = index + 1;

      if (orientation === 'across') {
        across[number] = {
          clue,
          answer,
          row: starty - 1, // Adjusting for 0-based indexing in grid
          col: startx - 1, // Adjusting for 0-based indexing in grid
        };
      } else if (orientation === 'down') {
        down[number] = {
          clue,
          answer,
          row: starty - 1, // Adjusting for 0-based indexing in grid
          col: startx - 1, // Adjusting for 0-based indexing in grid
        };
      }
    });

    return { across, down };
  };

  useEffect(() => {
    if (flashcards.length > 0) {
      const input = flashcards.map(card => ({
        clue: card.definition,
        answer: card.word.toUpperCase(),
      }));

      const layout = clg.generateLayout(input);
      const crosswordData = convertToCrosswordData(layout.result);
      setData(crosswordData);
    }
  }, [flashcards]);

  const handleCorrect = (direction, number, answer) => {
    setCorrectAnswers((prev) => [...prev, { direction, number, answer }]);
    console.log(`Correct answer: ${answer} for clue ${number} (${direction})`);
  };

  const handleCrosswordCorrect = () => {
    setIsCrosswordCorrect(true);
    console.log("Crossword completed correctly!");
  };

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
            <Crossword data={data} theme={crosswordTheme} onCorrect={handleCorrect} onCrosswordCorrect={handleCrosswordCorrect} />
        )}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default CrosswordPuzzle;
