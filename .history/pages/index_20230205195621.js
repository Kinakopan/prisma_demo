// pages/index.js
import { prisma } from '../server/db/client'

export default function Home({posts}) {
  return (
    <div>
      <h1>Home</h1>
      {posts.map((post) (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany()

  return {
    props: {
      posts
    }
  }
}
