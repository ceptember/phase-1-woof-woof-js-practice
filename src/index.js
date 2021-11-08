let dogBar = document.getElementById('dog-bar'); 
let dogInfo = document.getElementById('dog-info'); 
let fetchUrl = 'http://localhost:3000/pups'

function showDogs(){
    dogBar.innerHTML='doggo'
    fetch(fetchUrl)
        .then(resp => resp.json())
        .then(data => {
            for (let dog of data){
                let dogSpan = document.createElement('span'); 
                let buttonTxt = ""; 
                let goodBtn = document.createElement('button'); 
                let good = dog.isGoodDog; 
                function goodBtnFunct(){
                
                if (good){
                    buttonTxt = 'Good Dog!'
                }
                else {
                    buttonTxt = 'Bad Dog!'
                }
                goodBtn.textContent = buttonTxt; 
                    dogInfo.appendChild(goodBtn); 
            }

                dogSpan.textContent = dog.name; 
                dogSpan.addEventListener('click', () => {
                    dogInfo.innerHTML = `
                    <img src="${dog.image}" />
                    <h2> ${dog.name} </h2>`

                    
                    goodBtnFunct(); 
                    

                    document.querySelector('#dog-info button').addEventListener('click', () => {
                        let fetchObj = {
                            method: 'PATCH',
                            headers: {
                                "Content-Type": "application/json", 
                                Accept: "application/json"
                            },
                            body: JSON.stringify(
                                {
                                   
                                    isGoodDog: !good
                                }
                            )
                        }
                        fetch(`${fetchUrl}/${dog.id}`, fetchObj)
                            .then(patchResp => patchResp.json())
                            .then(patchData => {
                                good = !good; 
                                goodBtnFunct()
                                console.log("good? "+patchData.isGoodDog)}) 
                    
                        
                    })
                })

                dogBar.appendChild(dogSpan); 

            }

        })
}


document.addEventListener('DOMContentLoaded', showDogs)