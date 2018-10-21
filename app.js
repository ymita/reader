let data = [
    {
        "id": 1,
        "spelling": "ameliorate",
        "meaning": "改善する",
        "text": "They offered some compromises in an effort to ameliorate the situation."
    },
    {
        "id": 2,
        "spelling": "atrophy",
        "meaning": "萎縮",
        "text": "Atrophy is the partial or complete wasting away of a part of the body."
    },
    {
        "id": 3,
        "spelling": "precinct",
        "meaning": "選挙区、境界",
        "text": "A precinct is a space enclosed by the walls or other boundaries of a particular place or building, or by an arbitrary and imaginary line drawn around it."
    },
    {
        "id": 4,
        "spelling": "allay",
        "meaning": "静める、和らげる",
        "text": "Usually you can allay the negativity by providing (or asking members to provide) clear and concise instructions and documentation."
    },
    {
        "id": 5,
        "spelling": "endemic",
        "meaning": "特有の、土着の",
        "text": "This isn't a platform thing, it's a problem that is endemic to the web."
    },
    {
        "id": 6,
        "spelling": "hydrolysis",
        "meaning": "加水分解",
        "text": "Usually hydrolysis is a chemical process in which a molecule of water is added to a substance. Sometimes this addition causes both substance and water molecule to split into two parts."
    },
    {
        "id": 7,
        "spelling": "debacle",
        "meaning": "総崩れ、大失敗",
        "text": "These include the White House’s U.S. Digital Service 18F taskforce, launched in response to the healthcare.gov debacle."
    }
];

// SpeechSynthesisUtterance オブジェクト (例文読み上げに利用する。)
let msg = null;

// 初期化処理
function init() {
    createList();
    createMessage();
    registerEvents();
};

// 例文データから、リストを生成する。
function createList() {
    let fragment = document.createDocumentFragment();
    const list = document.getElementById('list');

    for (let i = 0; i < data.length; i++) {
        let anchor = document.createElement('a');
        anchor.href = "#";
        anchor.classList.add('list-group-item');
        anchor.classList.add('list-group-item-action');
        anchor.textContent = data[i].text;
        anchor.dataset.indexNumber = data[i].id;
        fragment.appendChild(anchor);
    }

    list.appendChild(fragment);
}

// 読み上げる音声(声)に関する情報
function createMessage() {
    msg = new SpeechSynthesisUtterance();
    // https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
    // msg.voiceURI = 'native';
    // msg.volume = 1;
    // msg.rate = 1;
    // msg.pitch = 2;// PC では pitch = 2 でちょうどよいが、スマートフォンでは声が高すぎる・・・。
    msg.lang = 'en-US';
}

// 例文データの長さ (読み上げ終了時に読み上げ位置を初期化するために利用)
let dataCount = data.length;
// アクティブアイテムのインデックス情報 (アクティブとしてハイライトするために利用)
let currentIndex = 0;

// 例文読み上げ、及びリストのスタイリングなど
function readText(_word) {
    return function () {
        return new Promise(function (resolve, reject) {
            // 読み上げ中のアイテム (読み上げ開始時に、読み上げ中の例文に含まれる学習単語の日本語を表示するために利用)
            let wordInPronounce;

            // 読み上げ開始時に呼び出されるイベント
            msg.onstart = (event) => {
                currentIndex = currentIndex + 1;
                let anchor = document.querySelectorAll(`[data-index-number="${currentIndex}"]`)[0];
                anchor.classList.add('active');
                wordInPronounce = data.find((item) => {
                    return item.id === currentIndex;
                });

                // 例文を読み上げ始めたら、画面上に日本語の意味を表示する。
                if (wordInPronounce) {
                    document.getElementById('meaning').textContent = wordInPronounce.meaning;
                }
            }

            // 読み上げ終了時に呼び出されるイベント
            msg.onend = (event) => {
                let anchor = document.querySelectorAll(`[data-index-number="${currentIndex}"]`)[0];
                if (anchor.classList.contains('active')) {
                    anchor.classList.remove('active');
                }
                // 例文を読み上げ終わったら、画面上に表示されている日本語の意味をクリアする。
                document.getElementById('meaning').textContent = "　";

                if (dataCount === currentIndex) {
                    // 読み上げを終了すると、再度読み上げられるようにインデックスを初期値に設定
                    currentIndex = 0;
                }
                // 読み上げが終わったら、プロミスを解決
                resolve(_word);
            }
            msg.text = _word.text;
            // 読み上げ！
            speechSynthesis.speak(msg);
        });
    };
}
let start = (evt) => {
    // 読み上げ処理を保存する配列
    var promises = [];
    // 配列に読み上げ処理を追加していく
    for (let i = 0; i < data.length; i++) {
        promises.push(readText(data[i]));
    }
    // 読み上げ処理を直列実行
    promises.reduce(function (prev, curr, index, array) {
        return prev.then(curr);
    }, Promise.resolve());
}

// ボタンクリックなどイベント登録用の関数
function registerEvents() {
    let startButton = document.getElementById('startButton');
    startButton.addEventListener('click', start);

    let pauseButton = document.getElementById('pauseButton');
    pauseButton.addEventListener('click', (evt) => {
        speechSynthesis.pause();
    });
    let resumeButton = document.getElementById('resumeButton');
    resumeButton.addEventListener('click', (evt) => {
        speechSynthesis.resume();
    });
    let endButton = document.getElementById('endButton');
    endButton.addEventListener('click', (evt) => {
        speechSynthesis.cancel();
    });


}


init();
