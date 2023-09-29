import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Character from './components/Character';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
});


const theme = createTheme({
    typography: {
        h1: {
            fontSize: '1.4rem',
        },
        h2: {
            fontSize: '1.3rem',
        },
        h3: {
            fontSize: '1rem',
        },
        h4: {
            fontSize: '.7rem',
        },
        h5: {
            fontSize: '.6rem',
        },
        h6: {
            fontSize: '.5rem',
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 'lighter'
        },

        body1: {
            fontSize: '1rem',
            fontWeight: 500,
        },
    },

});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>

            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<App />} />
                    <Route path='/Character/:id' element={<Character />} />
                </Routes>
            </BrowserRouter>


        </ThemeProvider>
    </ApolloProvider>

);