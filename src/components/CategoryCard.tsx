import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  count: number;
  gradient: string;
  icon: React.ReactNode;
}

export function CategoryCard({ title, description, href, count, gradient, icon }: CategoryCardProps) {
  return (
    <Link href={href} className="group block">
      <div
        className={`relative rounded-2xl p-6 h-52 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${gradient}`}
      >
        {/* Background decoration */}
        <div className="absolute -right-4 -bottom-4 text-white/10 text-[120px] leading-none select-none pointer-events-none group-hover:text-white/20 transition-colors duration-300">
          {icon}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="text-4xl">{icon}</div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-white/70 text-sm">{description}</p>
            <p className="mt-2 text-white/90 text-sm font-semibold">{count} objekt →</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
