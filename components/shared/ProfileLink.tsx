import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  imgUrl: string
  title: string
  href?: string
}

const ProfileLink = ({ imgUrl, title, href }: Props) => {
  return (
    <div className='flex justify-center gap-1'>
      <Image src={imgUrl} alt='icon' width={20} height={20} />
      {href ? (
        <Link href={href} className='text-blue-600 font-medium'>
          {title}
        </Link>
      ) : (
        <p className='text-light-400 font-medium'>{title}</p>
      )}
    </div>
  )
}

export default ProfileLink
