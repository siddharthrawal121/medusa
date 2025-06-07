import { getBlogPosts } from '@lib/data/strapi';
import BlogPostCard from '@modules/blog/components/BlogPostCard'; // Adjust path as per your structure
import { Metadata } from 'next';
import { notFound } from 'next/navigation'; // For handling no posts

// Define the expected structure of a blog post, matching BlogPostCard's prop
interface BlogPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt?: string;
    cover_image?: any; // Simplified for brevity, match actual type from strapi.ts or BlogPostCard
    publication_date: string;
    author_name?: string;
  };
}

interface BlogListPageProps {
  params: {
    countryCode: string;
  };
}

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles and insights.',
};

export default async function BlogListPage({ params }: BlogListPageProps) {
  const { countryCode } = params;
  let posts: BlogPost[] = [];

  try {
    const fetchedPosts = await getBlogPosts(); // Fetches { data: [ ... ] }
    if (fetchedPosts && Array.isArray(fetchedPosts)) {
      posts = fetchedPosts;
    } else {
      console.warn("getBlogPosts did not return an array:", fetchedPosts);
    }
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    // Optionally, render an error message to the user
  }

  if (posts.length === 0) {
    // You could return a "No posts found" message or use notFound()
    // For a better user experience, a dedicated message is often preferred over a 404.
    return (
      <div className="content-container py-12">
        <h1 className="text-3xl font-semibold text-center mb-8">Our Blog</h1>
        <p className="text-center text-gray-600">No blog posts available at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="content-container py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Our Blog</h1>
        <p className="text-lg text-gray-600 mt-2">
          Latest articles, insights, and updates.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} countryCode={countryCode} />
        ))}
      </div>
    </div>
  );
}
