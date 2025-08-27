import { Box } from "@mui/material";
import QuotesApp from "./Pages/Quotes"; 


function App() {
  return (
    <Box
      sx={{
       
        background: 'linear-gradient(45deg, #FFDAB9 30%, #FFB6C1 90%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        padding: '2rem',
        fontFamily: 'Roboto, sans-serif'
      }}
    >
      <QuotesApp />
    </Box>
  );
}

export default App;