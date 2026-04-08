import React from 'react';
import { ASSETS } from '../../constants/assets';
import { Mail, ArrowRight, ExternalLink, Globe } from 'lucide-react';

export const InfoSection: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-24 space-y-32">
      
      {/* Hero Text */}
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Create organic SVG shapes in just a few seconds.
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
            Morfic is a free generative design tool made with 💕 by z creative labs, to help you quickly create random, unique, and organic-looking SVG shapes.
          </p>
          <a 
            href="https://www.producthunt.com/posts/blobmaker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=142149&theme=dark&period=daily" 
              alt="Morfic - Product Hunt" 
              style={{ width: '250px', height: '54px' }}
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
        
        <div className="space-y-8 text-gray-500 text-lg leading-relaxed">
          <p>
            From landing pages to illustrations, <span className="text-pink-600 font-medium">blobs are everywhere!</span> Creating smooth, organic-looking shapes can be difficult, especially when you need many different ones. Morfic makes it easy to create unique blob shapes based on random data.
          </p>
          <p>
            Modify the complexity (number of points) and contrast (difference between points) to create different types of organic svg shapes. Press that dice button until you find a blob you like and download it as an SVG or copy the code directly to your clipboard.
          </p>
        </div>
      </div>

      {/* Bento Grid / Footer Content */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Newsletter */}
        <div className="bg-gray-50 rounded-[2rem] p-8 space-y-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xl text-gray-900">Newsletter</h3>
          </div>
          <p className="text-sm text-gray-500">Get updates about our latest tools and design resources.</p>
          <div className="space-y-3">
            <input 
              type="email" 
              placeholder="Your email"
              className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all text-sm"
            />
            <button className="w-full py-3 bg-pink-600 text-white font-bold rounded-2xl hover:bg-pink-700 transition-all active:scale-95 shadow-lg shadow-pink-100">
              Subscribe
            </button>
          </div>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-5 h-5">
              <input type="checkbox" className="peer sr-only" />
              <div className="w-5 h-5 bg-white border border-gray-300 rounded-md peer-checked:bg-pink-600 peer-checked:border-pink-600 transition-all" />
              <Check className="absolute inset-0 w-3.5 h-3.5 text-white m-auto opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
            <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Send me updates about z creative labs products</span>
          </label>
        </div>

        {/* More Products */}
        <div className="bg-gray-50 rounded-[2rem] p-8 space-y-8 border border-gray-100">
          <h3 className="font-bold text-xl text-gray-900">More Products</h3>
          <div className="space-y-6">
            <a href="https://getwaves.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <img src={ASSETS.GETWAVES_LOGO} alt="Getwaves" className="w-12 h-12 rounded-xl shadow-sm group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors">getwaves.io</span>
                <span className="text-xs text-gray-500">Create cool wave transitions</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 ml-auto group-hover:text-pink-600 transition-colors" />
            </a>
            <a href="https://geography.games/europe-quiz/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors">Geo Quiz</span>
                <span className="text-xs text-gray-500">Challenge yourself with quizzes</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 ml-auto group-hover:text-pink-600 transition-colors" />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-900 rounded-[2rem] p-8 space-y-6 text-white">
          <h3 className="font-bold text-xl">Contact</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Looking for a creative code + design team for your next project? Let's talk!
          </p>
          <div className="pt-4">
            <a 
              href="mailto:hello@zcreativelabs.com" 
              className="text-2xl font-bold text-pink-500 hover:text-pink-400 transition-colors flex items-center gap-2 group"
            >
              hello@zcreativelabs.com
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

const Check: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
