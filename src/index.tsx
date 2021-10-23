import * as React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet-defaulticon-compatibility';
import './index.scss';
import App from 'Components/App/App';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
