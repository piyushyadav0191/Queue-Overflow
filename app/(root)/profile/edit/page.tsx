import Profile from '@/components/forms/Profile'
import { getUserById } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'

const page = async () => {
  const { userId } = auth()
  if (!userId) return null
  const mongoUser = await getUserById({ userId })

  return (
    <div>
      <h1 className='text-2xl font-bold'>Edit Profile</h1>
      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </div>
  )
}

export default page
