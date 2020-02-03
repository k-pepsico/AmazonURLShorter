let Data = { "Title": "", "URL": "" }  // とりま格納する変数

chrome.tabs.getSelected(tab => {  // 現在のタブを取得
    Data.Title = tab.title;  // tabに現在のタブが格納されている（？）。
    Data.URL = tab.url;    // tab.titleには現在開いているタブのページタイトルが、tab.urlにはURLが格納されている。
});

window.addEventListener('load', () => {  // 拡張機能アイコンがクリックされて拡張機能ポップアップページが読み込まれたとき
    const txtBox = document.querySelector('input');
    document.querySelector('button.url').addEventListener('click', () => {
        txtBox.value = 'https://amazon.co.jp/dp/' + Data.URL.match(/(dp|product)\/(\w{10})/)[2];
    });

    // https://www.amazon.co.jp/dp/B00TQEPVSM/ref=pd_aw_sbs_21_1/355-3407243-4522640?_encoding=UTF8&pd_rd_i=B00TQEPVSM&pd_rd_r=0be963e0-8ed2-4a8b-a773-4358162e4806&pd_rd_w=ovkmU&pd_rd_wg=PW1GZ&pf_rd_p=aeee4cf9-9af8-43b4-b05c-0ae7c82d9d5e&pf_rd_r=G8XYNTJWNJ6E8GM5GJTH&psc=1&refRID=G8XYNTJWNJ6E8GM5GJTH

    const cb = new ClipboardJS('button.copy');  // Clipboard.js
    const msgContainer = document.querySelector('div.msg');
    const msgSuccess = document.querySelector('p.copied');
    const msgFailed = document.querySelector('p.failed');
    cb.on("success", function (e) {  // コピーに成功
        console.log('Copied Successfully.', e);
        msgContainer.style.display = "block";  // 表示
        msgSuccess.style.display = "block";
        setTimeout(() => {
            msgSuccess.style.display = "none";  // 3sec後に非表示
            msgContainer.style.display = "none";
        }, 3000);
    });
    cb.on("error", function (e) {  // コピーに失敗
        console.error('Failed to Copy.', e);
        msgContainer.style.display = "block";
        msgFailed.style.display = "block";
        setTimeout(() => {
            msgFailed.style.display = "none";
            msgContainer.style.display = "none";
        }, 3000);
    });
})