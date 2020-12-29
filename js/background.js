chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({
        options: {
            sidebar: true,
            sidebarResize: true,
            sidebarSize: "160",
            backspaceDelete: true,
            deleteDelete: true,
            authorWidth: "140",
            authorSubjectPadding: "16"
        }
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'mail.google.com' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});