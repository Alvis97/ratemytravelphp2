import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, userImage, userName, userAge, userPronouns, content } = req.body;

            // Convert age to integer
            const ageInt = parseInt(userAge, 10);

        try {
            const newPost = await prisma.post.create({
                data: {
                    userId,
                    userImage,
                    userName,
                    userAge: ageInt,
                    userPronouns,
                    content,
                },
            });

            res.status(201).json(newPost);
        } catch (error) {
            console.log('Error creating post: ', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method ${req.method} Not allowed');
    }
}