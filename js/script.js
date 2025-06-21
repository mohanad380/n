
document.addEventListener("DOMContentLoaded", () => {
    // --- Keep Existing Sidebar Toggle Code --- //
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("active");
            document.body.classList.toggle("sidebar-open");
            const icon = sidebarToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-list");
                icon.classList.toggle("fa-times");
            }
        });

        document.addEventListener("click", (event) => {
            if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains("active")) {
                const isClickInsideSidebar = sidebar.contains(event.target);
                const isClickOnToggle = sidebarToggle.contains(event.target);
                if (!isClickInsideSidebar && !isClickOnToggle) {
                    sidebar.classList.remove("active");
                    document.body.classList.remove("sidebar-open");
                    const icon = sidebarToggle.querySelector("i");
                    if (icon) {
                        icon.classList.add("fa-list");
                        icon.classList.remove("fa-times");
                    }
                }
            }
        });
    }
    // --- End of Sidebar Toggle Code --- //
});

