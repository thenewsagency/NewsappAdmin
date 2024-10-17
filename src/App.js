import React from 'react';
import MainRoute from './Component/MainRoute';
import { AuthProvider } from './Component/AuthContext';


function App() {
  return (
    <>     
    <AuthProvider>
      <MainRoute />
    </AuthProvider>

    </>
  );
}


export default App;
