import Link from "next/link";
import { Post } from "@/types/post";
import { CalendarDays, Clock3 } from "lucide-react";

interface Props {
  post: Post;
}

export const PostHeader = ({ post }: Props) => {
  return (
    <header className="text-center">
      <h1>{post.title}</h1>
      <div>
        <Link href={`/blog/${post.categoryPath}`}>
          {post.categoryPublicName}
        </Link>
      </div>
      <div className="flex">
        <div>
          <CalendarDays />
          <time dateTime={post.date.toISOString()}>{post.dateString}</time>
        </div>
        <div>
          <Clock3 />
          <span>{post.readingMinutes}분</span>
        </div>
      </div>
      <hr />
    </header>
  );
};
