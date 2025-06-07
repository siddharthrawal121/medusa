import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMediaURL } from '@lib/data/strapi'; // Adjust path as needed

// Define the expected structure of a blog post prop
interface BlogPost {
  id: number; // Or string, depending on your Strapi ID type
  attributes: {
    title: string;
    slug: string;
    excerpt?: string;
    cover_image?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
          width?: number;
          height?: number;
        };
      };
    };
    publication_date: string; // Assuming ISO date string
    author_name?: string;
  };
}

interface BlogPostCardProps {
  post: BlogPost;
  countryCode: string; // To construct the Link href correctly
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, countryCode }) => {
  const { title, slug, excerpt, cover_image, publication_date, author_name } = post.attributes;
  const imageUrl = cover_image?.data ? getStrapiMediaURL(cover_image) : null;
  const imageAttrs = cover_image?.data?.attributes;

  // Format date (basic example)
  const formattedDate = new Date(publication_date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/${countryCode}/blog/${slug}`} passHref>
      <div className="block border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {imageUrl && imageAttrs && (
          <div className="relative w-full h-48 sm:h-56 md:h-64"> {/* Responsive height */}
            <Image
              src={imageUrl}
              alt={imageAttrs.alternativeText || `Cover image for ${title}`}
              layout="fill"
              objectFit="cover" // Or "contain" depending on preference
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        <div className="p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 hover:text-primary">
            {title}
          </h3>
          {excerpt && (
            <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-3">
              {excerpt}
            </p>
          )}
          <div className="text-xs sm:text-sm text-gray-500">
            <span>{formattedDate}</span>
            {author_name && (
              <>
                <span className="mx-1">|</span>
                <span>By {author_name}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
