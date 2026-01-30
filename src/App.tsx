import { useState } from 'react';
import ConversationOne from './pages/ConversationOne';
import ConversationTwo from './pages/ConversationTwo';
import PresentationDemo from './pages/PresentationDemo';

function App() {
  const [currentPage, setCurrentPage] = useState<'conv1' | 'conv2' | 'presentation'>('presentation');

  return (
    <>
      {/* Hidden Navigation for Demo Purposes */}
      <div className="fixed top-0 right-0 z-50 p-2 opacity-0 hover:opacity-100 transition-opacity bg-black/50 text-white rounded-bl-lg">
        <button onClick={() => setCurrentPage('conv1')} className="mr-2 underline">Conv 1</button>
        <button onClick={() => setCurrentPage('conv2')} className="mr-2 underline">Conv 2</button>
        <button onClick={() => setCurrentPage('presentation')} className="underline">Slides</button>
      </div>

      {currentPage === 'conv1' && <ConversationOne />}
      {currentPage === 'conv2' && <ConversationTwo />}
      {currentPage === 'presentation' && <PresentationDemo />}
    </>
  );
}

export default App;
