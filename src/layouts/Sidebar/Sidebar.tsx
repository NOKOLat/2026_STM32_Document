import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import { Logout } from '../../api/authApi';
import SidebarProgress from './SidebarProgress';
import SidebarNav from './SidebarNav';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = () => {
    Logout();
    navigate('/');
  };

  const handleMyPageClick = () => {
    navigate('/mypage');
  };

  const handleSectionClick = (sectionNumber: number) => {
    navigate('/mainpage');
    setTimeout(() => {
      const element = document.getElementById('section' + sectionNumber);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sidebarClassName = `${styles.sidebar} ${isOpen ? styles.open : styles.closed}`;

  return (
    <aside className={sidebarClassName}>
      <button
        className={styles.toggleButton}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        title="メニューを開く/閉じる"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={styles.nav}>
        <SidebarProgress isOpen={isOpen} />
        <SidebarNav
          isOpen={isOpen}
          onSectionClick={handleSectionClick}
          onScrollToTop={handleScrollToTop}
          onMyPageClick={handleMyPageClick}
          onLogout={handleLogout}
        />
      </nav>
    </aside>
  );
}
