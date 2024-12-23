import { Header } from '@/components/common/header'
import CurrencyTicker from '@/components/currency'
import CreatePostForm from '@/components/post/create-post.form'

export default function Home() {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-[1080px]">
        <CurrencyTicker />
        <CreatePostForm />
      </div>
    </>
  )
}