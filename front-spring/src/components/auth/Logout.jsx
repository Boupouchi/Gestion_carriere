import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("userlogin");
    window.location = "/";
  };

  return (
    <div className='bottom-4 left-8 z-[70] fixed'>
      <button
        type="button"
        onClick={handleLogout}
        className="py-4 px-8 inline-flex items-center gap-x-3 text-sm font-semibold rounded-full border border-transparent bg-transparent text-red-500 hover:bg-transparent disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 m-9"
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span className="ml-2">Log out</span>
      </button>
    </div>
  );
};

export default Logout;
