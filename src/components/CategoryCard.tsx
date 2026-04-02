import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  count: number;
  gradient: string;
  icon: React.ReactNode;
  image?: string;
}

export function CategoryCard({ title, description, href, count, gradient, icon, image }: CategoryCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative rounded-2xl h-72 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

        {/* Background image with zoom on hover */}
        {image ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url('${image}')` }}
          />
        ) : (
          <div className={`absolute inset-0 ${gradient}`} />
        )}

        {/* Colour tint so the brand palette still shows */}
        <div className={`absolute inset-0 opacity-50 ${gradient}`} />

        {/* Text readability gradient — dark at bottom, fades up */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          {/* Icon badge top-left */}
          <div className="self-start rounded-xl bg-white/15 backdrop-blur-sm p-2.5 text-white shadow-sm">
            {icon}
          </div>

          {/* Title + meta at bottom */}
          <div>
            <h3 className="text-xl font-bold text-white drop-shadow">{title}</h3>
            <p className="text-white/75 text-sm mt-0.5">{description}</p>
            <p className="mt-2 text-white text-sm font-semibold">
              {count} items <span className="opacity-60">→</span>
            </p>
          </div>
        </div>

      </div>
    </Link>
  );
}
