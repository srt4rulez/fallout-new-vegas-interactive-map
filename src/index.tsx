import * as React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet-defaulticon-compatibility';
import './index.scss';
import App from 'Components/App/App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import '@fontsource/roboto';
import '@fontsource/roboto/700.css';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider
            theme={theme}
        >
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
