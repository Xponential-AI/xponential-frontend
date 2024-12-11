import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  variant?: 'primary' | 'secondary' | 'utility',
  marginTop?: number
}

export const Button = ({ text, variant, marginTop, disabled, ...props }: ButtonProps) => {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement> ) => {
    console.log('Button was pressed')
    
    props.onClick ? props.onClick(e) : null;
  }

  return <button 
    {...props}
    disabled={disabled}
    style={{
      marginTop: marginTop || 0
    }}
    className={`button ${variant}`}
    onClick={onButtonClick}>{text}
  </button>
}