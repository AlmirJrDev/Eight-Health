import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  

  if (['/welcome', '/onboarding'].includes(location.pathname)) {
    return null;
  }
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-600">
            Dashboard
          </Link>
          <Link to="/water" className="text-gray-500 hover:text-gray-600">
            Água
          </Link>
          <Link to="/habits" className="text-gray-500 hover:text-gray-600">
            Hábitos
          </Link>
        </div>
        <div className="mt-4 md:mt-0 md:order-1">
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} Eight Health. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;