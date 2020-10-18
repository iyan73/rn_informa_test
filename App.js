import React from 'react';



import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';
import Router from './screens/Router';
const store = createStore(reducer);

// function App() {
//   return (
//     <View style={styles.container}>
//     </View>
//   );
// }

export default () => {
  return (
    <Provider store={store}>
      {/* <NavigationContainer>
        <App />
      </NavigationContainer> */}
      <Router />
    </Provider>
  )
}