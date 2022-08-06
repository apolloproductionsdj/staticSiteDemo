import React from "react";

function BlogPage() {
  return (
    <div>
      <h2>My Blog # 123</h2>
    </div>
  );
}

export default BlogPage;

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  console.log(posts);

  return { paths: null, fallback: false };
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
