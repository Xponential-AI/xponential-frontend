import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  variant?: 'primary' | 'secondary' | 'utility',
  marginTop?: number,
  fullwidth?: boolean,
  minWidth?: number,
  width?: number,
}

export const Button = ({ text, variant, fullwidth, marginTop, minWidth, disabled, width, ...props }: ButtonProps) => {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement> ) => {
    console.log('Button was pressed')
    
    props.onClick ? props.onClick(e) : null;
  }

  const styles: Record<string, string | number> = {
    marginTop: marginTop || 0,
  }

  width ? styles.width = width : '';
  fullwidth ? styles.width = '100%' : '';
  minWidth ? styles.minWidth = minWidth : '';

  return <button 
    {...props}
    disabled={disabled}
    style={styles}
    className={`button ${variant}`}
    onClick={onButtonClick}>{text}
  </button>
}