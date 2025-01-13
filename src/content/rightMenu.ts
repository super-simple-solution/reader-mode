import '@/style/rightMenu.scss'

export default function rightMenu() {
  // 创建一个按钮元素
  const button = document.createElement('div')
  button.className = 'fixed-button'
  button.classList.add('sss-fixed', 'sss-right-0', 'sss-bg-red-500', 'sss-rounded-full', 'sss-z-20')
  button.textContent = 'Hover me'

  // #fixed-button {
  //   position: fixed;
  //   top: 50%;
  //   right: 0;
  //   transform: translateY(-50%);
  //   background-color: #007bff;
  //   color: white;
  //   border: none;
  //   padding: 10px 20px;
  //   cursor: pointer;
  //   z-index: 1000;
  // }

  // 创建一个下拉菜单
  const dropdown = document.createElement('div')
  dropdown.id = 'dropdown'
  dropdown.innerHTML = `
  <ul>
    <li><a href="#">My Account</a></li>
    <li><a href="#">Profile</a></li>
    <li><a href="#">Billing</a></li>
  </ul>
`

  // 将按钮和下拉菜单添加到页面中
  document.body.appendChild(button)
  document.body.appendChild(dropdown)

  button.addEventListener('click', (event) => {
    event.stopPropagation()
    dropdown.classList.toggle('show')
    dropdown.style.display = dropdown.classList.contains('show') ? 'block' : 'none'
  })

  // 点击页面其他区域时隐藏下拉菜单
  document.addEventListener('click', () => {
    dropdown.classList.remove('show')
    dropdown.style.display = 'none'
  })

  // 阻止下拉菜单内部的点击事件冒泡
  dropdown.addEventListener('click', (event) => {
    event.stopPropagation()
  })
}
