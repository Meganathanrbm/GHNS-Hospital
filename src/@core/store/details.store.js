
import { atom } from 'recoil';

const currentUserState = atom({
  key: 'currentUserState',
  default: {
    isLoggedIn: false,
    staffId: null,
    name: '',
    email: '',
    username: '',
    institutionId: null,
    role: '',
    designation: '',
    departmentId: null,
  },
});

export { currentUserState }; 
