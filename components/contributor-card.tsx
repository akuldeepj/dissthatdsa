
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ContributorProps {
  name: string;
  imageUrl: string;
  linkedinUrl: string;
}

export function ContributorCard({ name, imageUrl, linkedinUrl }: ContributorProps) {
  return (
    <Link 
      href={linkedinUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center p-4 z-50 cursor-pointer w-full"
      >
        <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden bg-zinc-800 ring-2 ring-zinc-700 hover:ring-white transition-all">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex flex-col items-center z-50 mt-3">
          <h3 className="text-base md:text-xl font-semibold text-zinc-100 text-center">{name}</h3>
          
          {/* <div className="flex items-center gap-2 mt-2">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-full bg-zinc-800 hover:bg-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 text-zinc-100" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.div>
          </div> */}
        </div>
      </motion.div>
    </Link>
  );
}
