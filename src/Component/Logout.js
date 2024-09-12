import React from 'react'
import { useAuth } from './AuthContext';

function Logout() {

    const { logout } = useAuth(); // Use AuthContext
  


  return (
    <div>
      {
       
         logout()
        
      
      }
    </div>
  )
}

export default Logout
