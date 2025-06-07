import { getBlogPostBySlug, getBlogPosts, getStrapiMediaURL } from '@lib/data/strapi'; // Adjust path
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// Define the expected structure of a single blog post's attributes
interface BlogPostAttributes {
  title: string;
  slug: string;
  content: string; // Rich text (HTML or Markdown)
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
  publication_date: string;
  author_name?: string;
  seo_title?: string;
  seo_description?: string;
}

interface BlogPost {
  id: number;
  attributes: BlogPostAttributes;
}

interface BlogPostPageProps {
  params: {
    slug: string;
    countryCode: string; // Though not directly used in this simplified version, it's part of the route
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const postContainer = await getBlogPostBySlug(params.slug);

  if (!postContainer || !postContainer.attributes) {
    return {
      title: 'Post Not Found',
    };
  }
  const post = postContainer.attributes;
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    // openGraph: { // Example OpenGraph metadata
    //   title: post.seo_title || post.title,
    //   description: post.seo_description || post.excerpt,
    //   images: post.cover_image?.data?.attributes.url ? [getStrapiMediaURL(post.cover_image)] : [],
    // },
  };
}

// Optional: Generate static paths for blog posts at build time
export async function generateStaticParams({ params }: { params: { countryCode: string }}) {
  // This function needs to return an array of objects, where each object has a `slug` property.
  // It should fetch all blog posts and map them to the required format.
  // Note: `getBlogPosts()` returns { data: [...] }, so access `data`.
  // Ensure your `getBlogPosts` can be called without params or adjust as needed.
  try {
    const postsData = await getBlogPosts(); // Assuming this fetches all posts
    const postsArray = postsData || []; // postsData is already the array of posts

    return postsArray.map((post: BlogPost) => ({
      slug: post.attributes.slug,
      // countryCode will be provided by Next.js based on the path structure
    }));
  } catch (error) {
    console.error("Failed to generate static params for blog posts:", error);
    return []; // Fallback to empty array on error
  }
}


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const postContainer = await getBlogPostBySlug(slug);

  if (!postContainer || !postContainer.attributes) {
    notFound(); // Triggers the 404 page
  }

  const post = postContainer.attributes;
  const imageUrl = post.cover_image?.data ? getStrapiMediaURL(post.cover_image) : null;
  const imageAttrs = post.cover_image?.data?.attributes;

  const formattedDate = new Date(post.publication_date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="content-container py-12">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{post.title}</h1>
          <div className="text-sm text-gray-500">
            <span>Published on {formattedDate}</span>
            {post.author_name && (
              <>
                <span className="mx-1">|</span>
                <span>By {post.author_name}</span>
              </>
            )}
          </div>
        </header>

        {imageUrl && imageAttrs && (
          <div className="relative w-full h-72 sm:h-96 md:h-[500px] mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageUrl}
              alt={imageAttrs.alternativeText || `Cover image for ${post.title}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}

        <div
          className="prose lg:prose-xl max-w-none mx-auto text-gray-700" // Basic prose styling
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
