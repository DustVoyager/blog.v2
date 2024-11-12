import { getLatestPostList } from "@/lib/post";
import PostCard from "./PostCard";

interface PostListProps {
  category?: string;
}

const PostListPage = async ({ category }: PostListProps) => {
  const postList = await getLatestPostList(category);

  return (
    <section className="mx-auto my-12 w-full max-w-[800px] px-6">
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {postList.map((post) => (
            <PostCard key={post.url} post={post} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PostListPage;
