import styles from './layout.module.css';
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Outlet } from "react-router-dom";

export function LayoutFramework() {
    return (
        <div className={styles.layoutStyle}>
            <div className={styles.bgImgStyle}></div>
            <div className={styles.headerStyle}><Header /></div>
            <div className={styles.bodyStyle}><Outlet /></div>
            <div className={styles.footerStyle}><Footer /></div>


        </div>
    );
}
