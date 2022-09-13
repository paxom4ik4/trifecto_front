import './header.scss';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';

import registerIcon from '../../assets/icons/registration.png';
import loginIcon from '../../assets/icons/login.png';

const DEFAULT_CLASSNAME = 'header';

const MENU_ITEMS = [{title: 'О Компании', link: '/about'}, {title: "Продукты", link: "/products"}, {title: 'Контакты', link: '/contacts'}];

export const Header = ({ setIsRegisterMode }) => {
    const navigate = useNavigate();

    const pathExclude = ['/login', '/app'];
    const showHeader = pathExclude.includes(window.location.pathname);

    const handleRegister = () => {
        setIsRegisterMode(true);
        navigate("/login")
    }

    const handleLogin = () => {
        setIsRegisterMode(false);
        navigate("/login");
    }

    return (!showHeader && <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
        <div className={DEFAULT_CLASSNAME}>
            <div className={`${DEFAULT_CLASSNAME}_logo-menu`}>
                <Link to={'/'}><div className={`${DEFAULT_CLASSNAME}_logo`}><img src={logo} alt={'logo'}/></div></Link>
                <div className={`${DEFAULT_CLASSNAME}_menu`}>
                    {MENU_ITEMS.map(item => <Link to={item.link} className={`${DEFAULT_CLASSNAME}_menu-item`}>{item.title}</Link>)}
                </div>
            </div>
            <div className={`${DEFAULT_CLASSNAME}_controls`}>
                <button onClick={() => handleRegister()} className={'header-register-btn'}><img src={registerIcon} alt={'register icon'}/><span>Регистрация</span></button>
                <button onClick={() => handleLogin()} className={'header-login-btn'}><img src={loginIcon} alt={'login icon'}/><span>Войти</span></button>
            </div>
        </div>
    </div>)
}