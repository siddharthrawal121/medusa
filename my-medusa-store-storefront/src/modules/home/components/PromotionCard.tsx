import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMediaURL } from '@lib/data/strapi'; // Adjust path as needed

// Define the expected structure of a promotion prop
interface Promotion {
  id: number; // Or string
  attributes: {
    title: string;
    description?: string;
    link_url?: string;
    image?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
          width?: number;
          height?: number;
        };
      };
    };
    // is_active is used for filtering in strapi.ts, might not be needed here directly
  };
}

interface PromotionCardProps {
  promotion: Promotion;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ promotion }) => {
  const { title, description, link_url, image } = promotion.attributes;
  const imageUrl = image?.data ? getStrapiMediaURL(image) : null;
  const imageAttrs = image?.data?.attributes;

  const content = (
    <div className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {imageUrl && imageAttrs && (
        <div className="relative w-full h-56 sm:h-64 md:h-72 bg-gray-100"> {/* Added bg for placeholder */}
          <Image
            src={imageUrl}
            alt={imageAttrs.alternativeText || title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 group-hover:text-primary">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-3">
            {description}
          </p>
        )}
      </div>
    </div>
  );

  if (link_url) {
    // Check if it's an external link
    const isExternal = link_url.startsWith('http://') || link_url.startsWith('https://');
    if (isExternal) {
      return (
        <a href={link_url} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      );
    }
    return (
      <Link href={link_url} passHref>
        <div className="block">{content}</div>
      </Link>
    );
  }

  return <div className="block">{content}</div>; // Non-clickable if no link_url
};

export default PromotionCard;
