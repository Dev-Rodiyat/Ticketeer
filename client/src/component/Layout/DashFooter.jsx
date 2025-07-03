import React from 'react'
import { Link } from 'react-router-dom'

const DashFooter = () => {
  return (
    <div className="w-full lg:fixed fixed bottom-0 font-inter bg-orange-100">
    <footer className="relative flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-5 border-t border-slate-500 shadow-sm z-50 transition-all duration-700 ease-in-out ">
        <div className='flex justify-between px-10 w-full'>
            <p>Ticketeer</p>
            <div className='flex justify-between gap-8'>
                <Link to='/contact'><p>Help</p></Link>
                <Link to=''><p>Reviews</p></Link>
                <Link to='/terms-and-conditions'><p>Terms</p></Link>
            </div>
        </div>
    </footer>
  </div>
  )
}

export default DashFooter