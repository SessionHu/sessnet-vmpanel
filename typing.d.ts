import "next-auth"

declare module "next-auth" {
  interface User {
    id: string

    dn42?: DN42Claims
  }

  interface Session {
    user: {
      id: string
      dn42?: DN42Claims
    } & DefaultSession["user"]
  }
}

interface DN42Claims {
  asn: number

  route: string[]
  route6: string[]

  timestamp: number

  active_mnt: string

  telephony?: string[]

  active_name?: string
  active_person?: string
  active_email?: string

  auth_method?: string

  mnt_by?: string[]
}
