$(function()  {

  $('#post-form').on('submit', function(e) {
    e.preventDefault();
    const postsContainer = $('#posts-container');
    const newPost = $('#post-template').clone();
    const postTextInput = $('#post-text');

    if(postTextInput.val().trim() === '') return alert('Post cannot be empty');

    newPost.find('.user-name').text('Demo User');
    newPost.find('.date').text(new Date().toString());
    newPost.find('.post-content').text(postTextInput.val());

    newPost.removeAttr('id');
    newPost.removeClass('hidden');

    postsContainer.append(newPost);

    postTextInput.clear();
  });

  $('.delete-post-form').on('submit', function(e) {
    e.preventDefault();
    const post = $(this).parents().eq(4);
    post.remove();
  });
});
