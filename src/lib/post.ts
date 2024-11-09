import { Post, PostMetadata } from "@/types/post";
import dayjs from "dayjs";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const BASE_PATH = "/src/posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

const parsePost = async (postPath: string): Promise<Post> => {
  const postAbstract = parsePostAbstract(postPath);
  const postDetail = await parsePostDetail(postPath);

  return {
    ...postAbstract,
    ...postDetail,
  };
};

const parsePostAbstract = (postPath: string) => {
  const filePath = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, "")
    .replace(".mdx", "");

  const [categoryPath, slug] = filePath.split("/");
  const url = `/blog/${categoryPath}/${slug}`;
  const categoryPublicName = getCategoryPublicName(categoryPath);

  return { url, categoryPath, categoryPublicName, slug };
};

const parsePostDetail = async (postPath: string) => {
  const file = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(file);

  if (!data.title || !data.date || !data.desc) {
    throw new Error("Invalid post metadata");
  }

  const grayMatter = data as PostMetadata;
  const readingMinutes = Math.ceil(readingTime(content).minutes);
  const dateString = dayjs(grayMatter.date)
    .locale("ko")
    .format("YYYY년 MM월 DD일");

  return { ...grayMatter, dateString, content, readingMinutes };
};

const getCategoryPublicName = (dirPath: string) => {
  return dirPath
    .split("_")
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
};

export const getPostDetail = async (category: string, slug: string) => {
  const filePath = `${POSTS_PATH}/${category}/${slug}/content.mdx`;
  const detail = await parsePost(filePath);
  return detail;
};
