import * as React from 'react';
import ReactDOM from 'react-dom/client';
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
import { createStandaloneToast } from '@chakra-ui/toast';

const { ToastContainer } = createStandaloneToast();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
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
                    <ToastContainer />
                </ChakraProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
