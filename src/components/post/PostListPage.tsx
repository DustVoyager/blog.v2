import { getAllPostCount, getCategoryDetailList, getLatestPostList } from "@/lib/post";
import PostCard from "./PostCard";
import CategoryList from "./CategoryList";

interface PostListProps {
  category?: string;
}

const PostListPage = async ({ category }: PostListProps) => {
  const postList = await getLatestPostList(category);
  const allPostCount = await getAllPostCount();
  const categoryDetailList = await getCategoryDetailList();

  return (
    <section className="mx-auto w-full max-w-[800px]">
      <CategoryList
        allPostCount={allPostCount}
        categoryList={categoryDetailList}
        currentCategory={category}
      />
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
