(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
     * 指定した要素の子どもをすべて削除する
     * @param {HTMLelement} element HTMLの要素
     */
    let removeAllChildren = function (element) {
        while (element.firstChild) { // 子どもの要素があるかぎり削除
            element.removeChild(element.firstChild);
        }
    }

    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            showResult();
        }
    }

    assessmentButton.onclick = () => {
        showResult();
    };

    let showResult = function () {
        const userName = userNameInput.value;
        if (userName.length === 0) {
            return;
        }
        // 診断結果表示エリア
        removeAllChildren(resultDivided);
        let header = document.createElement('h2');
        header.innerText = '今日の推しメン';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        //ツイートエリア 
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('アンジュルム')
            + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #アンジュルム'
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    }

    const answers = [
        '{userName}の今日の推しメンは和田彩花です。あやちょ～～～ブラボー！ラッキースポット：美術館',
        '{userName}の今日の推しメンは福田花音です。肩書のないわたしでも好きになってくれるかな？ラッキースポット：ディズニーランド',
        '{userName}の今日の推しメンは中西香菜です。ヤッタルチャンになるんやで💪ラッキースポット：映画館',
        '{userName}の今日の推しメンは竹内朱莉です。たーーーけーーーー！ラッキーフード：おでん',
        '{userName}の今日の推しメンは勝田里奈です。かつたりなでーす。WEARみてね！ラッキーアイテム：黒のシンプルなブラウス',
        '{userName}の今日の推しメンは田村芽実です。だってもうとっくに、始まってる。ラッキーアイテム：ひまわりのバッグ',
        '{userName}の今日の推しメンは室田瑞希です。ほんとの気持ちはいつだって一つしかない。ラッキーフード：明太チーズもんじゃ',
        '{userName}の今日の推しメンは相川茉穂です。「今より広い空が見たいの」ラッキーアイテム：カメラ',
        '{userName}の今日の推しメンは佐々木莉佳子です。泣かない　そう決めたね　また皆で笑えるまで。ラッキースポット：球場',
        '{userName}の今日の推しメンは上國料萌衣です。経験不足なんて問題ない　勇気を見せてほしいだけ。ラッキーフード：ピザーラのピザ',
        '{userName}の今日の推しメンは笠原桃奈です。子供だなんて思ったら　大間違いよオンナノコラッキーアイテム：赤リップ',
        '{userName}の今日の推しメンは船木結です。むすぶちゃんやでぇ～🍬ラッキーフード：たこ焼き',
        '{userName}の今日の推しメンは川村文乃です。きらきらしちゅー☆ラッキーフード：カツオのたたき'
    ];
    /**
     * 名前の文字列を渡すと診断結果を返す
     * @param {string} userName
     * @returns {string} 診断結果
     */
    let assessment = function (userName) {
        let sumOfcharCode = 0;
        // 全文字のコード番号を取得してそれを足し合わせる
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }
        // 文字のコード番号の合計を回答の数で割って添字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];
        result = result.replace(/\{userName\}/g, userName);
        return result;

    }

    // テストコード 
    console.assert(
        assessment('小夜') === '小夜の今日の推しメンは佐々木莉佳子です。泣かない　そう決めたね　また皆で笑えるまで。ラッキースポット：野球場',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('夕貴') === assessment('夕貴'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
})();
