import './style.scss'

type Props = {
  onClick: () => void
  buttonType: string
  label: string
}

function ButtonBase({onClick, buttonType, label}: Props) {
  return (
    <button onClick={onClick} className={`button-base ${buttonType}`}>
      {label}
    </button>
  );
}
export default ButtonBase;

