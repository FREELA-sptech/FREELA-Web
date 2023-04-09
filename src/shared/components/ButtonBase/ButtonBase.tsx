import './style.scss'

type Props = {
  onClick: () => void
  buttonType: string
  label: string
  className?: string
}

function ButtonBase({onClick, buttonType, label, className}: Props) {
  return (
    <button onClick={onClick} className={`button-base ${buttonType} ${className}`}>
      {label}
    </button>
  );
}
export default ButtonBase;

