$(function() {
    //NAVIGATION
    ////////////////////////
    
    //More dropdown DESKTOP
    $('#more-desktop').click(function(){
        $('.menu-desktop_dropdown').toggleClass('anime-rotateX');
        $('.layout-header .nav-extended').removeClass('anime-rotateX');
        setTimeout( function(){$('.nav').removeClass('nav--onExtended')}, 50);
    });
    
    //More dropdown MOBILE
    $('#more-mobile').click(function(){
        $('.menu-mobile_dropdown').toggle();
        $('.menu-mobile_dropdown').toggleClass('anime-opacity1');
        $('.layout-footer-mobile .nav-extended').removeClass('anime-rotateX');
        $('.nav').removeClass('nav--onExtended');
    });
    
    //Browse toggle nav-extended DESKTOP
    $('#browse-desktop').click(function(){
        $('.layout-header .nav-extended').toggleClass('anime-rotateX');
        setTimeout( function(){$('.nav').toggleClass('nav--onExtended')}, 50);
        $('.menu-desktop_dropdown').removeClass('anime-rotateX');
    });
    
    //Browse toggle nav-extended MOBILE
    $('#browse-mobile').click(function(){
        $('.layout-footer-mobile .nav-extended').toggleClass('anime-rotateX');
        $('.nav').toggleClass('nav--onExtended');
        $('.menu-mobile_dropdown').removeClass('anime-opacity1');
    });
    
    
    
    //MODAL
    ////////////////////////
    
    //Modal open WHERE
    $('.btn-where').click(function(){
        $('.modal').css('display', 'flex');
    });
    
    //Modal exit
    $('.modal_icon-exit').click(function(){
        $('.modal').css('display', 'none');
    });
    
    
    
    //LIKE
    /////////////////////////
    $('.like').on('click', function(){
        var heart = '<use xlink:href="/images/iconset.svg#heart"/>',
            heartFull = '<use xlink:href="/images/iconset.svg#heart-full"/>',
            icon = $(this).find('.icon'),
            likeCountElement = $(this).find('.likeCount'),
            likeCount = parseInt(likeCountElement.html(), 10),
            postId = $(this).attr('data-post-id'),
            authorId = $(this).attr('data-author-id'),
            category1 = $(this).attr('data-category-1'),
            category2 = $(this).attr('data-category-2'),
            data = {},
            getUrl = window.location;
            
            data.author = authorId;
            data.categories = [category1, category2];

        icon.toggleClass('like--active');
        
        if ( icon.hasClass('like--active') ) {
            icon.html(heartFull);
            likeCount +=1;
            data.like = likeCount;
            likeCountElement.html(likeCount);
            
            $.ajax({
                type: 'PUT',
                url: getUrl+'api/posts/'+ postId,
                data: JSON.stringify(data),
                dataType: "jsonp",                               
                contentType: "application/json",
                success: function() {
                    console.log('Successful put');
                },
                error: function (){
                    console.log('Error put');
                }
            });
        } else {
            icon.html(heart);
            likeCount -=1;
            data.like = likeCount;
            likeCountElement.html(likeCount);
            
            $.ajax({
                type: 'PUT',
                url: getUrl+'api/posts/'+ postId,
                data: JSON.stringify(data),
                dataType: "jsonp",                               
                contentType: "application/json",
                success: function() {
                    console.log('Successful put');
                },
                error: function (){
                    console.log('Error put');
                }
            });
        }
    });
    
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
    
    
    //More button show/hide content-text
    $('.more').append('<svg class="icon"><use xlink:href="/images/iconset.svg#more"/></svg>');
    $('#extendContent').click(function(){
        $(this).prev('.content-text').toggleClass('content--show');
        $(this).prev('.content-text').toggleClass('content--hidden');
        
        if ( $(this).prev('.content-text').hasClass('content--hidden') ){
            $(this).html('More<svg class="icon"><use xlink:href="/images/iconset.svg#more"/></svg>');
        } else {
            $(this).html('Less<svg class="icon"><use xlink:href="/images/iconset.svg#less"/></svg>');
        }
    });
    
    
    //INSTAGRAM API REQUEST
    /////////////////////////////////////////
    var token = '4637254850.0ad8824.b9e53c44aafa463a8bf28efa99fe4545',
        instagramFeed = document.querySelector('.instagramFeed'),
        btn = document.getElementById('instaLoad'),
        count = 4;
    
    if (instagramFeed){
        var hashtag = instagramFeed.getAttribute('data-hashtag'),
            user = instagramFeed.getAttribute('data-instagram-user');
    }
    
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
});