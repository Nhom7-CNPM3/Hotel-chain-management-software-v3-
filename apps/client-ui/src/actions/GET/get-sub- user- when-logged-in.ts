'use server'

import prisma from "@/lib/prismaDb"
import { cookies } from 'next/headers'

export default async function getSubUserWhenLoggedIn(){
    const admin_id = cookies().get('user_id')?.value 

    const Subuser = await prisma.subUser.findFirst({
        where: {
          id: admin_id,
        },
      });

      return Subuser;
}