//Update like state from local storage
var likeIds = document.querySelectorAll('.like');
likeIds.forEach(function(e){
    var postId = e.getAttribute('data-post-id');
    var likeId = 'likeId' + postId;
    var icon = e.querySelector('.icon');
    var getLocalStorageLikeId = localStorage.getItem(likeId);
    
    if( getLocalStorageLikeId !== null ){
        icon.classList.add('like--active');
        icon.innerHTML = '<use xlink:href="/images/iconset.svg#heart-full"/>';
    }
    
});

$(function() {
    //NAVIGATION
    ////////////////////////
    
    //More dropdown DESKTOP
    $('#more-desktop').click(function(){
        $('.menu-desktop_dropdown').toggleClass('anime-rotateX');
        $('.layout-header .nav-extended').removeClass('anime-rotateX');
        setTimeout( function(){$('.nav').removeClass('nav--onExtended')}, 50);
        $('.layout-header .nav-extended').removeClass('state-displayBlock');
    });
    
    //More dropdown MOBILE
    $('#more-mobile').click(function(){
        $('.menu-mobile_dropdown').toggle();
        $('.menu-mobile_dropdown').toggleClass('anime-opacity1');
        $('.layout-footer-mobile .nav-extended').removeClass('anime-rotateX');
        $('.nav').removeClass('nav--onExtended');
        $('.layout-header-mobile .nav-extended').removeClass('state-displayBlock');
    });
    
    //Browse toggle nav-extended DESKTOP
    $('#browse-desktop').click(function(){
        $('.menu-desktop_dropdown').removeClass('anime-rotateX');
        $('.layout-header .nav-extended').toggleClass('state-displayBlock');
        setTimeout( function(){
            $('.layout-header .nav-extended').toggleClass('anime-rotateX');
            $('.nav').toggleClass('nav--onExtended');
        }, 50);
    });
    
    //Browse toggle nav-extended MOBILE
    $('#browse-mobile').click(function(){
        $('.layout-header-mobile .nav-extended').toggleClass('state-displayBlock');
         setTimeout( function(){
            $('.layout-footer-mobile .nav-extended').toggleClass('anime-rotateX');
            $('.nav').toggleClass('nav--onExtended');
        }, 50);
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
            likeId = `likeId${postId}`,
            authorId = $(this).attr('data-author-id'),
            category1 = $(this).attr('data-category-1'),
            category2 = $(this).attr('data-category-2'),
            data = {};
            
            data.author = authorId;
            data.categories = [category1, category2];

        
        icon.toggleClass('like--active');
        
        var updateLikeCount = function(state){
            var originUrl = window.location.origin;

            if( state === 'inc' ){
                icon.html(heartFull);
                likeCount +=1;
                localStorage.setItem(likeId, "active");
            } else if ( state === 'dec' ) {
                icon.html(heart);
                likeCount -=1;
                localStorage.removeItem(likeId, "active");
            }
            
            data.like = likeCount;
            likeCountElement.html(likeCount);
            
            $.ajax({
                type: 'PUT',
                url: `${originUrl}/api/posts/${postId}`,
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
        };
        
        if ( icon.hasClass('like--active') ) {
            updateLikeCount('inc');
            
        } else {
            updateLikeCount('dec');
        }
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
});