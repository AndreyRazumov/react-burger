import ProfileForm from '../components/profile/profileForm/profileForm';
import ProfileMenu from '../components/profile/profileMenu/profileMenu';
import styles from './page.module.css'
import { FC } from "react";

const ProfilePage: FC = () => {
  return (
    <div className='page'>
      <main className={styles.main}>
        <ProfileMenu />
        <ProfileForm />
      </main>
    </div>
  );
};

export default ProfilePage