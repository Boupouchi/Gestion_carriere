import React from 'react'
import Logout from '../auth/Logout'
import Sidebar from '../Sidebar'
import Profil from './Profil'
import Cours from './Cours'
import Filiere from './Filiere'
import { useParams } from 'react-router-dom'
import Student from './Student'
import Carriere from './Carriere'

const ProfHome = () => {
  const { componentName } = useParams();

  const renderComponent = () => {
    switch (componentName) {
    
    
            case 'cours':
              return (
                <div className='w-4/5'>
                  
                  <Cours />
                  <Sidebar />
                 
                </div>);
                 case 'carrieres':
                  return (
                    <div className='w-4/5'>
                      <Carriere />
                      <Sidebar />
                     
                    </div>);
                
     case 'filieres':
      return (
        <div className='w-4/5'>
          <Filiere />
          <Sidebar />
        
        </div>);
case 'profil':
        return (<div className='w-4/5'>
          <Profil />
          <Sidebar />
        
        </div>);
     
      case 'student':
        return (
          <div className='w-4/5'>
            <Student />
            <Sidebar />
           
          </div>);
   
      case 'stats':
        return (
          <div className='w-4/5'>
            <Statistiques />
            <Sidebar />
          
          </div>);
      default:
        window.location = '/we';
    }
  };
  return (
    <div className='bg-gray-300 ml-64 flex flex-col items-center  min-h-screen font-[Poppins]'>

      {renderComponent()}

    </div>
  )
}

export default ProfHome
