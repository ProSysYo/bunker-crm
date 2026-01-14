import { TLockCreate } from "@/features/locks/types/TLock"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const locks:TLockCreate[] = [
    { name: "Г1211", type: "сувальда" },
    { name: "Г1212", type: "сувальда + цилиндр" },
    { name: "Г1213", type: "цилиндр" },
    { name: "Г1214", type: "сувальда + цилиндр" },
    { name: "Г1215", type: "цилиндр + сувальда" },
    
  ]

  for (const lock of locks) {
    await prisma.lock.create({
      data: lock,
    })
  }

  console.log(`Создано ${locks.length} замков`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
