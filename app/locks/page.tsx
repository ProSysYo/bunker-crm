
import LockPageClient from "./client"
import { getLocks } from "@/features/locks/actions"

export default async function LocksPage() {
  const locks = await getLocks()
  return <LockPageClient locks={locks} />
}
