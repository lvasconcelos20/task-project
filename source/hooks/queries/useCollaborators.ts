import { useEffect, useState } from "react"
import { UserEntity } from "@/common/entities/user"

export function useSuggestedCollaborators(count = 5) {
  const [collaborators, setCollaborators] = useState<UserEntity[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchCollaborators() {
      setLoading(true)
      try {
        const res = await fetch(`https://randomuser.me/api/?results=${count}`)
        const data = await res.json()

        const formatted = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
        }))

        setCollaborators(formatted)
      } catch (error) {
        console.error("Erro ao buscar colaboradores:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollaborators()
  }, [count])

  return { collaborators, loading }
}