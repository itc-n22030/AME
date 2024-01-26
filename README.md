# 出席管理アプリ　AME仕様書
制作　卒業企画チーム_HMN

メンバー

HIMANSHU GAUTAM　武藤ショーン凪翔　與那覇祥人

<br/>

![ヘッダー画像](/AME.png)

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
| Database          | MySQL                   　　　　　　　　　　　　　　　　|                                                

<br />

## 前提条件
・Node.js v20.10.0 以降

・npm v10.2.3 以降

・ngrok v3.4.0 以降（テスト段階で必要）


## インストール
このリポジトリのクローンを作成します

実行してnpm installで依存関係をインストールします。


#### slackの設定
ブラウザもしくはアプリでslackの登録

#### slackappの設定
##### 1 slackのメニューからapp設定に移動
![slack設定１](/slack_settings/img/slack_app_settings1_1.png)

------------
##### 2 slackAppdirectoryに移動したら右上のbuildに移動
![slack設定2](/slack_settings/img/slack_app_settings2.png)

------------
##### 3 Yourappsに移動したらcreateNewappを選択

------------
##### 4 上のFrom scratchを選択
![slack設定4](/slack_settings/img/slack_app_settings4.png)

------------
##### 5 アプリ名と使用するワークスペースを選択し、作成
![slack設定5](/slack_settings/img/slack_app_settings5.png)

------------
##### 6 OAuth & Permissionsでボットとユーザーのトークンスコープの追加
追加するトークンスコープ一覧

##### botのトークンスコープ

##### app_mentions:read:

bot が直接メンションされたメッセージを取得する権限です。この権限がないと、ボットがメンションされたかどうかを確認できません。

------------
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

### DBの設定

DBに以下のようにslackのチャンネルID、スプレッドシートのシートID、シート名を追加する
![DB_settings](DB_setting/img/DB_settings.png)

<br />

### Googleスプレッドシートはフォルダにあるテンプレを参考にして作成

<br />

## GCPの登録

### 登録には以下の登録が必須です
・Googleアカウント

・クレジットカード

#### Google Cloud Platformにアクセスし、Googleアカウントで登録します。

#### 登録完了後、GCPのコンソール画面が表示されます 

#### 《アカウントを作成》 をクリックします。

#### GCPプロジェクトの作成

#### 「APIとサービス」 > 「ダッシュボード」に移動し、Google Sheets APIを有効にする

#### 「APIとサービス」 > 「認証情報」に移動し、「認証情報を作成」ボタンをクリックし、サービスアカウントキーを作成します。

#### サービスアカウントに適切な権限（Google Sheets編集者など）を付与します。

#### JSON形式でキーをダウンロードします。

<br />

## 実行手順

#### プロジェクトフォルダの.envに以下の内容を書き込む
・SLACK_SIGNING_SECRET=《slackのsinging_secret》

・SLACK_BOT_TOKEN=《slackのbot_token》

・GOOGLE_SHEETS_API_KEY_PATH=《ダウンロードしたGCPのJSONキーのパス》

・DB_HOST=《ホスト》

・DB_USER=《ユーザー名》

・DB_PASSWORD=《パスワード》

・DB_DATABASE=《データベース名》


#### プロジェクトフォルダでnode .\slack.jを実行(ポート:3001)

#### 次にngrokを開き、ngrok http 3001を実行

#### Forwarding にあるURLをコピーし、slackのEvent Subscriptionsに移動

#### Event SubscriptionsにあるRequest URLに先ほどのURLを貼り付けて、行末に/slack/eventsを付け加える

#### slackのチャンネルで出席と入力し、メッセージの確認とシートへの出力が確認できたら成功です。

<br />

## よくある質問

Q　リモート授業の場合、不正対策はありますか？

A　はい。GCPのCloud IAPやVPC ネットワークでファイアウォール ルールの設定をすることで特定のネットワークからのみアクセス可能にできます。

<br />

## お問い合わせ
email n22030@std.it-college.ac.jp

<br />


## 
Copyright (c) 2024 卒業企画チーム_HMN
<br />
