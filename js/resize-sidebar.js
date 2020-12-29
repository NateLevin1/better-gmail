let sidebarWidth = 0;
let resizingEnabled = false;
let sidebarEnabled = true;

let resizer = document.createElement("div");
resizer.style.cssText = `
    height: calc(100vh - 97px);
    width: 8px;
    cursor: col-resize;
    position: absolute;
    right:0;
`;
let sidebar;

const updateSidebar = ()=>{
    if(!sidebar) {
        sidebar = document.querySelector("div.nH.oy8Mbf.nn.aeN");
    }
    if(sidebar) {
        if(sidebarEnabled) {
            sidebar.style.cssText = `min-width: 0 !important; max-width: none !important; width: ${sidebarWidth}px; height: calc(100vh - 97px);`;
        } else {
            sidebar.style.display = "none";
        }
    }
    if(resizer) {
        resizer.style.display = resizingEnabled ? null : "none";
    }
}

const update = (options)=>{
    sidebarWidth = options.sidebarSize;
    resizingEnabled = options.sidebarResize;
    sidebarEnabled = options.sidebar;
    updateSidebar();
}

window.addEventListener("load", ()=>{
    if(!sidebar) {
        sidebar = document.querySelector("div.nH.oy8Mbf.nn.aeN");
    }
    sidebar.appendChild(resizer);
    updateSidebar();
});

chrome.storage.sync.get("options", ({options})=>update(options))

chrome.storage.onChanged.addListener((changes, namespace)=>{
    if(namespace === "sync") {
        update(changes.options.newValue);
    }
});

// resizing, from https://htmldom.dev/create-resizable-split-views/
let x = 0;

// Handle the mousedown event
// that's triggered when user drags the resizer
const mouseDownHandler = function(e) {
    // Get the current mouse position
    x = e.clientX;
    sidebarWidth = sidebar.getBoundingClientRect().width;

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function(e) {
    // How far the mouse has been moved
    const dx = e.clientX - x;

    const newSidebarWidth = (sidebarWidth + dx);
    sidebar.style.width = `${newSidebarWidth}px`;
};

const mouseUpHandler = function() {
    document.body.style.cursor = null;
    document.body.style.userSelect = null;
    document.body.style.webkitUserSelect = null;
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

// Attach the handler
resizer.addEventListener('mousedown', mouseDownHandler);