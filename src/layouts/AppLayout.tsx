import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider } from '../context/SidebarContext';
import Sidebar from './Sidebar';
import TopbarWrapper from './TopbarWrapper';
import AppRoutes from '../routes/Route';
import styles from './AppLayout.module.css';

export default function AppLayout() {
    const mainContentRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // 認証ページではTopbar/Sidebarを表示しない
    const isAuthPage = location.pathname === '/' || location.pathname === '/register';

    if (isAuthPage) {
        return <AppRoutes />;
    }

    return (
        <SidebarProvider>
            <div className={styles.appLayout}>
                <TopbarWrapper />
                <div className={styles.sidebarAndContent}>
                    <Sidebar />
                    <main className={styles.mainContent} ref={mainContentRef}>
                        <AppRoutes />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
