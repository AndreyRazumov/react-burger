import ProfileForm from '../components/profile/profileForm/profileForm';
import ProfileMenu from '../components/profile/profileMenu/profileMenu';
import styles from './page.module.css'

const ProfilePage = () => {
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