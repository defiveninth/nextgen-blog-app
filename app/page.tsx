import { Header } from '@/components/common/header'
import CreatePostForm from '@/components/post/create-post.form'

export default function Home() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
        <CreatePostForm />
      </div>
    </>
  )
}