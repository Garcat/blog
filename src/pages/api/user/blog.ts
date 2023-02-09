import authOptions from '@/config/authOptions'
import prisma from '@/lib/prisma'
import { BlogSchema } from '@/schemas/Blog'
import Boom from '@hapi/boom'
import { NextApiHandler } from 'next'
import { getServerSession } from 'next-auth/next'
import { ZodError } from 'zod'

const createBlog: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    const { statusCode, message } = Boom.unauthorized().output.payload
    res.status(statusCode).json(message)

    return
  }

  if (!session.user?.email) {
    const { statusCode, message } = Boom.badData().output.payload
    res.status(statusCode).json(message)

    return
  }

  try {
    const { title, description, tags } = BlogSchema.parse(req.body)

    const result = await prisma.blog.create({
      data: {
        title,
        description,
        user: {
          connect: {
            email: session.user.email,
          },
        },
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
      },
    })

    res.status(200).json({
      id: result.id,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted = error.format()
      const { statusCode } = Boom.badData().output.payload
      res.status(statusCode).json(formatted)

      return
    }

    throw error
  }
}

export default createBlog
