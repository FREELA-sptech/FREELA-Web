import './style.scss'

function Header() {
  return (
    <header className="header-background">
      <div className="container flex-row justify-space-between">
        <h1 className="logo">FREELA</h1>
        <li className='menu flex-row align-center'>
          <ul className='subtitle'>Login</ul>
        </li>
      </div>
    </header>
  );
}
export default Header;
