import './App.scss';
import { Sidebar } from './Components/Sidebar';

function App() {
  return (
    <>
      <div className="webapp">
        <Sidebar />
        <section className="content"></section>
      </div>
    </>
  );
}

export default App;
