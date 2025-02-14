import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

const main = async () =>{
    const alice = await prisma.user.upsert({
      where: { number: "9999999999" },
      update: {},
      create: {
        number: "9999999999",
        name:"alice",
        password:'alice',
        onRampTransaction:{
            create:{
                startime: new Date(),
                status:"Success",
                amount:20000,
                token:"122",
                provider:"HDFC Bank"
            }
        },
      },
    })

    const bob = await prisma.user.upsert({
      where: { number: "8888888888" },
      update: {},
      create: {
        number: "9999999999",
        name:"bob",
        onRampTransaction:{
            create:{
                starTime: new Date(),
                status:"Failed",
                amount:2000,
                token:"123",
                provider:"HDFC Bank"
            }
        }
      },
    });
    console.log({alice,bob})
}
main()
.then(async () =>{
    await prisma.$disconnect()
})
.catch(async (e) =>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})