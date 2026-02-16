import React from 'react';
import Navigation from '../../components/header/Navigation';
import HeroSection from '../../components/header/HeroSection';

const Header = () => {
    return (
        <div className="relative">
            <Navigation />
            <HeroSection />
        </div>
    );
};

export default Header;