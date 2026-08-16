export async function generateOgImage(title: string, category: string): Promise<string> {
  const encodedTitle = encodeURIComponent(title)
  const encodedCategory = encodeURIComponent(category)
  return `/api/og?title=${encodedTitle}&category=${encodedCategory}`
}