// Post
var igFeed = document.querySelector('.instagramFeed');
var hashtag = igFeed.getAttribute('data-hashtag');

var showIgOnPost = function(){
    fetch(`${window.location.origin}/api/posts/${postId}`)
    .then((res) => res.json())
    .then(function(data){
        const parsedData = JSON.parse(data.post.igcontent);
        const igLink = 'https://instagram.com/';
        let igPosts = '';
        
        parsedData.forEach(function(e){
            igPosts +=`
                <article>
                    <a href="${igLink}${e.user.username}">
                        <header>
                            <img src="${e.user.profile_picture}">
                            <div>
                                <p>${e.user.username}</p>
                                <p>${e.location.name}</p>
                            </div>
                        </header>
                    </a>
                    <img src="${e.images.standard_resolution.url}">
                    <p>${e.caption.text}</p>
                </article>
            `;
        });
        
        igFeed.innerHTML = igPosts;
    });
};

if(hashtag){
    showIgOnPost();
}