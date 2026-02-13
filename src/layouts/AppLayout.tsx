import { SidebarProvider } from '../context/SidebarContext';
import Sidebar from './Sidebar';
import TopbarWrapper from './TopbarWrapper';
import AppRoutes from '../routes/Route';
import styles from './AppLayout.module.css';

export default function AppLayout() {
    return (
        <SidebarProvider>
            <div className={styles.appLayout}>
                <TopbarWrapper />
                <div className={styles.sidebarAndContent}>
                    <Sidebar />
                    <main className={styles.mainContent}>
                        <AppRoutes />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
