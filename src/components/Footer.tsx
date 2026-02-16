"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";
import { useHomepageData } from '@/hooks/useHomepageData';

const Footer = () => {
    const { data } = useHomepageData();
    const footerData = data?.footer;

    // Use API company data only if it exists, otherwise use hardcoded
    const companyName = footerData?.company?.name || "Dreams and Degrees Edutech Pvt Ltd.";
    const companyTagline = footerData?.company?.tagline || "Empowering students with the right guidance, tools, and resources to achieve their educational dreams. With our mentorship, mock tests, and scholarship opportunities, we are dedicated to making education accessible for all.";
    const companyPhone = footerData?.company?.phone || "8959591818";
    const companyEmail = footerData?.company?.email || "support@collegementor.com";
    const companyLogoUrl = footerData?.company?.logoUrl || "/lovable-uploads/f76258ce-d7f2-42ce-a5a8-490fc7ec7425.png";

    // Hardcoded fallback groups
    const defaultGroups = [
        {
            title: "Company",
            links: [
                { label: "About Us", url: "/about" },
                { label: "Contact Us", url: "/contact" },
                { label: "Careers", url: "/careers" },
                { label: "Privacy Policy", url: "/privacy" },
                { label: "Terms & Conditions", url: "/terms" },
            ]
        },
        {
            title: "Products",
            links: [
                { label: "Ikigai Test", url: "/products/ikigai" },
                { label: "Mentorship", url: "/products/mentorship" },
                { label: "Mock Tests", url: "/products/mock-tests" },
            ]
        },
        {
            title: "Explore",
            links: [
                { label: "Colleges", url: "/colleges" },
                { label: "Exams", url: "/exams" },
                { label: "Careers", url: "/careers" },
                { label: "Courses", url: "/courses" },
            ]
        }
    ];

    // Use API groups only if they exist, otherwise use hardcoded
    const groups = footerData?.groups && footerData.groups.length > 0
        ? footerData.groups.map((group) => ({
            title: group.title,
            links: group.links.map((link) => ({
                label: link.label,
                url: link.url || link.redirectUrl || "#",
            })),
        }))
        : defaultGroups;

    return (
        <footer className="relative bg-[#f5f9f7] text-gray-800 pb-16 sm:pb-10">
            {/* Top Curve */}
            <div className="absolute -top-20 left-0 right-0 overflow-hidden leading-[0]">
                <svg
                    className="relative block w-full h-20"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 100"
                >
                    <path
                        fill="#f5f9f7"
                        d="M0,100 C480,0 960,100 1440,0 L1440,100 L0,100 Z"
                    />
                </svg>
            </div>

            {/* Footer Content */}
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 sm:gap-y-10 md:gap-y-12 gap-x-6 sm:gap-x-12 md:gap-x-16 lg:gap-x-24 relative z-10">
                {/* Logo / Intro */}
                <div className="flex flex-col items-start sm:col-span-2 md:col-span-1 lg:col-span-1">
                    {companyLogoUrl && (
                        <img
                            src={companyLogoUrl}
                            alt={`${companyName} Logo`}
                            className="max-h-16 sm:max-h-18 md:max-h-20 w-auto mb-3 sm:mb-4"
                        />
                    )}
                    {companyTagline && (
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {companyTagline}
                        </p>
                    )}

                    {/* Social icons */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        {/* WhatsApp */}
                        <a href="#" aria-label="WhatsApp" className="hover:opacity-80">
                            <div
                                className="h-6 w-6 bg-[#25D366]"
                                style={{
                                    WebkitMask: `url(https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg) no-repeat center`,
                                    WebkitMaskSize: "contain",
                                    mask: `url(https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg) no-repeat center`,
                                    maskSize: "contain",
                                }}
                            />
                        </a>

                        {/* LinkedIn */}
                        <a href="#" aria-label="LinkedIn" className="hover:opacity-80">
                            <div
                                className="h-6 w-6 bg-[#0A66C2]"
                                style={{
                                    WebkitMask: `url(https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg) no-repeat center`,
                                    WebkitMaskSize: "contain",
                                    mask: `url(https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg) no-repeat center`,
                                    maskSize: "contain",
                                }}
                            />
                        </a>

                        {/* Instagram (gradient) */}
                        <a href="#" aria-label="Instagram" className="hover:opacity-80">
                            <div
                                className="h-6 w-6 bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af]"
                                style={{
                                    WebkitMask: `url(https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg) no-repeat center`,
                                    WebkitMaskSize: "contain",
                                    mask: `url(https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg) no-repeat center`,
                                    maskSize: "contain",
                                }}
                            />
                        </a>

                        {/* YouTube */}
                        <a href="#" aria-label="YouTube" className="hover:opacity-80">
                            <div
                                className="h-6 w-6 bg-[#FF0000]"
                                style={{
                                    WebkitMask: `url(https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg) no-repeat center`,
                                    WebkitMaskSize: "contain",
                                    mask: `url(https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg) no-repeat center`,
                                    maskSize: "contain",
                                }}
                            />
                        </a>
                    </div>
                </div>

                {/* Dynamic Groups from API */}
                {groups.map((group, index) => (
                    <div key={index}>
                        <h3 className="uppercase tracking-wide text-sm font-semibold text-gray-900 mb-4">
                            {group.title}
                        </h3>
                        <ul className="grid grid-cols-2 gap-2 text-sm md:block md:space-y-2">
                            {group.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                    <a className="hover:text-gray-900" href={link.url}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 py-4 sm:py-6">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
                        {/* Contact Information */}
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                            {companyPhone && (
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Phone size={16} className="text-green-600" />
                                    <span>{companyPhone}</span>
                                </div>
                            )}
                            {companyEmail && (
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Mail size={16} className="text-green-600" />
                                    <span>{companyEmail}</span>
                                </div>
                            )}
                        </div>

                        {/* Copyright */}
                        <div className="text-center text-sm text-gray-500">
                            <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;