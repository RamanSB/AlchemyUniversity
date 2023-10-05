export default function BlockPage({ params }: { params: { slug: string } }) {
  return <>{params.slug}</>;
}
