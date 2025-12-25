import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Send, Check, Building2, AlertCircle, Target, Layers, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

interface FormData {
  // Step 1 - Business Identity
  businessName: string;
  businessType: string;
  businessTypeOther: string;
  location: string;
  yearsInOperation: string;
  mainContactMethod: string;
  
  // Step 2 - Current Problems
  problems: string[];
  problemsOther: string;
  
  // Step 3 - Website Goals
  goals: string[];
  
  // Step 4 - Feature Selection
  featuresBasic: string[];
  featuresInteraction: string[];
  featuresTrust: string[];
  featuresAdvanced: string[];
  
  // Step 5 - Content Readiness
  hasPhotos: string;
  hasContent: string;
  socialFacebook: string;
  socialInstagram: string;
  socialTiktok: string;
  googleMapsLink: string;
  
  // Step 6 - Contact Details
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  preferredContact: string;
  additionalNote: string;
}

const initialFormData: FormData = {
  businessName: "",
  businessType: "",
  businessTypeOther: "",
  location: "",
  yearsInOperation: "",
  mainContactMethod: "",
  problems: [],
  problemsOther: "",
  goals: [],
  featuresBasic: [],
  featuresInteraction: [],
  featuresTrust: [],
  featuresAdvanced: [],
  hasPhotos: "",
  hasContent: "",
  socialFacebook: "",
  socialInstagram: "",
  socialTiktok: "",
  googleMapsLink: "",
  fullName: "",
  phoneNumber: "",
  emailAddress: "",
  preferredContact: "",
  additionalNote: "",
};

const businessTypes = ["Café / Restaurant", "Salon & Spa", "Clinic / Healthcare", "Event & Decor", "Retail Shop", "Professional Service", "Other"];
const contactMethods = ["Phone Call", "WhatsApp", "Email", "Telegram"];
const yearsOptions = ["Less than 1 year", "1-2 years", "3-5 years", "5-10 years", "10+ years"];

const problemOptions = [
  "Customers don't understand what we offer",
  "We receive too many repetitive questions",
  "People can't find us online",
  "No professional online presence",
  "Difficult to explain prices/services",
  "We rely only on Instagram/WhatsApp",
  "Losing customers to competitors with websites",
  "Other"
];

const goalOptions = [
  "Get more walk-in customers",
  "Get calls or WhatsApp messages",
  "Allow booking / appointments",
  "Show services & prices clearly",
  "Look more professional",
  "Compete with modern businesses",
  "Prepare for future growth",
  "Build trust with new customers"
];

const featuresBasicOptions = [
  "Business introduction page",
  "Services & pricing list",
  "Contact & location info",
  "WhatsApp / Call buttons",
  "Mobile-friendly design"
];

const featuresInteractionOptions = [
  "Contact message form",
  "Appointment booking form",
  "Service inquiry form",
  "WhatsApp chat integration"
];

const featuresTrustOptions = [
  "Photo gallery",
  "Customer testimonials",
  "About the owner/team",
  "Google Map integration",
  "Licenses & certificates",
  "Partners/clients logos"
];

const featuresAdvancedOptions = [
  "Multi-language support",
  "QR code for business",
  "Menu / price list display",
  "Event showcase / portfolio",
  "Social media feed integration",
  "FAQ section"
];

const steps = [
  { id: 1, title: "Business Identity", icon: Building2 },
  { id: 2, title: "Current Problems", icon: AlertCircle },
  { id: 3, title: "Website Goals", icon: Target },
  { id: 4, title: "Features", icon: Layers },
  { id: 5, title: "Content", icon: FileText },
  { id: 6, title: "Contact", icon: User },
];

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof FormData, item: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(item)) {
      updateFormData(field, currentArray.filter(i => i !== item));
    } else {
      updateFormData(field, [...currentArray, item]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.businessType && formData.location && formData.mainContactMethod;
      case 2:
        return formData.problems.length > 0;
      case 3:
        return formData.goals.length > 0;
      case 4:
        return formData.featuresBasic.length > 0 || formData.featuresInteraction.length > 0 || 
               formData.featuresTrust.length > 0 || formData.featuresAdvanced.length > 0;
      case 5:
        return formData.hasPhotos && formData.hasContent;
      case 6:
        return formData.fullName && formData.phoneNumber && formData.emailAddress && formData.preferredContact;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) {
      toast({
        title: "Please complete all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Format all data for email
    const allFeatures = [
      ...formData.featuresBasic,
      ...formData.featuresInteraction,
      ...formData.featuresTrust,
      ...formData.featuresAdvanced,
    ].join(", ");

    const problemsList = formData.problems.includes("Other") 
      ? [...formData.problems.filter(p => p !== "Other"), formData.problemsOther].join(", ")
      : formData.problems.join(", ");

    const businessTypeDisplay = formData.businessType === "Other" 
      ? formData.businessTypeOther 
      : formData.businessType;

    const templateParams = {
      // Business Identity
      business_name: formData.businessName,
      business_type: businessTypeDisplay,
      location: formData.location,
      years_in_operation: formData.yearsInOperation || "Not specified",
      main_contact_method: formData.mainContactMethod,
      
      // Problems & Goals
      current_problems: problemsList,
      website_goals: formData.goals.join(", "),
      
      // Features
      selected_features: allFeatures,
      features_basic: formData.featuresBasic.join(", ") || "None selected",
      features_interaction: formData.featuresInteraction.join(", ") || "None selected",
      features_trust: formData.featuresTrust.join(", ") || "None selected",
      features_advanced: formData.featuresAdvanced.join(", ") || "None selected",
      
      // Content Readiness
      has_photos: formData.hasPhotos,
      has_content: formData.hasContent,
      social_facebook: formData.socialFacebook || "Not provided",
      social_instagram: formData.socialInstagram || "Not provided",
      social_tiktok: formData.socialTiktok || "Not provided",
      google_maps_link: formData.googleMapsLink || "Not provided",
      
      // Contact Details
      full_name: formData.fullName,
      phone_number: formData.phoneNumber,
      email_address: formData.emailAddress,
      preferred_contact: formData.preferredContact,
      additional_note: formData.additionalNote || "No additional notes",
      
      // Meta
      submission_date: new Date().toLocaleString("en-US", { 
        dateStyle: "full", 
        timeStyle: "short" 
      }),
    };

    try {
      await emailjs.send(
        "service_8ngxori",
        "template_vmjrvsk",
        templateParams,
        "SKsjoulP05DEai9Y"
      );

      setIsSubmitted(true);
      toast({
        title: "Project details sent successfully!",
        description: "Emanuel will contact you shortly.",
      });
    } catch (error: unknown) {
      const err = error as any;
      const status = err?.status ?? err?.response?.status;
      const text = err?.text ?? err?.message ?? String(err);
      const origin = typeof window !== "undefined" ? window.location.origin : "unknown";

      // Don't log user form details (PII); only log EmailJS failure metadata.
      console.error("EmailJS Error:", { status, text, origin });

      toast({
        title: "Something went wrong",
        description: import.meta.env.DEV
          ? `Email sending failed (${status ?? "no-status"}): ${text}`
          : "Please try again or contact directly via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (canProceed() && currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (isSubmitted) {
    return (
      <section id="questionnaire" className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-12 h-12 text-neon-cyan" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Thank You, {formData.fullName}!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your project details have been sent successfully.<br />
              I will contact you via {formData.preferredContact} within 24 hours.
            </p>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
              <p className="text-sm text-muted-foreground">
                Project for <span className="text-neon-cyan font-semibold">{formData.businessName}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {formData.goals.length} goals • {[...formData.featuresBasic, ...formData.featuresInteraction, ...formData.featuresTrust, ...formData.featuresAdvanced].length} features selected
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="questionnaire" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 via-transparent to-neon-cyan/5" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-neon-cyan text-sm font-mono tracking-wider uppercase">Start Your Project</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-4">
            Build Your <span className="text-gradient">Business Website</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Answer a few questions about your business, and I'll prepare a custom solution for you.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border">
              <motion.div 
                className="h-full bg-neon-cyan"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Step Indicators */}
            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <motion.div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted 
                        ? "bg-neon-cyan text-background" 
                        : isCurrent 
                          ? "bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan" 
                          : "bg-card border border-border text-muted-foreground"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </motion.div>
                  <span className={`text-xs mt-2 hidden md:block ${isCurrent ? "text-neon-cyan" : "text-muted-foreground"}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Mobile Step Title */}
          <p className="text-center text-sm text-neon-cyan mt-4 md:hidden">
            Step {currentStep}: {steps[currentStep - 1].title}
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Business Identity */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Business Name <span className="text-neon-cyan">*</span>
                    </label>
                    <Input
                      value={formData.businessName}
                      onChange={(e) => updateFormData("businessName", e.target.value)}
                      placeholder="e.g., Cherchis Café"
                      className="bg-background/50 border-border focus:border-neon-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Business Type <span className="text-neon-cyan">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {businessTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updateFormData("businessType", type)}
                          className={`p-3 rounded-lg border text-sm transition-all ${
                            formData.businessType === type
                              ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan"
                              : "bg-background/50 border-border text-muted-foreground hover:border-neon-cyan/50"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    {formData.businessType === "Other" && (
                      <Input
                        value={formData.businessTypeOther}
                        onChange={(e) => updateFormData("businessTypeOther", e.target.value)}
                        placeholder="Please specify your business type"
                        className="mt-3 bg-background/50 border-border focus:border-neon-cyan"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location (Area / Neighborhood) <span className="text-neon-cyan">*</span>
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) => updateFormData("location", e.target.value)}
                      placeholder="e.g., Bole, Addis Ababa"
                      className="bg-background/50 border-border focus:border-neon-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Years in Operation
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {yearsOptions.map((years) => (
                        <button
                          key={years}
                          type="button"
                          onClick={() => updateFormData("yearsInOperation", years)}
                          className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                            formData.yearsInOperation === years
                              ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan"
                              : "bg-background/50 border-border text-muted-foreground hover:border-neon-cyan/50"
                          }`}
                        >
                          {years}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Main Contact Method <span className="text-neon-cyan">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {contactMethods.map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => updateFormData("mainContactMethod", method)}
                          className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                            formData.mainContactMethod === method
                              ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan"
                              : "bg-background/50 border-border text-muted-foreground hover:border-neon-cyan/50"
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Current Problems */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      What challenges are you facing? <span className="text-neon-cyan">*</span>
                    </label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select all that apply
                    </p>
                    <div className="space-y-3">
                      {problemOptions.map((problem) => (
                        <button
                          key={problem}
                          type="button"
                          onClick={() => toggleArrayItem("problems", problem)}
                          className={`w-full p-4 rounded-lg border text-left text-sm transition-all flex items-center gap-3 ${
                            formData.problems.includes(problem)
                              ? "bg-neon-cyan/20 border-neon-cyan text-foreground"
                              : "bg-background/50 border-border text-muted-foreground hover:border-neon-cyan/50"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                            formData.problems.includes(problem)
                              ? "bg-neon-cyan border-neon-cyan"
                              : "border-border"
                          }`}>
                            {formData.problems.includes(problem) && <Check className="w-3 h-3 text-background" />}
                          </div>
                          {problem}
                        </button>
                      ))}
                    </div>
                    {formData.problems.includes("Other") && (
                      <Textarea
                        value={formData.problemsOther}
                        onChange={(e) => updateFormData("problemsOther", e.target.value)}
                        placeholder="Please describe your challenge..."
                        className="mt-3 bg-background/50 border-border focus:border-neon-cyan"
                        rows={3}
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Website Goals */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      What do you want to achieve? <span className="text-neon-cyan">*</span>
                    </label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select your main goals
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {goalOptions.map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => toggleArrayItem("goals", goal)}
                          className={`p-4 rounded-lg border text-left text-sm transition-all flex items-center gap-3 ${
                            formData.goals.includes(goal)
                              ? "bg-neon-cyan/20 border-neon-cyan text-foreground"
                              : "bg-background/50 border-border text-muted-foreground hover:border-neon-cyan/50"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                            formData.goals.includes(goal)
                              ? "bg-neon-cyan border-neon-cyan"
                              : "border-border"
                          }`}>
                            {formData.goals.includes(goal) && <Check className="w-3 h-3 text-background" />}
                          </div>
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Feature Selection */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Basic Presence */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-neon-cyan rounded-full" />
                      Basic Presence
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {featuresBasicOptions.map((feature) => (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => toggleArrayItem("featuresBasic", feature)}
                          className={`p-3 rounded-lg border text-left text-sm transition-all flex items-center gap-3 ${
                            formData.featuresBasic.includes(feature)
                              ? "bg-neon-cyan/20 border-neon-cyan text-foreground"
                              : "bg-background/50 border-border text-muted-foreground hover:border-neon-cyan/50"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            formData.featuresBasic.includes(feature)
                              ? "bg-neon-cyan border-neon-cyan"
                              : "border-border"
                          }`}>
                            {formData.featuresBasic.includes(feature) && <Check className="w-2.5 h-2.5 text-background" />}
                          </div>
                          {feature}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Customer Interaction */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-neon-purple rounded-full" />
                      Customer Interaction
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {featuresInteractionOptions.map((feature) => (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => toggleArrayItem("featuresInteraction", feature)}
                          className={`p-3 rounded-lg border text-left text-sm transition-all flex items-center gap-3 ${
                            formData.featuresInteraction.includes(feature)
                              ? "bg-neon-purple/20 border-neon-purple text-foreground"
                              : "bg-background/50 border-border text-muted-foreground hover:border-neon-purple/50"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            formData.featuresInteraction.includes(feature)
                              ? "bg-neon-purple border-neon-purple"
                              : "border-border"
                          }`}>
                            {formData.featuresInteraction.includes(feature) && <Check className="w-2.5 h-2.5 text-background" />}
                          </div>
                          {feature}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trust & Credibility */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-neon-green rounded-full" />
                      Trust & Credibility
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {featuresTrustOptions.map((feature) => (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => toggleArrayItem("featuresTrust", feature)}
                          className={`p-3 rounded-lg border text-left text-sm transition-all flex items-center gap-3 ${
                            formData.featuresTrust.includes(feature)
                              ? "bg-neon-green/20 border-neon-green text-foreground"
                              : "bg-background/50 border-border text-muted-foreground hover:border-neon-green/50"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            formData.featuresTrust.includes(feature)
                              ? "bg-neon-green border-neon-green"
                              : "border-border"
                          }`}>
                            {formData.featuresTrust.includes(feature) && <Check className="w-2.5 h-2.5 text-background" />}
                          </div>
                          {feature}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-400 rounded-full" />
                      Advanced Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {featuresAdvancedOptions.map((feature) => (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => toggleArrayItem("featuresAdvanced", feature)}
                          className={`p-3 rounded-lg border text-left text-sm transition-all flex items-center gap-3 ${
                            formData.featuresAdvanced.includes(feature)
                              ? "bg-amber-400/20 border-amber-400 text-foreground"
                              : "bg-background/50 border-border text-muted-foreground hover:border-amber-400/50"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            formData.featuresAdvanced.includes(feature)
                              ? "bg-amber-400 border-amber-400"
                              : "border-border"
                          }`}>
                            {formData.featuresAdvanced.includes(feature) && <Check className="w-2.5 h-2.5 text-background" />}
                          </div>
                          {feature}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Content Readiness */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Do you have professional photos? <span className="text-neon-cyan">*</span>
                    </label>
                    <div className="flex gap-3">
                      {["Yes", "No", "Need Help"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateFormData("hasPhotos", option)}
                          className={`px-6 py-3 rounded-lg border text-sm transition-all ${
                            formData.hasPhotos === option
                              ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan"
                              : "bg-background/50 border-border text-muted-foreground hover:border-neon-cyan/50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Do you have text content ready? <span className="text-neon-cyan">*</span>
                    </label>
                    <div className="flex gap-3">
                      {["Yes", "No", "Need Help"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateFormData("hasContent", option)}
                          className={`px-6 py-3 rounded-lg border text-sm transition-all ${
                            formData.hasContent === option
                              ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan"
                              : "bg-background/50 border-border text-muted-foreground hover:border-neon-cyan/50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h3 className="text-sm font-medium text-foreground mb-4">Social Media Links (Optional)</h3>
                    <div className="space-y-3">
                      <Input
                        value={formData.socialFacebook}
                        onChange={(e) => updateFormData("socialFacebook", e.target.value)}
                        placeholder="Facebook page URL"
                        className="bg-background/50 border-border focus:border-neon-cyan"
                      />
                      <Input
                        value={formData.socialInstagram}
                        onChange={(e) => updateFormData("socialInstagram", e.target.value)}
                        placeholder="Instagram profile URL"
                        className="bg-background/50 border-border focus:border-neon-cyan"
                      />
                      <Input
                        value={formData.socialTiktok}
                        onChange={(e) => updateFormData("socialTiktok", e.target.value)}
                        placeholder="TikTok profile URL"
                        className="bg-background/50 border-border focus:border-neon-cyan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Google Maps Link (Optional)
                    </label>
                    <Input
                      value={formData.googleMapsLink}
                      onChange={(e) => updateFormData("googleMapsLink", e.target.value)}
                      placeholder="Paste your Google Maps location link"
                      className="bg-background/50 border-border focus:border-neon-cyan"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 6: Contact Details */}
              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name <span className="text-neon-cyan">*</span>
                    </label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      placeholder="Your full name"
                      className="bg-background/50 border-border focus:border-neon-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number <span className="text-neon-cyan">*</span>
                    </label>
                    <Input
                      value={formData.phoneNumber}
                      onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                      placeholder="+251 9XX XXX XXX"
                      className="bg-background/50 border-border focus:border-neon-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address <span className="text-neon-cyan">*</span>
                    </label>
                    <Input
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) => updateFormData("emailAddress", e.target.value)}
                      placeholder="your@email.com"
                      className="bg-background/50 border-border focus:border-neon-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Preferred Contact Method <span className="text-neon-cyan">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {contactMethods.map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => updateFormData("preferredContact", method)}
                          className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                            formData.preferredContact === method
                              ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan"
                              : "bg-background/50 border-border text-muted-foreground hover:border-neon-cyan/50"
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Notes (Optional)
                    </label>
                    <Textarea
                      value={formData.additionalNote}
                      onChange={(e) => updateFormData("additionalNote", e.target.value)}
                      placeholder="Anything else you'd like me to know about your project..."
                      className="bg-background/50 border-border focus:border-neon-cyan"
                      rows={4}
                    />
                  </div>

                  {/* Summary */}
                  <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Project Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-neon-cyan">{formData.businessName}</span> • {formData.businessType}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.goals.length} goals • {[...formData.featuresBasic, ...formData.featuresInteraction, ...formData.featuresTrust, ...formData.featuresAdvanced].length} features selected
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              {currentStep < 6 ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="gap-2 bg-neon-cyan hover:bg-neon-cyan/90 text-background"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="gap-2 bg-neon-cyan hover:bg-neon-cyan/90 text-background"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Project
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Questionnaire;
