// pages/index.js
import { prisma } from '../server/db/client';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styles from "@/styles/Home.module.css";

// export default function Home({props}) {
export default function Home(props) {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [posts, setPosts] = useState(props.posts)

    useEffect(() => {
      setPosts(props.posts)
    }, [props.posts])

    const handleSubmit = async (e) => {
      e.preventDefault()
      const res = await axios.post('/api/posts', { title, content })
      setPosts([...posts, res.data])
      console.log(res.data)
    }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading1}>TO DO LIST</h1>

      <form
        onSubmit={handleSubmit}
        style={{display: "flex", flexDirection: "column", maxWidth: "400px"}}
        className={styles.form}
        >

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          placeholder="Input a list title"
          />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
          placeholder="Description of the list"
          />

        <button type="submit">Submit</button>
      </form>

      {posts.map((post) => (
        <div
          key={post.id}
          className={styles.postBox}
          >
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    }
  }
}
