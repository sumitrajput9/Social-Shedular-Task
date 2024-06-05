import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Component/Dashboard';
import { FbPost } from './Component/FbPost';
import { TwitterPost } from './Component/TwitterPost';
import { SocialMediaApp } from './Component/SocialMediaPoster';

function App() {
  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/fb-post' element={<FbPost />} />
          <Route path='/twitter-post' element={<TwitterPost />} />
          <Route path='/all-post' element={<SocialMediaApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
