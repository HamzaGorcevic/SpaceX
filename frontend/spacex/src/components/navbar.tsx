import styles from "../styles/navbar.module.scss";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className={styles.nav}>
        <ul>
          <li><Link className={styles.link} to="/">Home</Link></li>
          <li><Link className={styles.link} to="/saved">Saved Launches</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
