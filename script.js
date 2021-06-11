const onFormSubmit = () => {
    const formData = readFormData();
    addNewPost(formData);
    clearForm();
}

const readFormData = () => {
    const formData = {};
    formData['Title'] = document.getElementById('title').value;
    formData['Text'] = document.getElementById('text').value;
    return formData
}

const voting = () => {
    const allPosts = document.querySelectorAll('.votes');
    for (const singlePost of allPosts) {

        const addVotePlus = singlePost.querySelector('.increment');
        const votesValuePlus = singlePost.querySelector('.numberPlus');
        let valuePlus = 0;
        addVotePlus.addEventListener('click', () => {
            valuePlus += 1;
            votesValuePlus.innerHTML = valuePlus;
        })

        const addVoteMinus = singlePost.querySelector('.decrement');
        const votesValueMinus = singlePost.querySelector('.numberMinus');
        let valueMinus = 0;
        addVoteMinus.addEventListener('click', () => {
            valueMinus += 1;
            votesValueMinus.innerHTML = valueMinus;
        })
    }
}

const addNewPost = (dataPost) => {
    const postsList = document.getElementById('postList').getElementsByTagName('tbody')[0];
    const newRow = postsList.insertRow(postsList.length);

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
                        <p class="numberPlus">0</p>
                        <button class="increment vote_button">+</button>
                    </div>
                    <div class="button_column">
                        <p class="numberMinus">0</p>
                        <button class="decrement vote_button">-</button>
                    </div>
                </div>
            </div>
        </div>`
    );
    
    alert('success');
    voting();
}

const clearForm = () => {
    document.getElementById('title').value = '';
    document.getElementById('text').value = '';
}

const removePost = (post) => {
    row = post.parentElement.parentElement;
    document.getElementById('postList').deleteRow(row.rowIndex);
    clearForm();
}

const data = () => {
    const postList = document.getElementById('post');
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        data.map(function(post){
            postList.insertAdjacentHTML(
                'beforeend', 
                `<div class="old_posts">
                    <div id="two" class="archival_post">
                        <h2>${post.title}</h2>
                        <p>${post.text}</p>
                    </div>
                    <div class="votes">
                        <p class="votes_p">votes</p>
                        <div class="vote_buttons">
                            <div class="button_column">
                                <p class="numberPlus">0</p>
                                <button class="increment" class="vote_button">+</button>
                            </div>
                            <div class="button_column">
                                <p class="numberMinus">0</p>
                                <button class="decrement" class="vote_button">-</button>
                            </div>
                        </div>
                    </div>
                </div>`
            )
        });
    })
    .then(() => voting());
}

data();
