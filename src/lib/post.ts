import { Post, PostMetadata } from "@/types/post";
import dayjs from "dayjs";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const BASE_PATH = "/src/posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export const getPostFilePaths = (category?: string) => {
  const folder = category || "**";
  const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
  return postPaths;
};

const parsePost = async (postPath: string): Promise<Post> => {
  const postAbstract = parsePostAbstract(postPath);
  const postDetail = await parsePostDetail(postPath);

  return {
    ...postAbstract,
    ...postDetail,
  };
};

export const parsePostAbstract = (postPath: string) => {
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
  const dateString = dayjs(grayMatter.date).locale("ko").format("YYYY년 MM월 DD일");

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

export const getPostList = async (category?: string): Promise<Post[]> => {
  const postPaths = getPostFilePaths(category);
  const postList = await Promise.all(postPaths.map((postPath) => parsePost(postPath)));
  return postList;
};

const sortPostList = (postList: Post[]) => {
  return postList.sort((a, b) => (a.date > b.date ? -1 : 1));
};

export const getLatestPostList = async (category?: string) => {
  const postList = await getPostList(category);
  return sortPostList(postList);
};
