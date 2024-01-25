# 出席管理アプリ　AME仕様書
制作　卒業企画チーム_HMN

メンバー

HIMANSHU GAUTAM　武藤ショーン凪翔　與那覇祥人

<br/>

![ヘッダー画像](/AME.png)

<br />

## サービスのURL


<br />

## 使い方
AMEではslackとスプレッドシートを使って出席を行います。

slackの教科ごとのチャンネルで出席と入力することで出席になります。

出席状況は時間内・遅刻・欠席の三つに分けられており、シートに値が出力されます。

時間内であれば２、遅刻は１、17時までに出席がない場合は欠席となり０がシートに出力されます。


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


#### slackの設定
ブラウザもしくはアプリでslackの登録　※スマホからブラウザは利用できません。

#### slackappの設定
##### 1 slackのメニューからapp設定に移動
![slack設定１](/slack_settings/img/slack_app_settings1_1.png)


##### 2 slackAppdirectoryに移動したら右上のbuildに移動
![slack設定2](/slack_settings/img/slack_app_settings2.png)


##### 3 Yourappsに移動したらcreateNewappを選択


##### 4 上のFrom scratchを選択
![slack設定4](/slack_settings/img/slack_app_settings4.png)


##### 5 アプリ名と使用するワークスペースを選択し、作成
![slack設定5](/slack_settings/img/slack_app_settings5.png)


##### 6 OAuth & Permissionsでボットとユーザーのトークンスコープの追加
追加するトークンスコープ一覧

##### botのトークンスコープ

##### app_mentions:read:

bot が直接メンションされたメッセージを取得する権限です。この権限がないと、ボットがメンションされたかどうかを確認できません。

##### channels:history:

パブリックチャンネル内のメッセージとコンテンツを表示する権限です。Google_Sheet_bot が追加されたパブリックチャンネルでのメッセージを取得できます。

##### channels:read:

ワークスペース内のパブリックチャンネルに関する基本情報を表示する権限です。チャンネルの一覧やメタデータなどを取得できます。

##### chat:write:

bot としてメッセージを送信する権限です。Slack上でのメッセージの送信に使用されます。

##### im:history:

bot が追加されたダイレクトメッセージ内のメッセージとコンテンツを表示する権限です。

##### im:read:

ダイレクトメッセージに関する基本情報を表示する権限です。ダイレクトメッセージの一覧やメタデータなどを取得できます。

##### im:write:

ユーザーとのダイレクトメッセージを開始する権限です。

##### reactions:read:

bot が追加されたチャンネルや会話での絵文字リアクションとそれに関連するコンテンツを表示する権限です。

##### users.profile:read:

ワークスペース内の人々のプロファイルに関する詳細情報を表示する権限です。

##### users:read:

ワークスペース内の人々の一覧を表示する権限です。

##### ユーザーのトークンスコープ

##### channels:history

ユーザーのパブリック チャネル内のメッセージやその他のコンテンツを表示する

##### 7 Basic Informationに移動し、Install your appでappをワークスペースにインストールする。

##### 8 インストールが成功したら、Basic InformationにあるSigning SecretとOAuth & PermissionsのBot User OAuth Tokenを取得する

##### 9 ワークスペースに戻り、利用するチャンネルの詳細を開き、インテグレーションにあるアプリを追加するから作成したappを追加

<br />

### 実行環境の設定

#### node.jsのインストール

1 下記のURLからOSにあったnode.jsをインストール
https://nodejs.org/en/download

2 ダウンロードできたらインストールファイルをクリックしてインストーラーを開きます。

3 《Next》ボタンをクリックします。

4 《I accept the terms in the Licence Agreement》にチェックを入れて、《Next》に進む。
![node_setup1](/node_setup/img/node_setup1.png)

5 《Next》に進む。（必要に応じてインストールフォルダを指定）
![node_setup2](/node_setup/img/node_setup2.png)

6 デフォルトの状態で《Next》をクリックします。
![node_setup3](/node_setup/img/node_setup3.png)

7 今回、ネイティブアドオンのビルドしないのでそのまま《Next》をクリックします。
![node_setup4](/node_setup/img/node_setup4.png)

8 《Install》をクリックします
![node_setup5](/node_setup/img/node_setup5.png)

9 成功したら《finish》を押し、終了。

10 Windows PowerShellを開き、node --versionを入力してインストールしたバージョンが確認できたらインストールは完了です。



<br />


## よくある質問/FAQ

<br />

## お問い合わせ
email n22030@std.it-college.ac.jp

<br />


## 
Copyright (c) 2024 卒業企画チーム_HMN
<br />
