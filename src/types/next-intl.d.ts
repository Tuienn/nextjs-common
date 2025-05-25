import messages from '../../messages/en.d.json.ts'

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages
  }
}
