
    const slider = document.querySelector('.slider')
    // slider.style.animation='sliderNext 3s ease'
    // slider.style.transform = 'translateX(-100%)'
    const slidesAmount = slider.querySelectorAll('.slide').length
    console.log(slidesAmount)

    let counter = 0
    const interval = setInterval(
        ()=>{
            slider.style.animation='sliderNext 1s ease'
            slider.style.transform = 'translateX(-600px)'
            counter ++
        },
        2000
    )