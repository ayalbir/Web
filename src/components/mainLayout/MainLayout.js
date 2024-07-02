import React from 'react';
import LeftMenu from '../leftMenu/LeftMenu';
import SearchSignInContainer from '../searchSignInContainer/SearchSignInContainer';

const MainLayout = ({ children, isDarkMode, toggleDarkMode, user, handleSignOut, expanded, setExpanded }) => {
  return (
    <>
      <LeftMenu expanded={expanded} setExpanded={setExpanded} />
      <div className={`col main-content ${expanded ? '' : 'collapsed'}`}>
        <SearchSignInContainer
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          user={user}
          handleSignOut={handleSignOut}
        />
        {children}
      </div>
    </>
  );
};

export default MainLayout;
