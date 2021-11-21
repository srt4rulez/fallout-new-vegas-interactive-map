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
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
    <React.StrictMode>
        <Provider
            store={store}
        >
            <PersistGate
                persistor={persistor}
            >
                <ChakraProvider
                    theme={theme}
                >
                    <App />
                </ChakraProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
