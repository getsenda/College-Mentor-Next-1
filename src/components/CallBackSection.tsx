import React from "react";
import { useHomepageData } from '@/hooks/useHomepageData';
import { Sparkles } from 'lucide-react';

const CallbackSection = () => {
  const { data } = useHomepageData();
  const callbackData = data?.callback;
  
  // Use API meta data only if it exists, otherwise use hardcoded
  const heading = callbackData?.meta?.heading || "Request a Callback";
  const subHeading = callbackData?.meta?.subHeading || "Connect with our experts within 24 hours";
  
  // Use API fields only if they exist, otherwise use hardcoded
  const fields = callbackData?.fields || [
    { name: "Full Name", label: "Full Name", type: "text", required: true },
    { name: "Phone Number", label: "Phone Number", type: "tel", required: true },
    { name: "Email", label: "Email", type: "email", required: false },
    { name: "Query", label: "Query", type: "textarea", required: false },
  ];
  
  // Use API CTA button text only if it exists, otherwise use hardcoded
  const buttonText = callbackData?.cta?.buttonText || "Request Callback";
  
  const experts = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  return (
    <section className="relative bg-white py-12 sm:py-16 lg:py-20">
     
      {/* Top Curve */}
      <div className="absolute -top-12 left-0 right-0 overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 100"
        >
          <defs>
            <filter id="curveShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.08)" />
            </filter>
          </defs>

          <path
            fill="#ffffff"
            filter="url(#curveShadow)"
            d="M0,100 C480,0 960,100 1440,0 L1440,100 L0,100 Z"
          />
        </svg>
      </div>


      <div className="w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content with Expert Avatars */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 mb-3">
              <Sparkles size={12} className="text-primary animate-pulse" />
              <span className="text-primary font-medium text-xs">Expert Guidance</span>
            </div>

            <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Personalised Guidance
              </span>
              .
              <br />
              Trusted Experts.
            </h2>


            {/* Expert Avatars Grid */}
            <div className="mb-6">
              <div className="flex justify-center lg:justify-start items-center mb-4">
                <div className="flex space-x-3">
                  {experts.map((expert, index) => (
                    <div
                      key={expert.id}
                      className="overflow-hidden w-14 h-14 rounded-full border-3 border-white shadow-lg"
                    >
                      <div className="relative group cursor-pointer transform-gpu transition-all duration-300 hover:scale-110">
                        <img
                          src={expert.image}
                          alt="Expert"
                          className="w-full h-full object-cover group-hover:border-[#173CBA] transition-all duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-lg max-w-md leading-relaxed mx-auto lg:mx-0 text-gray-700">
              Get in touch with our expert counsellors to plan your academic
              journey with confidence.
            </p>
          </div>

          {/* Right Form - Enhanced and Animated */}
          <div className="relative">
            {/* Floating Background Elements */}
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#173CBA]/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-[#00C798]/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-6 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
              {/* Form Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#3B82F6] rounded-full mb-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>

                {heading && (
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {heading}
                  </h3>
                )}
                {subHeading && (
                  <p className="text-gray-600">
                    {subHeading}
                  </p>
                )}
              </div>

              <form className="space-y-4">
                {fields.map((field, index) => (
                  <div key={index} className="relative group">
                    {field.type === "textarea" ? (
                      <textarea
                        placeholder={field.label}
                        required={field.required}
                        className="w-full rounded-xl border-2 border-gray-200 px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#173CBA] focus:ring-4 focus:ring-[#173CBA]/20 transition-all duration-300 bg-gray-50/50 hover:bg-white hover:border-gray-300 min-h-[100px]"
                      />
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.label}
                        required={field.required}
                        className="w-full rounded-xl border-2 border-gray-200 px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#173CBA] focus:ring-4 focus:ring-[#173CBA]/20 transition-all duration-300 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                      />
                    )}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                      {field.type === "email" ? (
                        <svg className="w-5 h-5 text-[#173CBA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ) : field.type === "tel" ? (
                        <svg className="w-5 h-5 text-[#173CBA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      ) : field.type === "textarea" ? (
                        <svg className="w-5 h-5 text-[#173CBA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-[#173CBA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}

                <div className="overflow-hidden rounded-xl">
                  <button
                    type="submit"
                    className="w-full bg-[#3B82F6] hover:bg-[#145BA3] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform-gpu hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/30 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {buttonText}
                      <svg
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>

                </div>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
                By proceeding you agree to our{" "}
                <a href="#" className="text-[#173CBA] underline hover:text-[#00C798] transition-colors duration-300">
                  terms of use
                </a>{" "}
                &{" "}
                <a href="#" className="text-[#173CBA] underline hover:text-[#00C798] transition-colors duration-300">
                  privacy policy
                </a>.
              </p>

              {/* Security Badge */}
              <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Your information is secure and encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      </br>
    </section>
  );
};

export default CallbackSection;