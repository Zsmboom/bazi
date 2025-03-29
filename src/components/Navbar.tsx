'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-white/90 dark:bg-ink-dark/90 shadow-md backdrop-blur-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="bagua-symbol mr-2"></div>
              <span className="text-2xl font-semibold text-earth dark:text-earth">BaZi Calculator</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/" className="text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire px-3 py-2 rounded-md text-sm font-medium">
                首页
              </Link>
              <Link href="/calculator" className="text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire px-3 py-2 rounded-md text-sm font-medium">
                八字计算
              </Link>
              <Link href="/destiny-analysis" className="text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire px-3 py-2 rounded-md text-sm font-medium">
                命运分析
              </Link>
              <Link href="/services" className="text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire px-3 py-2 rounded-md text-sm font-medium">
                专业服务
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {status === 'authenticated' && session ? (
                <div className="flex items-center space-x-3">
                  <div className="text-ink-dark dark:text-paper-white font-medium flex items-center">
                    <FiUser className="mr-1" />
                    <span className="text-sm">
                      {session.user?.name?.split(' ')[0] || '用户'}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <FiLogOut className="mr-1" />
                    退出
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire px-3 py-2 rounded-md text-sm font-medium relative ink-border">
                    登录
                  </Link>
                  <Link href="/register" className="bg-earth hover:bg-earth/80 text-white px-4 py-2 rounded-md text-sm font-medium ml-2">
                    注册
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire block px-3 py-2 rounded-md text-base font-medium">
              首页
            </Link>
            <Link href="/calculator" className="text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire block px-3 py-2 rounded-md text-base font-medium">
              八字计算
            </Link>
            <Link href="/destiny-analysis" className="text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire block px-3 py-2 rounded-md text-base font-medium">
              命运分析
            </Link>
            <Link href="/services" className="text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire block px-3 py-2 rounded-md text-base font-medium">
              专业服务
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {status === 'authenticated' && session ? (
              <div className="px-2 space-y-1">
                <div className="flex items-center px-3 py-2">
                  <div className="text-ink-dark dark:text-paper-white font-medium flex items-center">
                    <FiUser className="mr-1" />
                    <span>{session.user?.name?.split(' ')[0] || '用户'}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <FiLogOut className="mr-1" />
                  退出
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link href="/login" className="text-ink-dark hover:text-fire dark:text-paper-white dark:hover:text-fire block px-3 py-2 rounded-md text-base font-medium">
                  登录
                </Link>
                <Link href="/register" className="bg-earth hover:bg-earth/80 text-white block px-3 py-2 rounded-md text-base font-medium">
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 