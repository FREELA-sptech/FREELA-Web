import './style.scss'

type Props = {
  iconPath: string
  label: string
}

function BenefitsCard({iconPath, label}: Props) {
  return (
    <div className="benefits-card flex-row align-center">
      <img src={iconPath} alt="icone" />
      <p className='summary'>{label}</p>
    </div>
  );
}

export default BenefitsCard
