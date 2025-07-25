/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/components/auth/auth-provider";
import { apiClient } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Building2,
  Smartphone,
  Wrench,
  PartyPopper,
  MoreHorizontal,
  Upload,
  Plus,
  X,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Share2,
  BarChart3,
  ArrowLeft,
  Check,
  Camera,
  Settings,
  Sparkles,
  Building,
  Store,
  Copy,
  Edit,
  Trash2,
  AlertCircle,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { GradientBackground } from "@/components/business-onboarding/gradient-background";
import { StepIndicator } from "@/components/business-onboarding/step-indicator";
import { StepCard } from "@/components/business-onboarding/step-card";
import { AnimatedButton } from "@/components/business-onboarding/animated-button";
import { StepTransitionWrapper } from "@/components/business-onboarding/step-transition-wrapper";
import { BusinessTypeSelector } from "@/components/business-onboarding/business-type-selector";
import { AnimatedInput } from "@/components/business-onboarding/animated-input";
import { AccountStep } from "@/components/business-onboarding/account-step";

// Types
interface BusinessBranch {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  workingHours: WorkingHours;
  products: Product[];
  isMainBranch: boolean;
}

interface BusinessProfile {
  id: string;
  type: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  coverPhoto: string;
  heroTitle: string;
  heroTagline: string;
  heroBanner: string;
  themeColor: string;
  ctaText: string;
  enableBookings: boolean;
  allowNegotiation: boolean;
  deliveryAvailable: boolean;
  branches: BusinessBranch[];
  termsAgreed: boolean;
}

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

interface WorkingHours {
  [key: string]: { open: string; close: string; closed: boolean };
}

interface UserInformation {
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  city?: string;
  isExistingUser: boolean;
}

interface OnboardingState {
  businesses: BusinessProfile[];
  currentBusinessIndex: number;
  currentBranchIndex: number;
  isAddingNewBusiness: boolean;
  isAddingNewBranch: boolean;
  userInfo: UserInformation;
}

const businessTypes = [
  {
    id: "restaurant",
    name: "Restaurant",
    icon: UtensilsCrossed,
    color: "bg-orange-500",
  },
  { id: "hotel", name: "Hotel", icon: Building2, color: "bg-blue-500" },
  {
    id: "electronics",
    name: "Electronics",
    icon: Smartphone,
    color: "bg-purple-500",
  },
  {
    id: "repair",
    name: "Repair Services",
    icon: Wrench,
    color: "bg-green-500",
  },
  { id: "events", name: "Events", icon: PartyPopper, color: "bg-pink-500" },
  { id: "other", name: "Other", icon: MoreHorizontal, color: "bg-gray-500" },
];

const cities = [
  "Owerri",
  "Aba",
  "Enugu",
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Kano",
  "Ibadan",
];

const themeColors = [
  { name: "Nexa Blue", value: "#05BBC8", bg: "bg-[#05BBC8]" },
  { name: "Emerald", value: "#10b981", bg: "bg-emerald-500" },
  { name: "Orange", value: "#f97316", bg: "bg-orange-500" },
  { name: "Purple", value: "#8b5cf6", bg: "bg-purple-500" },
  { name: "Rose", value: "#f43f5e", bg: "bg-rose-500" },
  { name: "Amber", value: "#f59e0b", bg: "bg-amber-500" },
];

const defaultWorkingHours: WorkingHours = {
  Monday: { open: "09:00", close: "18:00", closed: false },
  Tuesday: { open: "09:00", close: "18:00", closed: false },
  Wednesday: { open: "09:00", close: "18:00", closed: false },
  Thursday: { open: "09:00", close: "18:00", closed: false },
  Friday: { open: "09:00", close: "18:00", closed: false },
  Saturday: { open: "10:00", close: "16:00", closed: false },
  Sunday: { open: "10:00", close: "16:00", closed: true },
};

const createEmptyBusiness = (): BusinessProfile => ({
  id: Date.now().toString(),
  type: "",
  name: "",
  description: "",
  category: "",
  logo: "",
  coverPhoto: "",
  heroTitle: "",
  heroTagline: "",
  heroBanner: "",
  themeColor: "#05BBC8",
  ctaText: "Contact Us",
  enableBookings: true,
  allowNegotiation: false,
  deliveryAvailable: false,
  branches: [
    {
      id: Date.now().toString(),
      name: "Main Branch",
      address: "",
      city: "",
      phone: "",
      email: "",
      workingHours: defaultWorkingHours,
      products: [],
      isMainBranch: true,
    },
  ],
  termsAgreed: false,
});

const createEmptyBranch = (businessName: string): BusinessBranch => ({
  id: Date.now().toString(),
  name: `${businessName} - New Branch`,
  address: "",
  city: "",
  phone: "",
  email: "",
  workingHours: defaultWorkingHours,
  products: [],
  isMainBranch: false,
});

export default function BusinessOnboardingPage() {
  // Track if this component has been mounted
  const auth = useContext(AuthContext);
  
  const [hasMounted, setHasMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [userInfoInitialized, setUserInfoInitialized] = useState(false);
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    businesses: [createEmptyBusiness()],
    currentBusinessIndex: 0,
    currentBranchIndex: 0,
    isAddingNewBusiness: false,
    isAddingNewBranch: false,
    userInfo: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      city: "",
      isExistingUser: false
    }
  });

  useEffect(() => {
    setHasMounted(true);
    
    // Only update if user is authenticated and we haven't already initialized user info
    if (auth?.user && !userInfoInitialized) {
      setOnboardingState(prev => ({
        ...prev,
        userInfo: {
          fullName: auth.user?.fullName || "",
          email: auth.user?.email || "",
          phone: auth.user?.phone || "",
          password: prev.userInfo.password,
          city: auth.user?.city || "",
          isExistingUser: true
        }
      }));
      setUserInfoInitialized(true);
    }
  }, [auth?.user, userInfoInitialized]);
  
  // Check if user is authenticated
  const isAuthenticated = !!auth?.user;
  
  // Add 1 for auth step if user is not authenticated
  const totalSteps = isAuthenticated ? 7 : 8;
  
  const stepTitles = isAuthenticated ? [
    "Business Type",
    "Basic Info",
    "Products",
    "Appearance",
    "Operations",
    "Review",
    "Launch"
  ] : [
    "Account",
    "Business Type",
    "Basic Info",
    "Products",
    "Appearance",
    "Operations",
    "Review",
    "Launch"
  ];

  const currentBusiness =
    onboardingState.businesses[onboardingState.currentBusinessIndex];
  const currentBranch =
    currentBusiness?.branches[onboardingState.currentBranchIndex];

  // Handle user field changes
  const handleUserFieldChange = (field: string, value: string) => {
    setOnboardingState({
      ...onboardingState,
      userInfo: {
        ...onboardingState.userInfo,
        [field]: value,
      },
    });
    
    // Clear any error when the user starts typing
    if (validationErrors[field]) {
      setValidationErrors({
        ...validationErrors,
        [field]: "",
      });
    }
  };

  // Toggle between login and signup forms
  const toggleExistingUser = () => {
    setOnboardingState({
      ...onboardingState,
      userInfo: {
        ...onboardingState.userInfo,
        isExistingUser: !onboardingState.userInfo.isExistingUser,
      },
    });
    // Clear errors when toggling
    setValidationErrors({});
  };

  // Handle authentication for account step
  const handleAccountStepSubmission = async (): Promise<boolean> => {
    setIsLoading(true);
    setValidationErrors({});
    
    try {
      const { fullName, email, phone, password, city, isExistingUser } = onboardingState.userInfo;
      
      // Validate fields
      const errors: Record<string, string> = {};
      
      if (isExistingUser) {
        // Login validation
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";
      } else {
        // Registration validation
        if (!fullName) errors.fullName = "Full name is required";
        if (!email) errors.email = "Email is required";
        if (!phone) errors.phone = "Phone number is required";
        if (!password) errors.password = "Password is required";
        if (password && password.length < 8) errors.password = "Password must be at least 8 characters";
      }
      
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        setIsLoading(false);
        return false;
      }
      
      // Attempt login or registration
      if (isExistingUser) {
        const result = await auth?.login({
          email,
          password: password ?? "",
        });
        
        if (!result?.success) {
          setValidationErrors({
            general: result?.message || "Login failed. Please check your credentials.",
          });
          setIsLoading(false);
          return false;
        }
      } else {
        const result = await auth?.register({
          fullName,
          email,
          phone,
          password: password ?? "",
          confirmPassword: password ?? "", // We already validated this on the frontend
          role: "business", // Set role as business since this is business onboarding
          city,
        });
        
        if (!result?.success) {
          setValidationErrors({
            general: result?.message || "Registration failed. Please try again.",
          });
          setIsLoading(false);
          return false;
        }
      }
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Authentication error:", error);
      setValidationErrors({
        general: "An unexpected error occurred. Please try again.",
      });
      setIsLoading(false);
      return false;
    }
  };

  const handleNext = async () => {
    // If we're on the account step and the user is not authenticated
    if (!isAuthenticated && currentStep === 1) {
      const success = await handleAccountStepSubmission();
      if (!success) return; // Don't proceed if authentication failed
    }
    
    if (currentStep === totalSteps) {
      // Submit the entire onboarding data to the backend
      await submitOnboardingData();
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Function to submit all onboarding data to the backend
  const submitOnboardingData = async () => {
    setIsLoading(true);
    try {
      // Submit each business to the backend
      const results = [];
      
      for (const business of onboardingState.businesses) {
        const mainBranch = business.branches.find(branch => branch.isMainBranch) || business.branches[0];
        
        // Prepare the business data
        const businessData = {
          name: business.name,
          description: business.description,
          category: business.category,
          email: mainBranch.email || onboardingState.userInfo.email, // Use branch email if available, otherwise user email
          phone: mainBranch.phone || onboardingState.userInfo.phone, // Use branch phone if available, otherwise user phone
          city: mainBranch.city,
          address: mainBranch.address,
          photos: [],
          logo: business.logo || "",
          heroTitle: business.heroTitle || "",
          heroTagline: business.heroTagline || "",
          heroBanner: business.heroBanner || "",
          themeColor: business.themeColor || "#05BBC8",
          ctaText: business.ctaText || "Contact Us",
          enableBookings: business.enableBookings,
          allowNegotiation: business.allowNegotiation,
          deliveryAvailable: business.deliveryAvailable,
        };
        
        // Use the API client to create the business
        const response = await apiClient.createBusiness(businessData);
        
        if (!response.success) {
          throw new Error(response.message || `Failed to create business: ${business.name}`);
        }
        
        results.push(response.data);
        
        // Update the business ID in our state for sharing links
        const updatedBusinesses = [...onboardingState.businesses];
        const index = updatedBusinesses.findIndex(b => b.id === business.id);
        if (index !== -1 && response.data) {
          updatedBusinesses[index].id = response.data.id;
        }
        
        setOnboardingState({
          ...onboardingState,
          businesses: updatedBusinesses
        });
      }
      
      // All businesses created successfully
      setCurrentStep(totalSteps); // Move to the last step
      setIsLoading(false);
      
    } catch (error) {
      console.error("Error submitting business data:", error);
      setValidationErrors({
        general: error instanceof Error ? error.message : "Failed to create your business. Please try again."
      });
      setIsLoading(false);
    }
  };

  const updateCurrentBusiness = (updates: Partial<BusinessProfile>) => {
    const updatedBusinesses = [...onboardingState.businesses];
    updatedBusinesses[onboardingState.currentBusinessIndex] = {
      ...updatedBusinesses[onboardingState.currentBusinessIndex],
      ...updates,
    };
    setOnboardingState({
      ...onboardingState,
      businesses: updatedBusinesses,
    });
  };

  const updateCurrentBranch = (updates: Partial<BusinessBranch>) => {
    const updatedBusinesses = [...onboardingState.businesses];
    const updatedBranches = [
      ...updatedBusinesses[onboardingState.currentBusinessIndex].branches,
    ];
    updatedBranches[onboardingState.currentBranchIndex] = {
      ...updatedBranches[onboardingState.currentBranchIndex],
      ...updates,
    };
    updatedBusinesses[onboardingState.currentBusinessIndex].branches =
      updatedBranches;
    setOnboardingState({
      ...onboardingState,
      businesses: updatedBusinesses,
    });
  };

  const addNewBusiness = () => {
    const newBusiness = createEmptyBusiness();
    setOnboardingState({
      ...onboardingState,
      businesses: [...onboardingState.businesses, newBusiness],
      currentBusinessIndex: onboardingState.businesses.length,
      currentBranchIndex: 0,
      isAddingNewBusiness: true,
    });
    setCurrentStep(1); // Start from business type selection
  };

  const addNewBranch = () => {
    const newBranch = createEmptyBranch(currentBusiness.name);
    const updatedBusinesses = [...onboardingState.businesses];
    updatedBusinesses[onboardingState.currentBusinessIndex].branches.push(
      newBranch
    );
    setOnboardingState({
      ...onboardingState,
      businesses: updatedBusinesses,
      currentBranchIndex:
        updatedBusinesses[onboardingState.currentBusinessIndex].branches
          .length - 1,
      isAddingNewBranch: true,
    });
    setCurrentStep(2); // Start from branch details
  };

  const switchToBusiness = (businessIndex: number) => {
    setOnboardingState({
      ...onboardingState,
      currentBusinessIndex: businessIndex,
      currentBranchIndex: 0,
    });
  };

  const switchToBranch = (branchIndex: number) => {
    setOnboardingState({
      ...onboardingState,
      currentBranchIndex: branchIndex,
    });
  };

  const deleteBusiness = (businessIndex: number) => {
    if (onboardingState.businesses.length > 1) {
      const updatedBusinesses = onboardingState.businesses.filter(
        (_, index) => index !== businessIndex
      );
      setOnboardingState({
        ...onboardingState,
        businesses: updatedBusinesses,
        currentBusinessIndex: Math.max(0, businessIndex - 1),
        currentBranchIndex: 0,
      });
    }
  };

  const deleteBranch = (branchIndex: number) => {
    if (
      currentBusiness.branches.length > 1 &&
      !currentBusiness.branches[branchIndex].isMainBranch
    ) {
      const updatedBranches = currentBusiness.branches.filter(
        (_, index) => index !== branchIndex
      );
      updateCurrentBusiness({ branches: updatedBranches });
      setOnboardingState({
        ...onboardingState,
        currentBranchIndex: Math.max(0, branchIndex - 1),
      });
    }
  };

  const handleBusinessTypeSelect = (type: string) => {
    const selectedType = businessTypes.find((t) => t.id === type);
    updateCurrentBusiness({
      type,
      category: selectedType?.name || "",
    });
  };

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
    };
    updateCurrentBranch({
      products: [...currentBranch.products, newProduct],
    });
  };

  const updateProduct = (id: string, field: string, value: string) => {
    const updatedProducts = currentBranch.products.map((product) =>
      product.id === id ? { ...product, [field]: value } : product
    );
    updateCurrentBranch({ products: updatedProducts });
  };

  const removeProduct = (id: string) => {
    const updatedProducts = currentBranch.products.filter(
      (product) => product.id !== id
    );
    updateCurrentBranch({ products: updatedProducts });
  };

  const updateWorkingHours = (
    day: string,
    field: string,
    value: string | boolean
  ) => {
    const updatedHours = {
      ...currentBranch.workingHours,
      [day]: {
        ...currentBranch.workingHours[day],
        [field]: value,
      },
    };
    updateCurrentBranch({ workingHours: updatedHours });
  };

  const renderProgressBar = () => (
    <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
      <div
        className="bg-gradient-to-r from-[#05BBC8] to-blue-400 h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      ></div>
    </div>
  );

  const renderBusinessSelector = () => (
    <div className="mb-4 sm:mb-6">
      <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-3 sm:mb-4 gap-2 xs:gap-0">
        <h3 className="text-base sm:text-lg font-semibold text-white">Your Businesses</h3>
        <Button
          onClick={addNewBusiness}
          variant="outline"
          size="sm"
          className="border-[#05BBC8] text-[#05BBC8] hover:bg-[#05BBC8]/10 w-full xs:w-auto text-xs sm:text-sm"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Add Business
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3">
        {onboardingState.businesses.map((business, index) => (
          <Card
            key={business.id}
            className={`cursor-pointer transition-all ${
              index === onboardingState.currentBusinessIndex
                ? "border-[#05BBC8] bg-[#05BBC8]/10"
                : "border-gray-700 bg-gray-900 hover:border-gray-600"
            }`}
            onClick={() => switchToBusiness(index)}
          >
            <CardContent className="p-2 xs:p-3 sm:p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-xs xs:text-sm sm:text-base text-white truncate">
                  {business.name || `Business ${index + 1}`}
                </h4>
                {onboardingState.businesses.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBusiness(index);
                    }}
                    className="text-red-400 hover:text-red-300 p-0 xs:p-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-400 truncate">{business.category}</p>
              <Badge className="mt-1 sm:mt-2 text-[10px] xs:text-xs">
                {business.branches.length} branch
                {business.branches.length !== 1 ? "es" : ""}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBranchSelector = () => (
    <div className="mb-4 sm:mb-6">
      <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-3 sm:mb-4 gap-2 xs:gap-0">
        <h3 className="text-base sm:text-lg font-semibold text-white truncate">
          {currentBusiness.name || "Current Business"} - Branches
        </h3>
        <Button
          onClick={addNewBranch}
          variant="outline"
          size="sm"
          className="border-[#05BBC8] text-[#05BBC8] hover:bg-[#05BBC8]/10 w-full xs:w-auto text-xs sm:text-sm"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Add Branch
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3">
        {currentBusiness.branches.map((branch, index) => (
          <Card
            key={branch.id}
            className={`cursor-pointer transition-all ${
              index === onboardingState.currentBranchIndex
                ? "border-[#05BBC8] bg-[#05BBC8]/10"
                : "border-gray-700 bg-gray-900 hover:border-gray-600"
            }`}
            onClick={() => switchToBranch(index)}
          >
            <CardContent className="p-2 xs:p-3 sm:p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-xs xs:text-sm sm:text-base text-white truncate">
                  {branch.name}
                </h4>
                {!branch.isMainBranch && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBranch(index);
                    }}
                    className="text-red-400 hover:text-red-300 p-0 xs:p-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-400 truncate">
                {branch.city || "City not set"}
              </p>
              <div className="flex flex-wrap items-center gap-1 xs:gap-2 mt-1 sm:mt-2">
                {branch.isMainBranch && (
                  <Badge className="text-[10px] xs:text-xs bg-[#05BBC8] text-black">
                    Main
                  </Badge>
                )}
                <Badge variant="outline" className="text-[10px] xs:text-xs">
                  {branch.products.length} products
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <StepCard 
      title={onboardingState.isAddingNewBusiness
            ? "What type of business are you adding?"
            : "What kind of business are you setting up?"}
      subtitle="Choose the category that best describes your business"
      icon={<Building className="w-6 h-6" />}
    >
      <div className="space-y-8">
        {onboardingState.businesses.length > 1 && renderBusinessSelector()}

        <BusinessTypeSelector 
          options={businessTypes} 
          selectedType={currentBusiness.type} 
          onSelect={handleBusinessTypeSelect}
        />
      </div>
    </StepCard>
  );

  const renderStep2 = () => (
    <StepCard 
      title={onboardingState.isAddingNewBranch
        ? `Add new branch for ${currentBusiness.name}`
        : "Tell us about your business"}
      subtitle="Provide the essential details customers need to find and contact you"
      icon={<Store className="w-6 h-6" />}
      delay={0.1}
    >
      <div className="space-y-8">
        {onboardingState.businesses.length > 1 && renderBusinessSelector()}
        {currentBusiness.branches.length > 1 && renderBranchSelector()}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              {!onboardingState.isAddingNewBranch && (
                <>
                  <AnimatedInput
                    label="Business Name"
                    name="businessName"
                    value={currentBusiness.name}
                    onChange={(e) =>
                      updateCurrentBusiness({ name: e.target.value })
                    }
                    placeholder="e.g., Mama's Kitchen"
                    required
                    delay={0.2}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-5"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Business Description <span className="text-[#05BBC8]">*</span>
                    </label>
                    <Textarea
                      placeholder="Describe what makes your business special..."
                      value={currentBusiness.description}
                      onChange={(e) =>
                        updateCurrentBusiness({ description: e.target.value })
                      }
                      className="bg-gray-900/50 backdrop-blur-md border-gray-800 focus:border-[#05BBC8] text-white min-h-[100px]"
                    />
                  </motion.div>
                </>
              )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {currentBranch.isMainBranch ? "Branch Name" : "Branch Name *"}
              </label>
              <Input
                placeholder={
                  currentBranch.isMainBranch
                    ? "Main Branch"
                    : "e.g., Owerri Branch"
                }
                value={currentBranch.name}
                onChange={(e) => updateCurrentBranch({ name: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <Input
                  placeholder="+234 xxx xxx xxxx"
                  value={currentBranch.phone}
                  onChange={(e) =>
                    updateCurrentBranch({ phone: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Branch Email
                </label>
                <Input
                  placeholder="branch@yourbusiness.com"
                  value={currentBranch.email}
                  onChange={(e) =>
                    updateCurrentBranch({ email: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  City *
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-gray-800 border-gray-700 text-white"
                    >
                      {currentBranch.city || "Select city"}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-700">
                    {cities.map((city) => (
                      <DropdownMenuItem
                        key={city}
                        onClick={() => updateCurrentBranch({ city })}
                        className="text-white hover:bg-gray-700"
                      >
                        {city}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <Input
                  value={currentBusiness.category}
                  disabled
                  className="bg-gray-700 border-gray-600 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Branch Address *
              </label>
              <Input
                placeholder="Street address, landmark, etc."
                value={currentBranch.address}
                onChange={(e) =>
                  updateCurrentBranch({ address: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {!onboardingState.isAddingNewBranch && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Logo
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-[#05BBC8] transition-colors cursor-pointer"
                    onClick={() =>
                      document.getElementById("logo-upload")?.click()
                    }
                  >
                    {currentBusiness.logo ? (
                      <Image
                        src={currentBusiness.logo}
                        alt="Logo"
                        width={64}
                        height={64}
                        className="mx-auto mb-2 w-16 h-16 object-contain rounded-full bg-gray-800"
                      />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">Upload logo</p>
                      </>
                    )
                    }
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            updateCurrentBusiness({
                              logo: ev.target?.result as string,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cover Photo
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-[#05BBC8] transition-colors cursor-pointer"
                    onClick={() =>
                      document.getElementById("cover-upload")?.click()
                    }
                  >
                    {currentBusiness.coverPhoto ? (
                      <Image
                        src={currentBusiness.coverPhoto}
                        alt="Cover"
                        width={320}
                        height={80}
                        className="mx-auto mb-2 w-full h-20 object-cover rounded"
                      />
                    ) : (
                      <>
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">Upload cover</p>
                      </>
                    )}
                    <input
                      id="cover-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            updateCurrentBusiness({
                              coverPhoto: ev.target?.result as string,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-[#05BBC8] text-black">
                      {currentBusiness.name.slice(0, 2).toUpperCase() || "BN"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-white">
                      {currentBusiness.name || "Business Name"}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {currentBusiness.category}
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <h5 className="font-medium text-white mb-2">
                    {currentBranch.name}
                  </h5>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {currentBranch.city && currentBranch.address
                          ? `${currentBranch.address}, ${currentBranch.city}`
                          : "Address"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{currentBranch.phone || "Phone number"}</span>
                    </div>
                    {currentBranch.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{currentBranch.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </StepCard>

  );

  const renderStep3 = () => (
    <StepCard
      title={`Add products/services for ${currentBranch.name}`}
      subtitle="Showcase what you offer at this location"
      icon={<PartyPopper className="w-6 h-6" />}
      delay={0.1}
    >
      <div className="space-y-8">
        {onboardingState.businesses.length > 1 && renderBusinessSelector()}
        {currentBusiness.branches.length > 1 && renderBranchSelector()}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="space-y-4 sm:space-y-6">
            {currentBranch.products.map((product, index) => (
              <Card key={product.id} className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Product/Service #{index + 1}
                    </h3>
                    {currentBranch.products.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProduct(product.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <Input
                        placeholder="e.g., Jollof Rice"
                        value={product.name}
                        onChange={(e) =>
                          updateProduct(product.id, "name", e.target.value)
                        }
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Price *
                      </label>
                      <Input
                        placeholder="₦2,500"
                        value={product.price}
                        onChange={(e) =>
                          updateProduct(product.id, "price", e.target.value)
                        }
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <Textarea
                      placeholder="Describe this product or service..."
                      value={product.description}
                      onChange={(e) =>
                        updateProduct(product.id, "description", e.target.value)
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Product Image
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-[#05BBC8] transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Upload image</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              onClick={addProduct}
              variant="outline"
              className="w-full border-dashed border-[#05BBC8] text-[#05BBC8] hover:bg-[#05BBC8]/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Product/Service
            </Button>

            <Button
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
            >
              Skip for now - I&#39;ll add products later
            </Button>
          </div>
        </div>

        <div className="lg:sticky lg:top-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {currentBranch.name} - Product Preview
              </h3>
              {currentBranch.products.length > 0 ? (
                <div className="space-y-4">
                  {currentBranch.products.map((product) => (
                    <Card
                      key={product.id}
                      className="bg-gray-800 border-gray-600"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                            <Camera className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">
                              {product.name || "Product Name"}
                            </h4>
                            <p className="text-sm text-[#05BBC8] font-medium">
                              {product.price || "Price"}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {product.description || "Description..."}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-400">
                    Add your first product to see preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </StepCard>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      {onboardingState.businesses.length > 1 && renderBusinessSelector()}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white mb-4">
              Customize your public page
            </h2>
            <p className="text-gray-400">
              Create a stunning storefront that represents your brand
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hero Title *
              </label>
              <Input
                placeholder="Welcome to our business"
                value={currentBusiness.heroTitle}
                onChange={(e) =>
                  updateCurrentBusiness({ heroTitle: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hero Tagline
              </label>
              <Input
                placeholder="Quality service you can trust"
                value={currentBusiness.heroTagline}
                onChange={(e) =>
                  updateCurrentBusiness({ heroTagline: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hero Banner
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-[#05BBC8] transition-colors cursor-pointer">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Upload hero banner</p>
                <p className="text-sm text-gray-500">Recommended: 1200x400px</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Theme Color
              </label>
              <div className="grid grid-cols-3 gap-3">
                {themeColors.map((color) => (
                  <div
                    key={color.value}
                    className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                      currentBusiness.themeColor === color.value
                        ? "border-white"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                    onClick={() =>
                      updateCurrentBusiness({ themeColor: color.value })
                    }
                  >
                    <div
                      className={`w-full h-8 ${color.bg} rounded mb-2`}
                    ></div>
                    <p className="text-xs text-gray-300 text-center">
                      {color.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Call-to-Action Button Text
              </label>
              <Input
                placeholder="Contact Us"
                value={currentBusiness.ctaText}
                onChange={(e) =>
                  updateCurrentBusiness({ ctaText: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-0">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">
                  Live Preview
                </h3>
              </div>
              <div className="p-6">
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentBusiness.heroTitle || "Hero Title"}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {currentBusiness.heroTagline || "Hero tagline goes here"}
                    </p>
                    <Button
                      className="text-white"
                      style={{ backgroundColor: currentBusiness.themeColor }}
                    >
                      {currentBusiness.ctaText}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8">
      {onboardingState.businesses.length > 1 && renderBusinessSelector()}
      {currentBusiness.branches.length > 1 && renderBranchSelector()}

      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Set up operations for {currentBranch.name}
        </h2>
        <p className="text-gray-400">
          Configure how customers can interact with this branch
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Business Features
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-white">Enable Bookings</h4>
            <p className="text-sm text-gray-400">
              Allow customers to book appointments
            </p>
          </div>
          <Switch
            checked={currentBusiness.enableBookings}
            onCheckedChange={(checked) =>
              updateCurrentBusiness({ enableBookings: checked })
            }
            className="data-[state=checked]:bg-[#05BBC8] data-[state=unchecked]:bg-gray-600 border border-gray-400"
          />
            </div>
            <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-white">
              Allow Price Negotiation
            </h4>
            <p className="text-sm text-gray-400">
              Let customers negotiate prices
            </p>
          </div>
          <Switch
            checked={currentBusiness.allowNegotiation}
            onCheckedChange={(checked) =>
              updateCurrentBusiness({ allowNegotiation: checked })
            }
            className="data-[state=checked]:bg-[#05BBC8] data-[state=unchecked]:bg-gray-600 border border-gray-400"
          />
            </div>
            <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-white">
              Delivery Available
            </h4>
            <p className="text-sm text-gray-400">
              Offer delivery services from this branch
            </p>
          </div>
          <Switch
            checked={currentBusiness.deliveryAvailable}
            onCheckedChange={(checked) =>
              updateCurrentBusiness({ deliveryAvailable: checked })
            }
            className="data-[state=checked]:bg-[#05BBC8] data-[state=unchecked]:bg-gray-600 border border-gray-400"
          />
            </div>
          </div>
        </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Working Hours - {currentBranch.name}
          </h3>
          <div className="space-y-3">
            {Object.entries(currentBranch.workingHours).map(
          ([day, hours]) => (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-20 text-sm text-gray-300">{day}</div>
              <Checkbox
            checked={!hours.closed}
            onCheckedChange={(checked) =>
              updateWorkingHours(day, "closed", !checked)
            }
            className="border-gray-400 text-[#05BBC8] data-[state=checked]:bg-[#05BBC8] data-[state=checked]:border-[#05BBC8] data-[state=unchecked]:bg-gray-700"
              />
              {!hours.closed ? (
            <div className="flex items-center space-x-2 flex-1">
              <Input
                type="time"
                value={hours.open}
                onChange={(e) =>
              updateWorkingHours(day, "open", e.target.value)
                }
                className="bg-gray-800 border-gray-700 text-white text-sm"
              />
              <span className="text-gray-400">to</span>
              <Input
                type="time"
                value={hours.close}
                onChange={(e) =>
              updateWorkingHours(day, "close", e.target.value)
                }
                className="bg-gray-800 border-gray-700 text-white text-sm"
              />
            </div>
              ) : (
            <div className="flex-1 text-sm text-gray-500">
              Closed
            </div>
              )}
            </div>
          )
            )}
          </div>
        </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Branch Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-[#05BBC8] text-black">
              {currentBusiness.name.slice(0, 2).toUpperCase() || "BN"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-white">
              {currentBranch.name}
            </h4>
            <p className="text-sm text-gray-400">
              {currentBusiness.category}
            </p>
          </div>
            </div>
            <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-gray-300">
            <MapPin className="w-4 h-4" />
            <span>{currentBranch.city}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Phone className="w-4 h-4" />
            <span>{currentBranch.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Settings className="w-4 h-4" />
            <span>
              {currentBranch.products.length} products/services
            </span>
          </div>
            </div>
            <div className="pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-4 text-sm">
            <Badge
              className={
            currentBusiness.enableBookings
              ? "bg-green-500 text-white"
              : "bg-gray-500 text-white"
              }
            >
              {currentBusiness.enableBookings
            ? "Bookings On"
            : "Bookings Off"}
            </Badge>
            <Badge
              className={
            currentBusiness.deliveryAvailable
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-white"
              }
            >
              {currentBusiness.deliveryAvailable
            ? "Delivery On"
            : "Delivery Off"}
            </Badge>
          </div>
            </div>
          </div>
        </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
          checked={currentBusiness.termsAgreed}
          onCheckedChange={(checked) =>
            updateCurrentBusiness({ termsAgreed: !!checked })
          }
          className="border-gray-400 text-[#05BBC8] data-[state=checked]:bg-[#05BBC8] data-[state=checked]:border-[#05BBC8] data-[state=unchecked]:bg-gray-700"
            />
            <div className="text-sm text-gray-300">
          I agree to Nexa&#39;s{" "}
          <Link
            href="/terms"
            className="text-[#05BBC8] hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-[#05BBC8] hover:underline"
          >
            Privacy Policy
          </Link>
            </div>
          </div>
        </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          What would you like to do next?
        </h2>
        <p className="text-gray-400">
          You can add more businesses, branches, or proceed to launch
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-gray-900 border-gray-700 hover:border-[#05BBC8] transition-all cursor-pointer group">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-[#05BBC8]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#05BBC8]/30 transition-colors">
              <Building className="w-8 h-8 text-[#05BBC8]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Add Another Business
            </h3>
            <p className="text-gray-400 mb-6">
              Set up a completely different business type
            </p>
            <Button
              onClick={addNewBusiness}
              className="w-full bg-[#05BBC8] hover:bg-[#049aa5] text-black font-semibold"
            >
              Add Business
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700 hover:border-[#05BBC8] transition-all cursor-pointer group">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-[#05BBC8]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#05BBC8]/30 transition-colors">
              <Store className="w-8 h-8 text-[#05BBC8]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Add Another Branch
            </h3>
            <p className="text-gray-400 mb-6">
              Expand {currentBusiness.name} to a new location
            </p>
            <Button
              onClick={addNewBranch}
              variant="outline"
              className="w-full border-[#05BBC8] text-[#05BBC8] hover:bg-[#05BBC8]/10"
            >
              Add Branch
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700 hover:border-[#05BBC8] transition-all cursor-pointer group">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-[#05BBC8]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#05BBC8]/30 transition-colors">
              <Sparkles className="w-8 h-8 text-[#05BBC8]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Launch All Businesses
            </h3>
            <p className="text-gray-400 mb-6">
              Go live with all your configured businesses
            </p>
            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-[#05BBC8] to-blue-400 hover:from-[#049aa5] hover:to-blue-500 text-white font-semibold"
            >
              Launch Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold text-white mb-6 text-center">
          Your Business Portfolio
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {onboardingState.businesses.map((business, businessIndex) => (
            <Card key={business.id} className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#05BBC8] text-black">
                        {business.name.slice(0, 2).toUpperCase() || "BN"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">
                        {business.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {business.category}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => switchToBusiness(businessIndex)}
                    className="text-[#05BBC8] hover:text-[#049aa5]"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {business.branches.map((branch) => (
                    <div
                      key={branch.id}
                      className="flex items-center justify-between p-2 bg-gray-800 rounded"
                    >
                      <div>
                        <span className="text-sm font-medium text-white">
                          {branch.name}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">
                          {branch.city}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {branch.isMainBranch && (
                          <Badge className="text-xs bg-[#05BBC8] text-black">
                            Main
                          </Badge>
                        )}
                        <span className="text-xs text-gray-400">
                          {branch.products.length} products
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep7 = () => (
    <div className="text-center space-y-8">
      <div className="w-24 h-24 bg-gradient-to-r from-[#05BBC8] to-blue-400 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-12 h-12 text-white" />
      </div>

      <div>
        <h2 className="text-4xl font-bold text-white mb-4">
          All your businesses are now live on Nexa!
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Congratulations! You&#39;ve successfully set up{" "}
          {onboardingState.businesses.length} business
          {onboardingState.businesses.length !== 1 ? "es" : ""} with{" "}
          {onboardingState.businesses.reduce(
            (total, business) => total + business.branches.length,
            0
          )}{" "}
          total branches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {onboardingState.businesses.map((business) => (
          <Card key={business.id} className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-[#05BBC8] text-black">
                    {business.name.slice(0, 2).toUpperCase() || "BN"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-white">{business.name}</h4>
                  <p className="text-sm text-gray-400">{business.category}</p>
                </div>
                <Badge className="bg-green-100 text-green-800 ml-auto">
                  ✅ Live
                </Badge>
              </div>
              <div className="text-left space-y-2 text-sm text-gray-300">
                <div>
                  Business ID: #NX
                  {Math.random().toString(36).substr(2, 6).toUpperCase()}
                </div>
                <div>Branches: {business.branches.length}</div>
                <div>
                  Total Products:{" "}
                  {business.branches.reduce(
                    (total, branch) => total + branch.products.length,
                    0
                  )}
                </div>
                <div>Status: Active</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <p className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">You would be redirected to your dashboard if you&apos;re logged in or sent to the home page if you&apos;re not logged in</p>
        <Link href="/dashboard" passHref>
          <Button className="bg-[#05BBC8] hover:bg-[#049aa5] text-black font-semibold px-8 py-3">
            <BarChart3 className="w-5 h-5 mr-2" />
            Go to Dashboard or Login
          </Button>
        </Link>
        <Button
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add More Products
        </Button>
      </div>

      <div className="pt-8 border-t border-gray-800">
        <div className="flex items-center justify-center space-x-4 text-gray-400">
          <Share2 className="w-5 h-5" />
          <span>Share your businesses:</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#05BBC8] hover:text-[#049aa5]"
            onClick={() => {
              // Generate shareable links for all businesses
              const baseUrl = window.location.origin;
              const businessLinks = onboardingState.businesses.map(business => 
                `${business.name}: ${baseUrl}/business/${business.id}`
              ).join('\n');
              
              // Copy to clipboard
              navigator.clipboard.writeText(businessLinks)
                .then(() => {
                  // Show toast or notification
                  alert("Business links copied to clipboard!");
                })
                .catch(err => {
                  console.error("Failed to copy links: ", err);
                  // Fallback
                  const textArea = document.createElement("textarea");
                  textArea.value = businessLinks;
                  document.body.appendChild(textArea);
                  textArea.select();
                  document.execCommand("copy");
                  document.body.removeChild(textArea);
                  alert("Business links copied to clipboard!");
                });
            }}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Links
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAccountStep = () => (
    <StepCard
      title="Create your account"
      subtitle="Set up your account to connect with your business"
      icon={<User className="w-6 h-6" />}
    >
      <AccountStep
        fullName={onboardingState.userInfo.fullName}
        email={onboardingState.userInfo.email}
        phone={onboardingState.userInfo.phone}
        password={onboardingState.userInfo.password || ""}
        city={onboardingState.userInfo.city || ""}
        isExistingUser={onboardingState.userInfo.isExistingUser}
        onFieldChange={handleUserFieldChange}
        onToggleExistingUser={toggleExistingUser}
        errors={validationErrors}
      />
    </StepCard>
  );

  const renderCurrentStep = () => {
    // If user is not authenticated and we're on step 1, show the account step
    if (!isAuthenticated && currentStep === 1) {
      return renderAccountStep();
    }
    
    // For authenticated users, adjust the step index
    const adjustedStep = isAuthenticated ? currentStep : currentStep - 1;
    
    switch (adjustedStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      case 7:
        return renderStep7();
      default:
        return renderStep1();
    }
  };

  const canProceed = () => {
    // If we're on the account step and user is not authenticated
    if (!isAuthenticated && currentStep === 1) {
      const { fullName, email, phone, password, isExistingUser } = onboardingState.userInfo;
      
      if (isExistingUser) {
        return !!email && !!password;
      } else {
        return !!fullName && !!email && !!phone && !!password && password.length >= 8;
      }
    }
    
    // Adjust step number for authenticated users
    const adjustedStep = isAuthenticated ? currentStep : currentStep - 1;
    
    switch (adjustedStep) {
      case 1:
        return currentBusiness.type !== "";
      case 2:
        if (onboardingState.isAddingNewBranch) {
          return (
            currentBranch.name &&
            currentBranch.phone &&
            currentBranch.city &&
            currentBranch.address
          );
        }
        return (
          currentBusiness.name &&
          currentBusiness.description &&
          currentBranch.phone &&
          currentBranch.city &&
          currentBranch.address
        );
      case 3:
        return true; // Optional step
      case 4:
        return currentBusiness.heroTitle !== "";
      case 5:
        return currentBusiness.termsAgreed;
      case 6:
        return true;
      case 7:
        return true;
      default:
        return false;
    }
  };

  const updateUserInfo = (updates: Partial<UserInformation>) => {
    setOnboardingState({
      ...onboardingState,
      userInfo: {
        ...onboardingState.userInfo,
        ...updates,
      },
    });
  };

  const handleSignup = async () => {
    if (!auth) return;
    
    try {
      const { fullName, email, phone, password, city } = onboardingState.userInfo;
      
      if (!fullName || !email || !phone || !password) {
        // Display error message
        return;
      }
      
      const result = await auth.register({
        fullName,
        email,
        phone,
        password,
        confirmPassword: password,
        role: 'business',
        city
      });
      
      if (result.success) {
        // Move to next step
        setCurrentStep(currentStep + 1);
      } else {
        // Handle error
        console.error(result.message);
      }
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };

  const handleLogin = async () => {
    if (!auth) return;
    
    try {
      const { email, password } = onboardingState.userInfo;
      
      if (!email || !password) {
        // Display error message
        return;
      }
      
      const result = await auth.login({
        email,
        password
      });
      
      if (result.success) {
        // Update user info state and move to next step
        setOnboardingState(prev => ({
          ...prev,
          userInfo: {
            ...prev.userInfo,
            fullName: auth.user?.fullName || prev.userInfo.fullName,
            email: auth.user?.email || prev.userInfo.email,
            phone: auth.user?.phone || prev.userInfo.phone,
            city: auth.user?.city || prev.userInfo.city,
            isExistingUser: true
          }
        }));
        setCurrentStep(currentStep + 1);
      } else {
        // Handle error
        console.error(result.message);
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <GradientBackground primaryColor="#05BBC8">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md sticky top-0 z-30 border-b border-[#05BBC8]/20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-4 w-full xs:w-auto">
              <Link href="/list-business">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-gray-800/50 p-1 sm:p-2"
                  >
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Back</span>
                  </Button>
                </motion.div>
              </Link>
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center space-x-2 sm:space-x-3"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center">
                    <Image
                    src="/nexa-favicon.png"
                    alt="Nexa Logo"
                    width={28}
                    height={28}
                    className="object-contain w-5 h-5 sm:w-7 sm:h-7"
                    />
                </div>
                <span className="text-sm sm:text-lg md:text-xl font-semibold text-white">
                  Business Setup
                </span>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center space-x-2 sm:space-x-4 w-full xs:w-auto justify-between xs:justify-start"
            >
              <Badge
                variant="outline"
                className="text-[#05BBC8] border-[#05BBC8] text-xs"
              >
                {onboardingState.businesses.length} Business
                {onboardingState.businesses.length !== 1 ? "es" : ""}
              </Badge>
              <span className="text-xs sm:text-sm text-gray-300">
                Step {currentStep} of {totalSteps}
              </span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        {/* Step Indicator */}
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          stepTitles={stepTitles} 
        />

        {/* Step Content */}
        <StepTransitionWrapper transitionKey={currentStep}>
          <div className="mb-12">
            {validationErrors.general && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 rounded-lg bg-red-500/20 text-red-200 border border-red-500/30 mb-6"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{validationErrors.general}</span>
              </motion.div>
            )}
            {renderCurrentStep()}
          </div>
        </StepTransitionWrapper>

        {/* Navigation */}
        {currentStep < 7 && (
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-3 sm:justify-between mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <AnimatedButton
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1 || isLoading}
              isBack
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Previous
            </AnimatedButton>

            <AnimatedButton
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
              isForward
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <span className="mr-2">Loading</span>
                  <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                </div>
              ) : currentStep === 6 ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap">Launch All Businesses</span>
                </>
              ) : (
                <>Continue</>
              )}
            </AnimatedButton>
          </motion.div>
        )}
      </main>
    </GradientBackground>
  );
}
