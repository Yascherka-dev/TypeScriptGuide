import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { sum } from '@/lib/utils.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const btn: HTMLButtonElement = document.createElement('button')
const app: HTMLDivElement | null = document.querySelector<HTMLDivElement>('#app')

app?.appendChild(btn)

btn.textContent = 'Click me'
btn.addEventListener('click', () => {
  const p = document.createElement('p')
  p.textContent = `2 + 3 = ${sum(2, 3)}`
  document.body.appendChild(p)
})

app?.appendChild(btn)
