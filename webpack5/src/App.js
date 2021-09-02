import Route from './router'
import { ErrorBoundary } from 'zzy-javascript-devtools'
function App() {
  return (
    <>
      <ErrorBoundary>
        <Route />
      </ErrorBoundary>
    </>
  );
}
export default App;
