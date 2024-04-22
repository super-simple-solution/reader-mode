import './style.scss'
import Switcher from './switch'
import { DetectTrigger } from '@/lib/detect'

const detectEle = document.querySelector('.detect') as HTMLElement
const cancelEle = document.querySelector('.cancel') as HTMLElement

new DetectTrigger(detectEle, cancelEle)

import { NON_AUTO_KEY } from '@/const'
const switchEle = document.getElementById('switch') as HTMLInputElement

new Switcher(switchEle, NON_AUTO_KEY)
