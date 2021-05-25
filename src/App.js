import Route from './router'
import { ReactComponents } from 'zzy-javascript-devtools'
function App() {
  return (
    <>
      <ReactComponents.ErrorBoundary>
        <Route />
      </ReactComponents.ErrorBoundary>
    </>
  );
}
export default App;
