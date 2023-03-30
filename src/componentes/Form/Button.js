import styles from './Button.module.css'

function Button({text}){
    return(
        <div>
            <button className={styles.btn} type="submit">{text}</button>
        </div>
    )
}

export default Button