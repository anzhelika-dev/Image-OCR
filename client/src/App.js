import './App.css';
import FileUpload from './components/FileUpload/FileUpload';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  return (
    <>
    <header>
      <Header />
    </header>
    <main>
      <div className='container'>
        <FileUpload />
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
    </>
  );
}

export default App;
