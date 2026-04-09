import React, { useState } from 'react';
import { CompanyDetails } from '../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ShieldCheck, Building2, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

interface OnboardingProps {
  onComplete: (details: any) => void;
  onCancel?: () => void;
}

export default function Onboarding({ onComplete, onCancel }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState<Omit<CompanyDetails, 'onboarded'>>({
    name: '',
    cin: '',
    address: '',
    email: '',
    financialYear: '2026-27',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1 && (!details.name || !details.cin)) {
      toast.error('Please fill in the Company Name and CIN');
      return;
    }
    if (step === 2 && (!details.address || !details.email)) {
      toast.error('Please fill in the Address and Email');
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    onComplete({ ...details, onboarded: true });
    toast.success('Company onboarding completed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome to StatReg Pro</h1>
          <p className="text-gray-500">Let's get your company set up for statutory compliance.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between px-2">
          {[1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors",
                step >= i ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              )}>
                {step > i ? <CheckCircle2 className="w-6 h-6" /> : i}
              </div>
              {i < 3 && (
                <div className={cn(
                  "flex-1 h-1 mx-4 rounded-full transition-colors",
                  step > i ? "bg-blue-600" : "bg-gray-200"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">
              {step === 1 && "Basic Information"}
              {step === 2 && "Contact & Address"}
              {step === 3 && "Compliance Settings"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Enter your company's legal name and Corporate Identification Number."}
              {step === 2 && "Provide the registered office address and primary contact email."}
              {step === 3 && "Review your details and set the current financial year."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="e.g. ABC Private Limited" 
                      className="pl-10"
                      value={details.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cin">CIN (Corporate Identification Number)</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="cin" 
                      name="cin" 
                      placeholder="e.g. U12345MH2026PTC123456" 
                      className="pl-10"
                      value={details.cin}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="address">Registered Office Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    placeholder="Full registered address..." 
                    value={details.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Compliance Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="cs@company.com" 
                    value={details.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Company:</span>
                    <span className="font-bold text-gray-900">{details.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">CIN:</span>
                    <span className="font-bold text-gray-900">{details.cin}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-bold text-gray-900">{details.email}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="financialYear">Current Financial Year</Label>
                  <Input 
                    id="financialYear" 
                    name="financialYear" 
                    value={details.financialYear}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-100 pt-6">
            <div className="flex gap-2">
              {onCancel && (
                <Button variant="ghost" onClick={onCancel} className="text-gray-500">
                  Cancel
                </Button>
              )}
              <Button 
                variant="ghost" 
                onClick={prevStep} 
                disabled={step === 1}
              >
                Back
              </Button>
            </div>
            {step < 3 ? (
              <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                Continue
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Complete Setup
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
