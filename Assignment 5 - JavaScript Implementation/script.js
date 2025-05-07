const loginBtn = document.getElementById("login-btn")
const dropdownToggle = document.getElementById("dropdown-toggle")
const dropdownMenu = document.getElementById("dropdown-menu")
const images = ["banana", "monkey", "coffee"]
const prevBtn = document.getElementById("slideshow-prev-btn")
const slideshowImage = document.getElementById("slideshow-image")
const nextBtn = document.getElementById("slideshow-next-btn")
const imageLen = images.length
const resPath = "./assets/"
let currentSlide = 0
setImage(currentSlide)
let toggleState = false
const toggleSlider = document.getElementById("toggleSlider")
const searchBar = document.getElementById("search-bar")
const htmlCodeDiv = document.getElementById("htmlCodeDiv")

function wrap(value) {
  if (value >= imageLen) return imageLen - value
  else if (value < 0) return imageLen - Math.abs(value)
  else return value
}

async function copyCodeToClipboard(code) {
  try {
    await navigator.clipboard.writeText(code)
    console.log("Code copied to clipboard!")
  } catch (err) {
    console.error("Failed to copy code: ", err)
  }
}

function setImage(idx) {
  slideshowImage.setAttribute("src", resPath + images[idx] + ".jpg")
  slideshowImage.setAttribute("alt", images[idx])
}

loginBtn.addEventListener("click", () => {
  console.log("Hello World!")
  alert("A new log has appeared in console.")
})

dropdownToggle.addEventListener("click", () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block"
})

loginBtn.addEventListener("mouseenter", () => {
  loginBtn.style.backgroundColor = "green"
})

loginBtn.addEventListener("mouseleave", () => {
  loginBtn.style.backgroundColor = "grey"
})

prevBtn.addEventListener("click", () => {
  currentSlide -= 1
  currentSlide = wrap(currentSlide)
  setImage(currentSlide)
})

nextBtn.addEventListener("click", () => {
  currentSlide += 1
  currentSlide = wrap(currentSlide)
  setImage(currentSlide)
})

toggleSlider.addEventListener("click", () => {
  toggleState = !toggleState
  if (toggleState) {
    toggleSlider.style.backgroundColor = "#007bff"
    toggleSlider.style.setProperty(
      "--toggle-knob-transform",
      "translateX(26px)"
    )
  } else {
    toggleSlider.style.backgroundColor = "#ccc"
    toggleSlider.style.setProperty("--toggle-knob-transform", "translateX(0)")
  }
})

searchBar.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    alert(`you enter: ${searchBar.value}`)
    searchBar.value = ""
  }
})

htmlCodeDiv.addEventListener("dblclick", () => {
  copyCodeToClipboard(htmlCodeDiv.innerText)
  alert('code copied to clipboard')
})
