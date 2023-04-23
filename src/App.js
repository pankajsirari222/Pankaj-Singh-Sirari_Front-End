import logo from './logo.svg';
import './App.css';
import List from './List';

const input = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3' },
  { text: 'Item 4' },
  { text: 'Item 5' },
];

function App() {
  return (
    <div className="App">
      <List items = {input}/>
    </div>
  );
}

export default App;
