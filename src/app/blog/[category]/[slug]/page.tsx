import { PostHeader } from "@/components/post/PostHeader";
import { PostBody } from "@/components/post/PostBody";
import { getPostDetail } from "@/lib/post";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = await getPostDetail(category, slug);

  return (
    <>
      <PostHeader post={post} />
      <PostBody post={post} />
    </>
  );
}
