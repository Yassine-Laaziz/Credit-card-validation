export const limit = (queryClass, state, setter, theLimit) => {
    let data
    if (state === undefined) state = '' //to trick useStates rendering method

    if ( document.querySelector(queryClass).nodeName === 'INPUT'){
        data = document.querySelector(queryClass).value 
        data.length <= theLimit ? setter(data) : document.querySelector(queryClass).value = state
    }else{
        data = document.querySelector(queryClass).innerText 
        data.length <= theLimit ? setter(data) : document.querySelector(queryClass).innerText = state
    }
}   

// Still Creating
export const limitValue = (queryClass, state, setter, max, min) => {
    let data
    if (state === undefined) state = 0 //to trick useStates rendering method

    if ( document.querySelector(queryClass).nodeName === 'INPUT'){
        data = document.querySelector(queryClass).value 
        data <= max && data >= min ? setter(data) : document.querySelector(queryClass).value = state
    }else{
        data = document.querySelector(queryClass).innerText 
        data <= max && data >= min ? setter(data) : document.querySelector(queryClass).innerText = state
    }
}


//the full name of the completed version of this method will be "addShrink"
export const addSmallShrink = (queryClass) => {
    const box = document.querySelector(queryClass)
    let total = 200

    for(let i = 0; i < box.innerText.length ; i++ ){
        if ( i < 50 ) total -= 2.5
        else if ( i >= 50 && i < 80 ) total -= 0.5
    }
    box.style.fontSize = `${total}%`
}

export const addDots = (queryClass, state, setter, theLimit) => {
    if (document.querySelector(queryClass).nodeName === 'INPUT'){
        limit(queryClass, state, setter, theLimit)
        if(document.querySelector(queryClass).value.length >= theLimit) document.querySelector(queryClass).value += '...'
    }else{
        limit(queryClass, state, setter, theLimit)
        if(document.querySelector(queryClass).innerText.length  >= theLimit ) document.querySelector(queryClass).innerText += '...'
    }
}