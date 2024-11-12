import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import { CalendarDays, Clock3 } from "lucide-react";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <li className="overflow-hidden rounded-md border border-gray-200 shadow-md transition hover:shadow-xl">
      <Link href={post.url} className="flex flex-col h-full">
        <figure className="relative aspect-video w-full border-b border-gray-200">
          <Image
            src={post.thumbnail}
            alt={`${post.title}에 대한 이미지 입니다.`}
            sizes="(max-width: 1000px) 50vw, 350px"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </figure>
        <section className="flex-1 flex flex-col justify-between p-4">
          <span className="text-sm font-medium text-blue-600 lg:text-base">
            {post.categoryPublicName}
          </span>
          <h2 className="mb-3 mt-1 text-lg font-bold sm:text-xl md:text-lg">
            {post.title}
          </h2>
          <div className="flex justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-3.5" />
              <time>{post.dateString}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock3 className="w-3.5" />
              <span>{post.readingMinutes}분</span>
            </div>
          </div>
        </section>
      </Link>
    </li>
  );
};

export default PostCard;
