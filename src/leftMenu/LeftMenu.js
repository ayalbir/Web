import './LeftMenu.css';
function LeftMenu({ menuItems}) {
  if (!menuItems) {
    return null; // or return a default component
  }
  return (
    <div className='col-2 bg-dark text-white'>
      <ul className='nav flex-column'>
        {menuItems.map((item) => (
          <li key={item.id} className='nav-item'>
            <a className='nav-link' href={item.link}>
              <i className={`bi bi-${item.icon}`}></i>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeftMenu;