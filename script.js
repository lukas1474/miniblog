const onFormSubmit = () => {
    const formData = readFormData();
    console.log('formData', formData)
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
        `<div id="two">
            <h2>${dataPost.Title}</h2>
            <p>${dataPost.Text}</p>
            <button onClick="removePost(this)">Delete</button>
        </div>`
    )
    // cellTitle = newRow.insertCell(0)
    // cellTitle.innerHTML = dataPost.Title;
    // cellText = newRow.insertCell(1)
    // cellText.innerHTML = dataPost.Text;
}

const clearForm = () => {
    document.getElementById("title").value = "";
    document.getElementById("text").value = "";
}

const removePost = (post) => {
    row = post.parentElement.parentElement;
    document.getElementById("postList").deleteRow(row.rowIndex);
    clearForm();
}


const data = () => {
    const postList = document.getElementById('post');
    // console.log(postList)
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        // console.log('data', data)
        data.map(function(post){
            postList.insertAdjacentHTML(
                'beforeend', 
                `<div id="two">
                    <h2>${post.title}</h2>
                    <p>${post.text}</p>
                    <button>Delete</button>
                </div>`
            )
        });
    })
}

data();
