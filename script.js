let sendcht = document.querySelector(".chat-input span");
let text = document.querySelector(".chat-input textarea");
let cbox = document.querySelector(".chatbox"); 

let api_key = "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";
let generateresponse=(ele)=>
{
    let url = "https://api.openai.com/v1/chat/completions";
    let mesele = ele.querySelector("p")
    options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${api_key}`
        },
        body:JSON.stringify(
        {
                     "model": "gpt-3.5-turbo",
                  "messages": [{"role": "user", "content": `${text.value}`}]
        }
        )
    }

    fetch(url,options).then(value=> value.json()
    ).then(value2=>
    {
        mesele.textContent =value2.choices[0].message.content;
    }).catch(err=>
    {
        console.log(err);
    })

}
let printonscreen=(a,b)=>
{
    let element = document.createElement("li")
    element.classList.add("chat",b);
    let message = (b=="outgoing")?`<p>${a}</p>`:`<span class = material-symbols-outlined>smart_toy</span><p>${a}</p>`;
    element.innerHTML = message;
    return element;
}
let sendbutton=()=>
{
    let t = text.value;
    if(t)
    {
        cbox.append(printonscreen(t,"outgoing"));
    }

    setTimeout(()=>
    {
        let thinking_ele = printonscreen("Thinking.....","incoming");
        cbox.append(thinking_ele);
        generateresponse(thinking_ele);
    },500)

}
sendcht.addEventListener("click",sendbutton);
