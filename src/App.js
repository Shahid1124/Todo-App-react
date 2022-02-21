// import logo from './logo.svg';
// import './App.css';
import Todo from './components/Todo';
import './Styles/Main.scss';

function App() {
  return (
    <div className="App">
      <div className="todoContainer">
        <div className="todoWrapper">
          <Todo />
        </div>
      </div>
    </div>
  );
}

export default App;
