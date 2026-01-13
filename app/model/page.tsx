import { getDoorModels } from "@/features/model/actions/door-model"
import ModelPageClient from "./client"

export default async function ModelPage() {
  const models = await getDoorModels()
  return <ModelPageClient initialModels={models} />
}
