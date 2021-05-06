import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className='App'>
      <TodoList />
    </div>
  );
}

// TODO #2: Delete the other export and use the withAuthenticator instead.
// Everything inside withAuthenticator will be behind a sign-in wall.
// export default withAuthenticator(App);
export default App;
