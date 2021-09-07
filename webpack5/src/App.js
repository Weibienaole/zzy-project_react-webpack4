import Route from './router'
import { ErrorBoundary } from 'zzy-javascript-devtools'
function App() {
  return (
    <>
      <ErrorBoundary mode={process.env.NODE_ENV}>
        <Route />
      </ErrorBoundary>
    </>
  );
}
export default App;
