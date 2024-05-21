
import { atom } from 'recoil';

const currentUserState = atom({
  key: 'currentUserState',
  default: {
    isLoggedIn:true,
    hospital_id: '',
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
