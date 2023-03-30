import styles from './Input.module.css'

function Input({type, text, name, placeholder, onChange, max, min, value, required, disabled, step}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
                type={type} 
                name={name}
                placeholder={placeholder} 
                onChange={onChange}
                max={max}
                min={min}
                value={value}
                required={required}
                disabled={disabled}
                step={step}
            />
        </div>
    )
}

export default Input