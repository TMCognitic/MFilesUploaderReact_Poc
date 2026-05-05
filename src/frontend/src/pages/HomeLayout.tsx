import { Outlet } from 'react-router-dom';
import { Header, NavBar, Footer, Band } from '../components';

export const HomeLayout = () => {
  return (
    <>
        <Header />           
        <Band />           
        <NavBar />
        <Outlet />
        <Footer />
    </>
  );
};