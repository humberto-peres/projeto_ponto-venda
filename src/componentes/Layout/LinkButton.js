import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'


function LinkButton({type, to, text, onClick}) {
    return(
        <Link className={styles[type]} to={to}>
            {text}
        </Link>
    )
}

export default LinkButton