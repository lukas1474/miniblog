const onFormSubmit = () => {
    const formData = readFormData();
    addNewPost(formData);
    clearForm();
}

const readFormData = () => {
    const formData = {};
    formData["Title"] = document.getElementById("title").value;
    formData["Text"] = document.getElementById("text").value;
    return formData
}

const addNewPost = (dataPost) => {
    const postsList = document.getElementById("postList").getElementsByTagName("tbody")[0];
    const newRow = postsList.insertRow(postsList.length)

    newRow.insertAdjacentHTML(
        'beforeend',
        `<div class="posts">
            <div class="post_details">
            <h2>${dataPost.Title}</h2>
            <p>${dataPost.Text}</p>
            <button onClick="removePost(this)">Delete</button>
            </div>
            <div class="votes">
                <p class="votes_p">votes</p>
                <div class="vote_buttons">
                    <div class="button_column">
                        <p id="numberPlus">0</p>
                        <button id="increment" class="vote_button">+</button>
                    </div>
                    <div class="button_column">
                        <p id="numberMinus">0</p>
                        <button id="decrement" class="vote_button">-</button>
                    </div>
                </div>
            </div>
        </div>`
    )
    
    alert('success');
    voting();
}

const clearForm = () => {
    document.getElementById("title").value = "";
    document.getElementById("text").value = "";
}

const removePost = (post) => {
    row = post.parentElement.parentElement;
    document.getElementById('postList').deleteRow(row.rowIndex);
    clearForm();
}

const data = () => {
    const postList = document.getElementById('post');
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        data.map(function(post){
            postList.insertAdjacentHTML(
                'beforeend', 
                `<div id="two" class="archival_post">
                    <h2>${post.title}</h2>
                    <p>${post.text}</p>
                </div>`
            )
        });
    })
}

data();

const voting = () => {
    const allPosts = document.querySelectorAll('.votes');

    for (const singlePost of allPosts) {

        const addVotePlus = singlePost.querySelector('#increment');
        const votesValuePlus = singlePost.querySelector('#numberPlus');
        let valuePlus = 0;
        addVotePlus.addEventListener('click', function() {
            valuePlus += 1;
            votesValuePlus.innerHTML = valuePlus;
        })

        const addVoteMinus = singlePost.querySelector('#decrement');
        const votesValueMinus = singlePost.querySelector('#numberMinus');
        let valueMinus = 0;
        addVoteMinus.addEventListener('click', function() {
            valueMinus += 1;
            votesValueMinus.innerHTML = valueMinus;
        })
    }
}


const addVoteMinus = document.getElementById('decrement');
const votesValueMinus = document.getElementById('numberMinus');
const valueMinus = 0;
