import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  subject: string;
  university: string;
  text: string;
  rating: number;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: "Olivia Reynolds",
      location: "United States (Boston)",
      subject: "Nursing & Public Health",
      university: "Northeastern University",
      text: "The clinical research blueprints and draft reviews from Assignly saved me when revising my community nursing syllabus project. They didn't do it for me—the 1-on-1 tutoring helped me actually explain the statistical research data with absolute confidence.",
      rating: 5
    },
    {
      name: "Marcus Adebayo",
      location: "United Kingdom (London)",
      subject: "Computer Science & IT",
      university: "University College London (UCL)",
      text: "As a working student with coding assignments, getting architecture models and guidance on my cybersecurity parameters saved me. The tutor explained the database errors line-by-line via WhatsApp support inside basic, easy-to-use layouts.",
      rating: 5
    },
    {
      name: "Aarav Sharma",
      location: "India (New Delhi)",
      subject: "Data Science & Statistics",
      university: "Indian Institute of Technology (IIT)",
      text: "Excellent and fast explanation of complex regression models and R-script parameters. The pricing was surprisingly affordable and translated perfectly to INR. Highly recommend their tutors for mathematical coaching.",
      rating: 5
    },
    {
      name: "Chloe Tremblay",
      location: "Canada (Montreal)",
      subject: "Business Administration",
      university: "McGill University",
      text: "I was struggling with the reference formatting guidelines and qualitative business case outlines for my final dissertation chapter. The senior coach mapped out a detailed table of contents and milestone checklist that made it effortless.",
      rating: 5
    },
    {
      name: "Fatimah Al-Mansoori",
      location: "United Arab Emirates (Dubai)",
      subject: "Finance & Accounting",
      university: "American University in Dubai",
      text: "Very reliable and highly confidential support. I was matched with an doctoral tutor who held two extensive mentoring sessions clarifying accounting matrices. Totally helped improve my understanding ahead of final assessments.",
      rating: 5
    },
    {
      name: "Wycliffe Mwangi",
      location: "Kenya (Nairobi)",
      subject: "Economics & Public Policy",
      university: "University of Nairobi",
      text: "Affordable global academic support options that accept KES safely. The econometric modeling assistance helped clarify complex regression functions for my final year group project. Transparent, fast, and helpful.",
      rating: 5
    }
  ];

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-transparent border-b border-[#e7e5e4] transition-colors duration-300 relative overflow-hidden">
      
      {/* Absolute glow ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#022c22]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-black tracking-widest text-[#022c22] bg-[#022c22]/10 border border-[#022c22]/20 px-3.5 py-1.5 rounded-full">
            Student Reviews
          </span>
          <h2 className="mt-4 font-display font-black text-3xl sm:text-4xl text-[#022c22]">
            Trusted by Global Students
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#022c22]/80 font-bold">
            Real feedback from undergraduate, post-graduate, and dissertation students seeking ethical coaching across top international colleges.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            
            {/* Main Interactive Card */}
            <div className="bg-[#FDFBF7] border-2 border-[#e7e5e4] p-6 sm:p-10 rounded-3xl shadow relative min-h-[280px] flex flex-col justify-between">
              
              <div className="absolute top-6 right-8 text-[#022c22]/10">
                <Quote className="w-14 h-14 fill-current rotate-180 opacity-20" />
              </div>

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-[#d97706] text-[#d97706]" />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-base sm:text-lg text-[#022c22] italic font-bold leading-relaxed">
                  "{testimonials[activeIndex].text}"
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="mt-8 pt-6 border-t border-[#e7e5e4] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#022c22] text-[#FDFBF7] font-black flex items-center justify-center text-sm shadow border border-[#d97706]/20">
                    {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#022c22] flex items-center gap-1.5">
                      {testimonials[activeIndex].name}
                      <CheckCircle className="w-4 h-4 text-[#022c22]/80 shrink-0" />
                    </h4>
                    <p className="text-[11px] text-[#022c22]/70 font-extrabold">
                      Student @ <strong className="text-[#022c22]">{testimonials[activeIndex].university}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-block px-3 py-1 text-[10px] font-black bg-[#022c22]/10 border border-[#022c22]/20 text-[#022c22] rounded-full">
                    {testimonials[activeIndex].subject}
                  </span>
                  <p className="text-[10px] text-[#022c22]/60 mt-1.5 font-mono font-bold">{testimonials[activeIndex].location}</p>
                </div>
              </div>

            </div>

            {/* Slider Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button 
                onClick={handlePrev}
                className="p-3 bg-[#FDFBF7] border-2 border-[#e7e5e4] hover:border-[#022c22]/40 text-[#022c22] rounded-full shadow-sm transition-all cursor-pointer hover:bg-[#f4f4f0]"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      activeIndex === i 
                        ? 'bg-[#022c22] w-6' 
                        : 'bg-[#e7e5e4]'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="p-3 bg-[#FDFBF7] border-2 border-[#e7e5e4] hover:border-[#022c22]/40 text-[#022c22] rounded-full shadow-sm transition-all cursor-pointer hover:bg-[#f4f4f0]"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
