var token = '4637254850.0ad8824.b9e53c44aafa463a8bf28efa99fe4545',
    instagramFeed = document.getElementById('igForAuthor'),
    btn = document.getElementById('instaLoad'),
    count = 4,
    user = instagramFeed.getAttribute('data-instagram-user');


$(function(){
    

//Author
function loadInstaFeed(){
    if(user){
        $.ajax({
        	url: 'https://api.instagram.com/v1/users/search',
        	dataType: 'jsonp',
        	type: 'GET',
        	data: {access_token: token, q: user},
        	success: function(data){
        	    $.ajax({
        			url: 'https://api.instagram.com/v1/users/' + data.data[0].id + '/media/recent',
        			dataType: 'jsonp',
        			type: 'GET',
        			data: {access_token: token, count: count},
                                	
                    success: function(data2){
        				var start = count - 4;
        				
        				if(start >= data2.data.length){
        				    console.log('no more posts');
        				    btn.style.display = 'none';
        				} else {
        				    for(i = start; i < data2.data.length; i++){
                    		    var dt = data2.data[i],
                    		    user = dt.user.username,
                    		    loc = dt.location.name,
                    		    avatar = dt.user.profile_picture,
                    		    img = dt.images.standard_resolution.url,
                    		    text = dt.caption.text,
                    		    tags = dt.tags,
                    		    state = false;
                    		    
                    		    tags.forEach(function(e){
                    		        if(e === 'sofaban'){
                    		            state = true;
                    		        }
                    		    });
                    		    
                    		    if(state){
                    		        $('.instagramFeed').append('<article><header><img src="'+avatar+'"><div><p>'+user+'</p><p>'+loc+'</p></div></header><img src="'+img+'"><p>'+text+'</p></article>');
                    		    }
                    		}
        				}
            		},
        			error: function(data2){
        				console.log(data2);
        			}
        		});
        	},
        	error: function(data){
        		console.log(data);
        	}
        });
    }
}

loadInstaFeed();

$(btn).on('click', function(){
    var svg = $(this).find('svg');
    svg.addClass('more--loading');
    
    setTimeout(function(){
        count += 4;
        loadInstaFeed();
        svg.removeClass('more--loading');
    }, 800);
});

if(instagramFeed) {
    setTimeout(function(){
        if(instagramFeed.innerHTML === ''){
            console.log('well, its empty');
            
            $('#recentArticles').find('.icon').addClass('icon--active');
            $('#recentArticles').find('p').addClass('item--active');
            
            $('#recentAction').find('.icon').removeClass('icon--active');
            $('#recentAction').find('p').removeClass('item--active');
            
            $('#articlesContent').fadeIn();
            $('#instagramContent').hide();
            
            btn.style.display = 'none';
        }
    }, 2500);
}

//AUTHOR PAGE
//////////////////////////////
    
//Author menu scroll
var authorMenu = document.querySelector('.author_menu');

if ( authorMenu ) {
    var authorMenuTop = document.querySelector('.author_menu').offsetTop;
    
    document.addEventListener( 'scroll', function(){
        var scrolledFromTop = window.scrollY;

        if ( scrolledFromTop >= authorMenuTop ){
            $('.author_menu').addClass('author_menu--scrolled')
        } else {
            $('.author_menu').removeClass('author_menu--scrolled')
        }
    });
}

//Author menu change
$('#recentAction').click(function(){
    $(this).find('.icon').addClass('icon--active');
    $(this).find('p').addClass('item--active');
    
    $('#recentArticles').find('.icon').removeClass('icon--active');
    $('#recentArticles').find('p').removeClass('item--active');
    
    $('#instagramContent').fadeIn();
    $('#articlesContent').hide();
});

$('#recentArticles').click(function(){
    $(this).find('.icon').addClass('icon--active');
    $(this).find('p').addClass('item--active');
    
    $('#recentAction').find('.icon').removeClass('icon--active');
    $('#recentAction').find('p').removeClass('item--active');
    
    $('#articlesContent').fadeIn();
    $('#instagramContent').hide();
});

});