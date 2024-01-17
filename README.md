![ヘッダー画像](/AME.png)

<br />

## サービスのURL


<br />

## 主な機能一覧
| 管理者画面 |　確認画面 |
| ---- | ---- |
| ![管理者画面](/image/出席確認.png) | ![確認画面](/image/フォルダ.png) |
| ここでは管理者がシートの確認・作成・削除を行う | フォルダから確認・修正したいシートを選択 |

| 作成画面 |　削除画面 |
| ---- | ---- |
| ![作成画面](/image/作成画面.png) | ![削除画面](/image/削除.png) |
| slackのチャンネルID、シートID、シート名を入力 | 作成画面と同様の入力を行う |

| 時間内の場合 |　シート画面 |
| ---- | ---- |
| ![時間内メッセージ](/image/時間内メッセージ.png) | ![　シート画面１](/image/時間内シート.png) |
| slackで出席を入力すると時間内であれば通常のメッセージを出力 | シートには2の値を出力 |

| 遅刻の場合 |　シート画面 |
| ---- | ---- |
| ![遅刻メッセージ](/image/遅刻メッセージ.png) | ![　シート画面２](/image/遅刻シート.png) |
| 遅刻の場合は遅刻メッセージを出力 | シートには1の値を出力 |

<br />

## 使用環境

| Category          | Technology Stack                                     |
| ----------------- | --------------------------------------------------   |
| OS                | Windows11                                            |
| frontend          | HTML/CSS, TypeScript                                 |
| Backend           | TypeScript, Node.js                                  |
| Infrastructure    | GCP                     　　　　　　　　　　　　　　　　|

<br />

## 使い方
AMEではslackとスプレッドシートを使って出席を行います。

slackの教科ごとのチャンネルで出席と入力することで出席になります。

出席状況は時間内・遅刻・欠席の三つに分けられており、シートに値が出力される。

時間内であれば２、遅刻は１、17時までに出席がない場合は欠席となり０がシートに出力されます。



<br />

## インストール
### ユーザーの場合
以下のURLでSlackのダウンロードを行う

Windows : https://slack.com/intl/ja-jp/downloads/windows

Mac : https://slack.com/intl/ja-jp/downloads/mac

Linux: https://slack.com/intl/ja-jp/downloads/linux

Android : https://slack.com/intl/ja-jp/downloads/android

iOS : https://slack.com/intl/ja-jp/downloads/ios

### 管理者の場合

#### slackのインストールと設定
ユーザーと同じくslackをダウンロードし、ワークスペースを作成後、使用するチャンネルとユーザーを追加

#### slackappの設定
##### 1 slackのメニューからapp設定に移動
![slack設定１](/slack_settings/img/slack_app_settings1_1.png)


##### 2 slackAppdirectoryに移動したら右上のbuildに移動
![slack設定2](/slack_settings/img/slack_app_settings2.png)


##### 3 Yourappsに移動したらcreateNewappを選択


##### 4 上のFrom scratchを選択
![slack設定4](/slack_settings/img/slack_app_settings4.png)

<br />

## 今後の展望

<br />

## よくある質問/FAQ

<br />

## お問い合わせ
email n22030@std.it-college.ac.jp

<br />


## 
Copyright (c) 2024 Masato Yonaha
<br />
