import { Row } from 'react-bootstrap';
import './style.scss'

type Props = {
  iconPath: string
  label: string
}

function BenefitsCard({ iconPath, label }: Props) {
  return (
    <Row className='align-items-center d-flex w-auto benefits-card'>
      <img className='icon-image' src={iconPath} alt="icone de benefícios" />
      <p className='summary mb-0'>{label}</p>
    </Row>
  );
}

export default BenefitsCard
