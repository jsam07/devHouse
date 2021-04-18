const setup = () => {
    return {
        loading: true,
        isSidebarOpen: false,
        toggleSidbarMenu() {
            this.isSidebarOpen = !this.isSidebarOpen
        },
        isSettingsPanelOpen: false,
        isSearchBoxOpen: false,
    }
}