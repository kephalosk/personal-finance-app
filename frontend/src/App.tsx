import './App.scss';
import { Sidebar } from './components/sidebar/Sidebar';
import { OverviewPage } from './pages/OverviewPage';

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
