import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);

const App = () => 'Word Game';
root.render(<App />);
