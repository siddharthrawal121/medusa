import { getPolicyPage } from '@lib/data/strapi'; // Adjust path as needed
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Define the expected structure of the Policy Page data
interface StrapiPolicyPage {
  title: string;
  content: string; // Rich text (HTML or Markdown)
  last_updated?: string; // Assuming this field exists as per Strapi setup
  seo_title?: string;
  seo_description?: string;
}

interface PolicyPageProps {
  params: {
    // countryCode is part of the route but might not be used directly in fetching global policy
    countryCode: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  // For single types, getPolicyPage() should return { data: { attributes: { ... } } }
  // or null/error if not found.
  let policyDataContainer;
  try {
    policyDataContainer = await getPolicyPage();
  } catch (error) {
    console.error("Error fetching policy page metadata:", error);
    return { title: "Policy" }; // Default title
  }

  if (!policyDataContainer || !policyDataContainer.attributes) {
    return {
      title: 'Policy Not Found',
    };
  }
  const policy = policyDataContainer.attributes as StrapiPolicyPage;
  return {
    title: policy.seo_title || policy.title,
    description: policy.seo_description || `Last updated: ${policy.last_updated ? new Date(policy.last_updated).toLocaleDateString() : 'N/A'}`,
  };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  let policyDataContainer;
  try {
    policyDataContainer = await getPolicyPage();
  } catch (error) {
    console.error("Error fetching Policy Page content from Strapi:", error);
    // Fallback content or error message if Strapi fetch fails
    return (
      <div className="content-container py-12">
        <h1 className="text-3xl font-semibold text-center mb-8">Our Policy</h1>
        <p className="text-center text-gray-600">
          We encountered an issue loading the content for this page. Please try again later.
        </p>
      </div>
    );
  }

  if (!policyDataContainer || !policyDataContainer.attributes) {
    console.error("Policy Page content not found or attributes missing from Strapi.");
    notFound(); // Triggers the 404 page
  }

  const policy = policyDataContainer.attributes as StrapiPolicyPage;
  const formattedLastUpdated = policy.last_updated
    ? new Date(policy.last_updated).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : null;

  return (
    <div className="content-container py-12">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{policy.title}</h1>
          {formattedLastUpdated && (
            <p className="text-sm text-gray-500">
              Last Updated: {formattedLastUpdated}
            </p>
          )}
        </header>

        <div
          className="prose lg:prose-xl max-w-none mx-auto text-gray-700" // Basic prose styling
          dangerouslySetInnerHTML={{ __html: policy.content || "" }} // Fallback for content
        />
      </article>
    </div>
  );
}
