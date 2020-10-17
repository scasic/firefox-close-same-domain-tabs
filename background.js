browser.contextMenus.create({
    id: "close-domain-tabs",
    title: 'Close same domain tabs',
    contexts: ["all"],
    icons: {
        "16": "icons/close16.png",
        "32": "icons/close32.png"
      }
  });


browser.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "close-domain-tabs":
        const querying = browser.tabs.query({currentWindow: true, active: true}).then(function(tab){
            close_tabs(url_domain(tab[0].url));
            console.log(tab);
        });       
        break;
  }
})

function close_tabs (hostname){
    browser.tabs.query({}).then((tabs) => {
        for (let tab of tabs) {
            if (url_domain(tab.url)===hostname){
                browser.tabs.remove([tab.id]);
            }
        }
    });
}

function url_domain(data) {
    let a = document.createElement('a');
    a.href = data;
    return a.hostname;
}