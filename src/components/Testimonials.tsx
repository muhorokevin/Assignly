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
    <section id="testimonials" className="py-20 bg-transparent border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 relative overflow-hidden">
      
      {/* Absolute glow ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-blob" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/45 px-3 py-1 rounded-full">
            Student Reviews
          </span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            Trust by Global Students
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Real feedback from undergraduate, post-graduate, and dissertation students seeking ethical coaching across top international colleges.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            
            {/* Main Interactive Card */}
            <div className="bento-card p-6 sm:p-10 shadow-lg relative min-h-[280px] flex flex-col justify-between">
              
              <div className="absolute top-6 right-8 text-gray-200/60 dark:text-gray-800">
                <Quote className="w-14 h-14 fill-current rotate-180 opacity-40" />
              </div>

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-base sm:text-lg text-gray-700 dark:text-gray-200 italic leading-relaxed">
                  "{testimonials[activeIndex].text}"
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 text-white font-bold flex items-center justify-center text-sm shadow-md">
                    {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      {testimonials[activeIndex].name}
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                      Student @ <strong className="text-gray-700 dark:text-gray-300">{testimonials[activeIndex].university}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-block px-2.5 py-1 text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-full">
                    {testimonials[activeIndex].subject}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1 font-mono">{testimonials[activeIndex].location}</p>
                </div>
              </div>

            </div>

            {/* Slider Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button 
                onClick={handlePrev}
                className="p-3 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm transition-all cursor-pointer"
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
                        ? 'bg-blue-600 w-6' 
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="p-3 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm transition-all cursor-pointer"
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
