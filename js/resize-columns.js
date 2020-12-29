let styleSheet = document.createElement("style");
document.body.appendChild(styleSheet);


const updateColumns = (options)=>{
    styleSheet.innerHTML = `
        .zA>.yX {
            max-width: ${options.authorWidth}px !important;
            padding-right: ${options.authorSubjectPadding}px !important;
        }
    `;
}

chrome.storage.sync.get("options", ({options})=>updateColumns(options))

chrome.storage.onChanged.addListener((changes, namespace)=>{
    if(namespace === "sync") {
        updateColumns(changes.options.newValue);
    }
});