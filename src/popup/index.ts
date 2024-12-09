import '@/style/index.scss'
import './index.scss'
import Switcher from './switch'

import { NON_AUTO_KEY } from '@/const'
const switchEle = document.getElementById('switch') as HTMLInputElement

new Switcher(switchEle, NON_AUTO_KEY)
