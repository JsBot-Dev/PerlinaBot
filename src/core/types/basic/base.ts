export interface PerlinaBotUser {
    user_id: string
    nickname?: string
    sex?: string
    age?: number
}
export interface PerlinaBotGroup {
    group_id: string
    group_name?: string
}
export type Platform = 'SnowLuma'
export interface PerlinaBotPlatform {
    type: Platform | (string & {})
    name: string
}
export type PerlinaBotSession =
    | {
          type: 'Group'
          group: PerlinaBotGroup
      }
    | {
          type: 'Private'
          user: PerlinaBotUser
      }
