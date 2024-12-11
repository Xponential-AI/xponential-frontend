import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  variant: 'primary' | 'secondary' | 'utility'
}

export const Button = ({ text, variant, disabled, ...props }: ButtonProps) => {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement> ) => {
    console.log('Button was pressed')
    
    props.onClick ? props.onClick(e) : null;
  }

  return <button 
    {...props}
    disabled={disabled}
    className={`button ${variant}`}
    onClick={onButtonClick}>{text}
  </button>
}