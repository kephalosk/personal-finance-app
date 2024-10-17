import './App.scss';
import { Sidebar } from './Components/Sidebar';
import { OverviewPage } from './Pages/OverviewPage';

function App() {
  return (
    <>
      <div className="webapp">
        <Sidebar />
        <section className="content">
          <OverviewPage />
        </section>
      </div>
    </>
  );
}

export default App;
