export type PatternData = {
  domain: string
  selector: string[]
  updated_at: string | null
  test_url: string
}

export interface FocusConfig {
  reader_mode: boolean
  center: boolean
  font_family: string
}
