const setup = () => {
    return {
        loading: true,
        isSidebarOpen: false,
        toggleSidbarMenu() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        isSettingsPanelOpen: false,
        isSearchBoxOpen: false,
    };
};

const validateForm = (e) => {
    e.preventDefault();
    const postContent = document.getElementById('post-content').value;
    console.log(postContent);
    if(postContent.trim() === '') {
        alert('Post cannot be empty');
        return false;
    }
    return true;
}

$(function () {
      $()
});
