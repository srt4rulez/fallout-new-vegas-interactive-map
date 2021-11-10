import * as React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet-defaulticon-compatibility';
import './index.scss';
import App from 'Components/App/App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import '@fontsource/roboto';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider
                theme={theme}
            >
                <App />
            </ChakraProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
