import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ChevronDown } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

// Country data with flags and codes
const countries = [
  { code: 'IN', flag: '🇮🇳', name: 'India', dialCode: '+91' },
  { code: 'US', flag: '🇺🇸', name: 'United States', dialCode: '+1' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', dialCode: '+44' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada', dialCode: '+1' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia', dialCode: '+61' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany', dialCode: '+49' },
  { code: 'FR', flag: '🇫🇷', name: 'France', dialCode: '+33' },
  { code: 'JP', flag: '🇯🇵', name: 'Japan', dialCode: '+81' },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore', dialCode: '+65' },
  { code: 'NL', flag: '🇳🇱', name: 'Netherlands', dialCode: '+31' }
];

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [selectedCountry, setSelectedCountry] = useState('IN (+91)');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <div className="space-y-6">
          {/* Welcome Message */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              We're glad you're back!
            </h2>
            <p className="text-gray-600">
              Login to continue your study abroad journey!
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="flex w-full mb-6 border-b border-gray-200">
              <TabsTrigger 
                value="login" 
                className="flex-1 pb-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="flex-1 pb-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Sign up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              {/* Phone Input */}
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative w-[140px]">
                    <select 
                      className="w-full h-10 pl-3 pr-8 border rounded-md text-sm appearance-none bg-white"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={`${country.code} (${country.dialCode})`}>
                          {country.flag} {country.code} ({country.dialCode})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                  <Input
                    type="tel"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800">
                  Request OTP
                </Button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              {/* Google Login */}
              <Button 
                variant="outline" 
                className="w-full border-2 h-12 font-medium"
                onClick={() => {}}
              >
                <FcGoogle className="mr-2 h-5 w-5" />
                Continue with Google
              </Button>

              {/* Login with Email Link */}
              <button 
                className="w-full text-center text-primary hover:text-primary/90 text-sm font-medium"
                onClick={() => {}}
              >
                Login with Email
              </button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              {/* Similar structure for signup form */}
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex gap-2">
                <div className="relative w-[140px]">
                  <select 
                    className="w-full h-10 pl-3 pr-8 border rounded-md text-sm appearance-none bg-white"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={`${country.code} (${country.dialCode})`}>
                        {country.flag} {country.code} ({country.dialCode})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1"
                />
              </div>
              <Button className="w-full">Sign up</Button>
            </TabsContent>
          </Tabs>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-600">
            Can't login or sign up? <a href="#" className="text-primary hover:underline">Let us help</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;