import React from "react";
import { GetStaticProps } from "next";

interface Post {
  userId: string;
  id: number;
  title: string;
  body: string;
}

interface Props {
  post: Post;
}

function BlogPage(props: Props) {
  return (
    <div>
      <h1>
        My Blog {props.post.id} by user #{props.post.userId}
      </h1>
      <h2>{props.post.title}</h2>
      <p>{props.post.body}</p>
    </div>
  );
}

export default BlogPage;

//Step 2 in prebuild process - define how to pull the data for each path
export const getStaticProps: GetStaticProps = async (context) => {
  // ...
  const { params } = context;

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params!.id}`
  );
  const post: Post = await res.json();

  return {
    props: {
      post,
    },
  };
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
