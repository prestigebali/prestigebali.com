import { client } from '@/src/lib/sanity'
import Link from 'next/link'
export const dynamicParams = true
export const revalidate = 60

const query = `
*[
  _type == "tourPackage" &&
  experienceCategory == $category &&
  isActive == true
] | order(_createdAt desc) {
  _id,
  title,
  slug,
  shortDescription,
  duration,
  priceFrom,
  currency
}
`

export default async function ExperiencePage({
  params,
}: {
  params: { slug: string }
}) {
  const packages = await client.fetch(query, {
    category: params.slug,
  })

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold capitalize mb-8">
        {params.slug.replace(/-/g, ' ')}
      </h1>

      {packages.length === 0 && (
        <p>No packages found for this experience.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((item: any) => (
          <Link
            key={item._id}
            href={`/packages/${item.slug.current}`}
            className="border rounded-lg p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-medium mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-3">
              {item.shortDescription}
            </p>
            <p className="text-sm">
              {item.duration} • From {item.currency} {item.priceFrom}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

