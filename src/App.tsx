import './App.css';
import ImageSlider from './components/ImageSlider/ImageSlider.tsx';

function App() {
  return (
    // Image slider component
    <ImageSlider url='https://picsum.photos/v2/list' page='1' limit='10' />
  );
}

export default App;
