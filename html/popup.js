const sidebar = document.getElementById("sidebar");
const sidebarResize = document.getElementById("sidebar-resize");
const sidebarSize = document.getElementById("sidebar-size");
const backspaceDelete = document.getElementById("backspace-delete");
const deleteDelete = document.getElementById("delete-delete");
const authorWidth = document.getElementById("author-width");
const authorSubjectPadding = document.getElementById("author-subject-padding");

const save = ()=>{
    chrome.storage.sync.set({
        options: {
            sidebar: sidebar.checked,
            sidebarResize: sidebarResize.checked,
            sidebarSize: sidebarSize.value,
            backspaceDelete: backspaceDelete.checked,
            deleteDelete: deleteDelete.checked,
            authorWidth: authorWidth.value,
            authorSubjectPadding: authorSubjectPadding.value
        }
    });
}

const updateResize = ()=>{
    if(sidebarResize.checked) {
        sidebarSize.parentElement.style.display = null;
    } else {
        sidebarSize.parentElement.style.display = "none";
    }
    save();
}
const updateSidebar = () => {
    if (sidebar.checked) {
        sidebarResize.parentElement.style.display = null;
        updateResize();
    } else {
        sidebarResize.parentElement.style.display = "none";
        sidebarSize.parentElement.style.display = "none";
    }
    save();
}

sidebar.oninput = updateSidebar;

sidebarResize.oninput = updateResize;

sidebarSize.onchange = save;

backspaceDelete.oninput = save;

deleteDelete.oninput = save;

authorWidth.onchange = save;

authorSubjectPadding.onchange = save;

const load = ()=>{
    chrome.storage.sync.get("options", ({ options })=>{
        sidebar.checked = options.sidebar;
        sidebarResize.checked = options.sidebarResize;
        sidebarSize.value = options.sidebarSize;
        deleteDelete.checked = options.deleteDelete;
        backspaceDelete.checked = options.backspaceDelete;
        authorWidth.value = options.authorWidth;
        authorSubjectPadding.value = options.authorSubjectPadding;
        updateSidebar();
    });
}

load();