import { Metadata } from "next";
import { PostHeader } from "@/components/post/PostHeader";
import { PostBody } from "@/components/post/PostBody";
import { getPostFilePaths, parsePostAbstract, getPostDetail } from "@/lib/post";
import { siteUrl } from "@/config/constants";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPostDetail(category, slug);
  const title = `${post.title} | 오수빈 개발 블로그`;
  const imageUrl = `${siteUrl}${post.thumbnail}`;

  return {
    title,
    description: post.desc,
    openGraph: {
      title,
      description: post.desc,
      url: `${siteUrl}${post.url}`,
      type: "article",
      publishedTime: post.date.toISOString(),
      images: [imageUrl],
    },
    twitter: {
      title,
      description: post.desc,
      images: [imageUrl],
    },
  };
}

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
