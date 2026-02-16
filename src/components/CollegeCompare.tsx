"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  ArrowLeft,
  Star,
  MapPin,
  Trophy,
  Building,
  BookOpen,
  Wifi,
  Car,
  Home,
  Heart,
  CheckCircle,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/FallBack";

interface CollegeComparisonProps {
  colleges: any[];
  onBack: () => void;
}

const comparisonParameters = [
  { key: 'ranking', label: 'Overall Ranking', icon: Trophy, type: 'number', lower_is_better: true },
  { key: 'fees', label: 'Annual Fees', icon: Building, type: 'currency' },
  { key: 'placements', label: 'Placement Rate', icon: CheckCircle, type: 'percentage' },
  { key: 'cutoff', label: 'Cutoff Score', icon: BookOpen, type: 'score' },
  { key: 'rating', label: 'Student Rating', icon: Star, type: 'rating' },
];

const facilities = [
  { key: 'library', label: 'Library Facilities', icon: BookOpen },
  { key: 'wifi', label: 'Campus WiFi', icon: Wifi },
  { key: 'hostel', label: 'Accommodation', icon: Home },
  { key: 'parking', label: 'Parking', icon: Car },
  { key: 'sports', label: 'Sports Complex', icon: Heart },
  { key: 'cafeteria', label: 'Dining', icon: Building },
];

export function CollegeComparison({ colleges, onBack }: CollegeComparisonProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getFacilityRating = (college: any, facility: string) => {
    // Mock facility ratings
    const ratings: { [key: string]: { [key: string]: number } } = {
      '1': { library: 95, wifi: 88, hostel: 92, parking: 85, sports: 90, cafeteria: 87 },
      '2': { library: 98, wifi: 95, hostel: 89, parking: 82, sports: 88, cafeteria: 91 },
      '3': { library: 93, wifi: 90, hostel: 95, parking: 88, sports: 92, cafeteria: 89 },
      '4': { library: 96, wifi: 92, hostel: 88, parking: 90, sports: 94, cafeteria: 88 },
      '5': { library: 94, wifi: 89, hostel: 91, parking: 87, sports: 89, cafeteria: 92 },
      '6': { library: 88, wifi: 85, hostel: 87, parking: 84, sports: 86, cafeteria: 85 },
      '7': { library: 90, wifi: 88, hostel: 89, parking: 86, sports: 88, cafeteria: 87 },
      '8': { library: 93, wifi: 91, hostel: 90, parking: 88, sports: 91, cafeteria: 89 },
      '9': { library: 87, wifi: 84, hostel: 86, parking: 83, sports: 85, cafeteria: 84 },
    };
    return ratings[college.id]?.[facility] || 85;
  };

  const getBestValue = (colleges: any[], key: string, lowerIsBetter = false) => {
    if (key === 'ranking') {
      return Math.min(...colleges.map(c => c[key]));
    }
    if (key === 'rating') {
      return Math.max(...colleges.map(c => c[key]));
    }
    if (key === 'placements') {
      return Math.max(...colleges.map(c => parseInt(c[key])));
    }
    return null;
  };

  const isHighlighted = (college: any, key: string) => {
    const bestValue = getBestValue(colleges, key, key === 'ranking');
    if (key === 'ranking') return college[key] === bestValue;
    if (key === 'rating') return college[key] === bestValue;
    if (key === 'placements') return parseInt(college[key]) === bestValue;
    return false;
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'academics', label: 'Academics' },
    { id: 'costs', label: 'Costs' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#173CBA]/5 via-[#186BBF]/3 to-[#00C798]/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#186BBF]/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#00C798]/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={onBack}
                className="hover:bg-white/80 border-gray-300 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  University Comparison
                </h1>
                <p className="text-gray-600 mt-1">
                  Compare {colleges.length} universities across key metrics
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-[#173CBA] to-[#186BBF] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {colleges.length} universities selected
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex border-b border-gray-200/50 mb-8 bg-white/80 backdrop-blur-sm rounded-t-lg"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm transition-colors duration-200 border-b-2 ${activeTab === tab.id
                ? 'border-[#173CBA] text-[#173CBA] bg-white/50'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* College Headers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 mb-8"
          style={{ gridTemplateColumns: `repeat(${colleges.length}, 1fr)` }}
        >
          {colleges.map((college, index) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-sm">
                <div className="relative h-24">
                  <ImageWithFallback
                    src={typeof college.image === 'string' ? college.image : college.image.src}
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {college.isRecommended && (
                    <Badge className="absolute top-2 right-2 bg-[#00C798] text-white text-xs px-2 py-1 border-0">
                      Recommended
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{college.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-3 h-3 mr-1" />
                    {college.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-orange-400 fill-current mr-1" />
                      <span className="text-sm font-medium text-gray-700">{college.rating}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      #{college.ranking}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Key Metrics Comparison</CardTitle>
                <p className="text-gray-600">Compare essential metrics across selected universities</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {comparisonParameters.map((param) => {
                    const Icon = param.icon;
                    return (
                      <div key={param.key} className="border-b border-gray-100/50 pb-6 last:border-b-0">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#173CBA]/10 to-[#186BBF]/10 rounded-lg flex items-center justify-center mr-3">
                            <Icon className="w-4 h-4 text-[#173CBA]" />
                          </div>
                          <h4 className="font-semibold text-gray-900">{param.label}</h4>
                        </div>
                        <div
                          className="grid gap-4"
                          style={{ gridTemplateColumns: `repeat(${colleges.length}, 1fr)` }}
                        >
                          {colleges.map((college) => (
                            <div
                              key={college.id}
                              className={`p-4 rounded-lg border transition-all duration-200 ${isHighlighted(college, param.key)
                                ? 'border-[#00C798] bg-green-50/80'
                                : 'border-gray-200/50 bg-white/50'
                                }`}
                            >
                              <div className="text-xs text-gray-600 mb-2 uppercase tracking-wide">
                                {college.name}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="font-semibold text-lg text-gray-900">
                                  {college[param.key]}
                                </div>
                                {isHighlighted(college, param.key) && (
                                  <Badge className="bg-[#00C798] text-white text-xs px-2 py-1">
                                    Best
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'facilities' && (
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Campus Facilities</CardTitle>
                <p className="text-gray-600">Compare facility ratings across universities</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {facilities.map((facility) => {
                    const Icon = facility.icon;
                    return (
                      <div key={facility.key} className="border-b border-gray-100/50 pb-6 last:border-b-0">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#173CBA]/10 to-[#186BBF]/10 rounded-lg flex items-center justify-center mr-3">
                            <Icon className="w-4 h-4 text-[#173CBA]" />
                          </div>
                          <h4 className="font-semibold text-gray-900">{facility.label}</h4>
                        </div>
                        <div
                          className="grid gap-4"
                          style={{ gridTemplateColumns: `repeat(${colleges.length}, 1fr)` }}
                        >
                          {colleges.map((college) => {
                            const rating = getFacilityRating(college, facility.key);
                            return (
                              <div key={college.id} className="p-4 rounded-lg border border-gray-200/50 bg-white/50">
                                <div className="text-xs text-gray-600 mb-3 uppercase tracking-wide">
                                  {college.name}
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-900">{rating}%</span>
                                  </div>
                                  <Progress value={rating} className="h-2" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {(activeTab === 'academics' || activeTab === 'costs') && (
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  {activeTab === 'academics' ? 'Academic Programs' : 'Cost Breakdown'}
                </CardTitle>
                <p className="text-gray-600">
                  {activeTab === 'academics'
                    ? 'Detailed academic program information'
                    : 'Comprehensive cost analysis'
                  }
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#173CBA]/10 to-[#186BBF]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-[#173CBA]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-gray-600">
                    {activeTab === 'academics'
                      ? 'Detailed academic program comparisons will be available here'
                      : 'Comprehensive cost breakdown and financial aid information will be available here'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}