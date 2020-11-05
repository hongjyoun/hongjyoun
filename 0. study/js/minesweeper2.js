const tagRow = document.getElementById('row')
const tagCol = document.getElementById('col')
const tagMine = document.getElementById('mine')

const tagTable = document.getElementById('table')
const startButton = document.getElementById('button')


startButton.addEventListener('click', ()=>{
  const howManyRow = tagRow.value
  const howManyCol = tagCol.value
  const howManyMine = tagMine.value
  // console.log(howManyRow,howManyCol,howManyMine)

  const fragment = document.createDocumentFragment()
  for (i=0; i<howManyRow; i++) {
    const tr = document.createElement('tr')
    for (j=0; j<howManyCol; j++) {
      const td = document.createElement('td')
      tr.appendChild(td)
    }
    fragment.appendChild(tr)
  }
  
  console.log(tagTable, fragment)
  tagTable.appendChild(fragment)



})
