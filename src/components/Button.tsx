import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  size: 's' | 'm' | 'l',
}

export const Button = ({ text, size, ...props }: ButtonProps) => {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement> ) => {
    console.log('Button was pressed')
    
    props.onClick ? props.onClick(e) : null;
  }

  return <button 
    {...props}
    className={`button ${size}`}
    onClick={onButtonClick}>{text}
  </button>
}