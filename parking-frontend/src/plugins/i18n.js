import { createI18n } from 'vue-i18n'
import { messages } from '@/locale/messages'

const i18n = createI18n({
    locale: 'br',
    fallbackLocale: 'en',
    messages,
    legacy: false,
})

export default i18n
