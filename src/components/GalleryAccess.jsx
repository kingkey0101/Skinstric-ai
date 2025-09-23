import React from 'react'
import RotatingStack from './RotatingStack'
import { Link } from 'react-router-dom'
import gallery from "../assets/gallery.png";
import allow from '../assets/allow.png'

const GalleryAccess = () => {
  return (
    <div>
        {/* Gallery - right side */}
      <div className="flex items-center justify-center h-screen w-1/2">
        <div className="relative ">
          <div className="transform scale-50 origin-center">
            <RotatingStack />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative inline-block mb-32">
              <Link>
                <img src={gallery} alt="camera" />
                <img
                  src={allow}
                  alt="scan"
                  className="absolute right-full ml-4 bottom-0-0 -translate-y-1/3 w-[200px] h-auto pointer-events-none scale-150"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryAccess
