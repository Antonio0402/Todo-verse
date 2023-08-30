import {Suspense} from 'react';
import Home from './page/Home';

function App() {
  return (
    <main className="app | bg-white rounded-xl shadow-xl">
      <Suspense fallback={<p>Loading...</p>}>
        <Home />
      </Suspense>
    </main>
  );
}

export default App;
