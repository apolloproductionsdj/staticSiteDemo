import React from "react";
import { InferGetStaticPropsType } from "next";

interface Post {
  userId: string;
  id: number;
  title: string;
  body: string;
}

function BlogPage() {
  return (
    <div>
      <h2>My Blog # 123</h2>
    </div>
  );
}

export default BlogPage;

//Step 2 in prebuild process - define how to pull the data for each path
export const getStaticProps: GetStaticProps = async (context) => {
  // ...
  const { params } = context;
};

// Step 1 in the prebuild process
export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  const paths = posts.map((post) => ({
    params: { id: String(post.id) },
  }));

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

// // This function gets called at build time
// export async function getStaticPaths() {
// 	// Call an external API endpoint to get posts
// 	const res = await fetch('https://.../posts')
// 	const posts = await res.json()

// 	// Get the paths we want to pre-render based on posts
// 	const paths = posts.map((post) => ({
// 	  params: { id: post.id },
// 	}))

// 	// We'll pre-render only these paths at build time.
// 	// { fallback: false } means other routes should 404.
// 	return { paths, fallback: false }
//   }
