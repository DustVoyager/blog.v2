import { MdxComponents } from "../mdx";
import { Post } from "@/types/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import a11yEmoji from "@fec/remark-a11y-emoji";
import remarkBreaks from "remark-breaks";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

interface Props {
  post: Post;
}

const rehypeOptions = {
  theme: "dark-plus",
};

export const PostBody = ({ post }: Props) => {
  return (
    <MDXRemote
      source={post.content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, a11yEmoji, remarkBreaks],
          rehypePlugins: [[rehypePrettyCode, rehypeOptions], rehypeSlug],
        },
      }}
      components={MdxComponents}
    />
  );
};
