"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { profileSchema } from '@/lib/validations'
import { usePathname, useRouter } from 'next/navigation'
import { updateUser } from '@/lib/actions/user.action'

type Props = {
  clerkId: string
  user: string
}

const Profile = ({ clerkId, user }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const parsedUser = JSON.parse(user)


  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: parsedUser.username || "",
      name: parsedUser.name || "",
      location: parsedUser.location || "",
      portfolioWebsite: parsedUser.portfolioWebsite || "",
      bio: parsedUser.bio || "",
    }
  })

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      setIsSubmitting(true)
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          location: values.location,
          portfolioWebsite: values.portfolioWebsite,
          bio: values.bio
        },
        path: pathname
      })
      router.back()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-9  w-full gap-9">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name <span className='text-primary-500'>*</span></FormLabel>
              <FormControl>
                <Input placeholder="name.." {...field} className='min-h-[56px]' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username <span className='text-primary-500'>*</span></FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} className='min-h-[56px]' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Location </FormLabel>
              <FormControl>
                <Input placeholder="location" {...field} className='min-h-[56px]' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Portfolio website </FormLabel>
              <FormControl>
                <Input type='url' placeholder="your website" {...field} className='min-h-[56px]' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Bio </FormLabel>
              <FormControl>
                <Textarea placeholder="about you" {...field} className='min-h-[56px]' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-7 flex justify-end'>
          <Button type="submit" disabled={isSubmitting} className='bg-primary-500'>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default Profile
