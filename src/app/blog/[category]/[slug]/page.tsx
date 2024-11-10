import { PostHeader } from "@/components/post/PostHeader";
import { PostBody } from "@/components/post/PostBody";
import { getPostFilePaths, parsePostAbstract, getPostDetail } from "@/lib/post";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  const postPaths: string[] = getPostFilePaths();
  const postAbstract = postPaths.map((path) => parsePostAbstract(path));
  const paramList = postAbstract.map((item) => ({
    category: item.categoryPath,
    slug: item.slug,
  }));

  return paramList;
}

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
