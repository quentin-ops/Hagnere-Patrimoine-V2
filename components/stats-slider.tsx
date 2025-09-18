"use client"

import { useEffect, useRef, useState } from 'react'
import { 
  Banknote,
  BarChart3,
  Home,
  Calculator,
  Building2,
  ShieldCheck,
  Clock,
  FileText,
  Wallet,
  CreditCard,
  TrendingUp,
  MessageSquare
} from 'lucide-react'

interface StatItem {
  title: string
  icon: React.ComponentType<{ className?: string }>
}

const statsData: StatItem[] = [
  { title: "Financement", icon: Banknote },
  { title: "Investissement", icon: BarChart3 },
  { title: "Immobilier", icon: Home },
  { title: "Fiscalité", icon: Calculator },
  { title: "Patrimoine", icon: Building2 },
  { title: "Assurance", icon: ShieldCheck },
  { title: "Retraite", icon: Clock },
  { title: "Succession", icon: FileText },
  { title: "Épargne", icon: Wallet },
  { title: "Crédit", icon: CreditCard },
  { title: "Placement", icon: TrendingUp },
  { title: "Conseil", icon: MessageSquare }
]

export function StatsSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)
  const animationRef = useRef<number>()
  const isSlowedRef = useRef(false)

  useEffect(() => {
    const animate = () => {
      // Slow down to 20% speed on hover instead of stopping
      const speed = isSlowedRef.current ? 0.05 : 0.25
      setRotation((prev) => (prev - speed + 360) % 360)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const totalCards = statsData.length
  const anglePerCard = 360 / totalCards
  const radius = 420 // Radius of the wheel - optimized for visibility

  return (
    <div
      className="relative w-full h-52 overflow-x-hidden overflow-y-visible py-8"
      onMouseEnter={() => isSlowedRef.current = true}
      onMouseLeave={() => isSlowedRef.current = false}
    >
      <style jsx>{`
        .wheel-3d {
          transform-style: preserve-3d;
          perspective: 1500px;
        }
        
        .card-3d {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        
        .gradient-icon {
          background: linear-gradient(135deg, #1e3a8a 0%, #60a5fa 50%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
      
      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Enhanced gradient masks for depth effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card via-card/80 via-50% to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card via-card/80 via-50% to-transparent z-20 pointer-events-none" />
      
      {/* Top and bottom subtle gradients for 3D effect */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-card/30 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-card/30 to-transparent z-10 pointer-events-none" />
      
      <div className="wheel-3d relative w-full h-full flex items-center justify-center">
        <div 
          ref={containerRef}
          className="absolute left-1/2 top-1/2"
          style={{
            transform: 'translate(-50%, -50%)',
            transformStyle: 'preserve-3d',
          }}
        >
          {statsData.map((stat, index) => {
            const currentAngle = (index * anglePerCard + rotation) % 360
            const angleInRadians = (currentAngle * Math.PI) / 180
            const z = Math.cos(angleInRadians) * radius
            const x = Math.sin(angleInRadians) * radius
            
            // Calculate opacity based on z position (cards in front are more visible)
            const opacity = Math.max(0.4, (z + radius) / (radius * 2))
            
            // Calculate scale based on z position (cards in front are larger)
            const scale = Math.max(0.8, 0.8 + ((z + radius) / (radius * 2) - 0.5) * 0.4)
            
            return (
              <StatCard3D
                key={index}
                stat={stat}
                index={index}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `
                    translate(-50%, -50%)
                    translateX(${x}px) 
                    translateZ(${z}px) 
                    scale(${scale})
                  `,
                  opacity,
                  zIndex: Math.round(z + radius),
                  transition: 'all 0.1s linear'
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StatCard3D({ 
  stat, 
  index,
  style
}: { 
  stat: StatItem
  index: number
  style: React.CSSProperties
}) {

  return (
    <div 
      className="card-3d"
      style={style}
    >
      <div 
        className="w-[180px] h-[90px] rounded-xl p-3 relative overflow-hidden flex flex-col items-center justify-center bg-zinc-950 dark:bg-white ring-1 ring-zinc-900 dark:ring-gray-200 cursor-pointer hover:ring-2 hover:ring-white dark:hover:ring-zinc-900 transition-all duration-200"
      >
        {/* Background halos/blobs */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          {/* Light mode - first blue blob with halo */}
          <span className={`dark:hidden absolute top-[20%] left-[30%] h-[80px] w-[80px] rounded-full ${
            index % 4 === 0 ? 'animate-blobFloat1' : 
            index % 4 === 1 ? 'animate-blobFloat2' : 
            index % 4 === 2 ? 'animate-blobFloat3' : 
            'animate-blobFloat4'
          }`}
            style={{ 
              background: 'radial-gradient(circle at center, rgba(30, 58, 138, 0.9) 0%, rgba(30, 58, 138, 0.6) 30%, rgba(30, 58, 138, 0.3) 60%, transparent 100%)', 
              filter: 'blur(35px)',
              animationDelay: `${index * 0.3}s`
            }} />
          
          {/* Light mode - second blue blob with halo */}
          <span className={`dark:hidden absolute bottom-[20%] right-[30%] h-[70px] w-[70px] rounded-full ${
            index % 4 === 0 ? 'animate-blobFloat3' : 
            index % 4 === 1 ? 'animate-blobFloat4' : 
            index % 4 === 2 ? 'animate-blobFloat1' : 
            'animate-blobFloat2'
          }`}
            style={{ 
              background: 'radial-gradient(circle at center, rgba(30, 58, 138, 0.8) 0%, rgba(30, 58, 138, 0.5) 30%, rgba(30, 58, 138, 0.25) 60%, transparent 100%)', 
              filter: 'blur(35px)',
              animationDelay: `${index * 0.5 + 1}s`
            }} />
          
          {/* Dark mode - first blue blob with halo */}
          <span className={`hidden dark:block absolute top-[20%] left-[30%] h-[80px] w-[80px] rounded-full ${
            index % 4 === 0 ? 'animate-blobFloat1' : 
            index % 4 === 1 ? 'animate-blobFloat2' : 
            index % 4 === 2 ? 'animate-blobFloat3' : 
            'animate-blobFloat4'
          }`}
            style={{ 
              background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.7) 0%, rgba(56, 189, 248, 0.4) 30%, rgba(56, 189, 248, 0.2) 60%, transparent 100%)', 
              filter: 'blur(35px)',
              animationDelay: `${index * 0.3}s`
            }} />
          
          {/* Dark mode - second blue blob with halo */}
          <span className={`hidden dark:block absolute bottom-[20%] right-[30%] h-[70px] w-[70px] rounded-full ${
            index % 4 === 0 ? 'animate-blobFloat3' : 
            index % 4 === 1 ? 'animate-blobFloat4' : 
            index % 4 === 2 ? 'animate-blobFloat1' : 
            'animate-blobFloat2'
          }`}
            style={{ 
              background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.6) 0%, rgba(56, 189, 248, 0.35) 30%, rgba(56, 189, 248, 0.15) 60%, transparent 100%)', 
              filter: 'blur(35px)',
              animationDelay: `${index * 0.5 + 1}s`
            }} />
        </div>
        
        <div className="w-8 h-8 mb-1.5 flex items-center justify-center relative z-10">
          <stat.icon 
            className="w-full h-full text-white dark:text-zinc-900" 
            style={{ 
              strokeWidth: 1.5
            }}
          />
        </div>
        <div className="text-sm font-semibold relative z-10 text-white/80 dark:text-zinc-700">
          {stat.title}
        </div>
      </div>
    </div>
  )
}