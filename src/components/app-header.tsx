'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import { ClusterButton, WalletButton } from '@/components/solana/solana-provider'

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  return (
    <header className="relative z-50 px-4 py-3 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50 border-b border-purple-100 dark:border-purple-800/30">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-3 text-xl hover:text-primary transition-colors" href="/">
            <Image 
              src="/third-time-icon-tiny-white.png" 
              alt="Third Time Logo" 
              width={32} 
              height={32}
              className="w-8 h-8"
            />
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Third Time Portfolio
            </span>
          </Link>
          <div className="hidden md:flex items-center">
            <ul className="flex gap-4 flex-nowrap items-center">
              {links.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    className={`hover:text-neutral-500 dark:hover:text-white ${isActive(path) ? 'text-neutral-500 dark:text-white' : ''}`}
                    href={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <div className="hidden md:flex items-center gap-4">
          <WalletButton size="sm" />
          <ClusterButton size="sm" />
          <ThemeSelect />
        </div>

        {showMenu && (
          <div className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-purple-50/95 dark:bg-purple-950/95 backdrop-blur-sm">
            <div className="flex flex-col p-4 gap-4 border-t border-purple-200 dark:border-purple-800">
              <ul className="flex flex-col gap-4">
                {links.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      className={`hover:text-neutral-500 dark:hover:text-white block text-lg py-2  ${isActive(path) ? 'text-neutral-500 dark:text-white' : ''} `}
                      href={path}
                      onClick={() => setShowMenu(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <WalletButton />
                <ClusterButton />
                <ThemeSelect />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
