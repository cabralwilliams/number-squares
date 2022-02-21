import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './utils/globalStore';
import NumberBoard from './components/NumberBoard';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <NumberBoard />
            </Provider>
        </div>
    );
}

export default App;
