"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Info } from "lucide-react";
import Link from "next/link";
import Component from "@/components/ui/retro-grid";

export default function DoubtPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mentor: "",
    doubt: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const mentors = [
    "Vardaan Arora Bhatia",
    "Lalith Srinandan",
    "V. Srikar",
    "Akuldeep J",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.mentor) {
      toast.error("Please select a mentor");
      return;
    }
    if (!formData.doubt.trim()) {
      toast.error("Please describe your doubt");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "We received your doubt! Check your mail inbox for the reply back.",
          {
            duration: 5000,
            style: {
              background: "#1a1a1a",
              color: "#ffffff",
              border: "2px solid #ffffff",
              borderRadius: "8px",
              padding: "16px",
              fontSize: "16px",
            },
          }
        );
        // Reset form
        setFormData({
          name: "",
          email: "",
          mentor: "",
          doubt: "",
        });
      } else {
        toast.error(data.error || "Failed to send your doubt. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center p-4 overflow-hidden">
      {/* Grid Background */}
      <Component
        gridColor="#ff0000"
        showScanlines={true}
        glowEffect={true}
        className="fixed inset-0 w-full h-full"
      />
      
      <div className="relative z-10 w-full max-w-3xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-all duration-300 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
          <span>Back to Home</span>
        </Link>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-red-500/20 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
              Ask Your Doubt
            </h1>
            <p className="text-white/60 text-lg">
              Fill out the form below and we&apos;ll get back to you soon
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div className="group">
              <label htmlFor="name" className="block text-sm font-semibold text-white/90 mb-3 tracking-wide">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your full name"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-3 tracking-wide">
                Your Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Mentor Dropdown */}
            <div className="group">
              <label htmlFor="mentor" className="block text-sm font-semibold text-white/90 mb-3 tracking-wide">
                Select Mentor <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="mentor"
                  name="mentor"
                  value={formData.mentor}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer"
                >
                  <option value="" className="bg-black text-white">-- Select a mentor --</option>
                  {mentors.map((mentor) => (
                    <option key={mentor} value={mentor} className="bg-black text-white">
                      {mentor}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Doubt Field */}
            <div className="group">
              <div className="flex items-center gap-3 mb-3">
                <label htmlFor="doubt" className="block text-sm font-semibold text-white/90 tracking-wide">
                  Doubt <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <Info size={16} />
                  </button>
                  {showInfo && (
                    <div className="absolute left-0 top-6 bg-black/95 backdrop-blur-xl border border-white/20 p-3 rounded-lg shadow-xl z-10 w-64 animate-in fade-in slide-in-from-top-2">
                      <p className="text-xs text-white/80 leading-relaxed">
                        Describe your doubt in a crisp and clear manner.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <textarea
                  id="doubt"
                  name="doubt"
                  value={formData.doubt}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none backdrop-blur-sm"
                  placeholder="Describe your doubt here in detail..."
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group relative px-8 py-5 bg-white text-black font-bold text-base uppercase tracking-wider rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

