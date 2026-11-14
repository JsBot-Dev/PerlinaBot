export type PerlinaBotMessageSegment =
    | { type: 'text'; text: string }
    | { type: 'image'; file: string }
    | { type: 'record'; file: string }
    | { type: 'at'; user_id: string }
    | { type: 'reply'; message_id: string }
    | { type: 'file'; file: string; name?: string }
    | { type: 'unknown'; raw: unknown }
