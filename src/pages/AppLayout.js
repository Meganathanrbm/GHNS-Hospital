// pages/AppLayout.js
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'src/@core/store/details.store';
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import {  SettingsConsumer,SettingsProvider } from 'src/@core/context/settingsContext'
import LoginPage from 'src/pages/pages/login' // Import LoginPage component

const AppLayout = ({ children }) => {
  // Get the authentication state from Recoil
  const currentUser = useRecoilValue(currentUserState);
 

  // Render UserLayout if user is logged in, otherwise render LoginPage
  return currentUser.isLoggedIn ? (
    <SettingsProvider>
    <SettingsConsumer>
      {({ settings }) => (
        <ThemeComponent settings={settings}>
          <UserLayout>{children}</UserLayout>
        </ThemeComponent>
      )}
    </SettingsConsumer>
  </SettingsProvider>
  ) : (
    <SettingsProvider>
    <SettingsConsumer>
      {({ settings }) => (
        <ThemeComponent settings={settings}>
          <LoginPage />
        </ThemeComponent>
      )}
    </SettingsConsumer>
  </SettingsProvider>
   
  );
}

export default AppLayout;
