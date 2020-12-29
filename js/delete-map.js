let backspaceDelete = false;
let deleteDelete = false;

const updateDeleteMap = (options)=>{
    backspaceDelete = options.backspaceDelete;
    deleteDelete = options.deleteDelete;
}

chrome.storage.sync.get("options", ({options})=>updateDeleteMap(options))
chrome.storage.onChanged.addListener((changes, namespace)=>{
    if(namespace === "sync") {
        updateDeleteMap(changes.options.newValue);
    }
});

document.addEventListener("keydown", (event)=>{
    if((event.key === "Backspace" && backspaceDelete) || (event.key === "Delete" && deleteDelete)) {
        // send a keydown event with the key `#`
        let newEvent = new KeyboardEvent("keypress", {
            key: "#",
            keyCode: 51,
            which: 51,
            code: "Digit3",
            shiftKey: true
        });
        document.dispatchEvent(newEvent);
    }
});