# 出席管理アプリ　AME環境構築マニュアル
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

|学生用ログイン|シート選択画面 |
| ---- | ---- |
| ![遅刻メッセージ](/image/login.png) | ![　シート画面２](/image/select_sheet.png) |
| 学生は事前に用意されているユーザー名、パスワードでログインを行う。 | ログイン後は確認したいシートを選択 |

| 選択したシートの出席状況 |
| ---- |
| ![遅刻メッセージ](/image/attendace.png) |
| シートを選択すると現在の出席状況を確認できる |

<br />

## 開発環境

| Category          | Technology Stack                                     |
| ----------------- | --------------------------------------------------   |
| frontend          | HTML/CSS, TypeScript                                 |
| Backend           | TypeScript, Node.js                                  |
| Infrastructure    | GCP                     　　　　　　　　　　　　　　　　|
| Database          | MySQL                   　　　　　　　　　　　　　　　　|


<br />

## ファイル構成
```
project
│   .env
│——— authorize.js
│——— package-lock.json
│——— package.json
│——— server.js
│——— sheet.js
│——— slack.js
├──key
│   │——— my-project-dakoku~.json(GCPのアカウントキー)
├── login
│   │——— login.js
│   │——— login.html
│
├── node_modules
│   │   [Node.js モジュールたち...]
│
└── public
    │——— create.html
    │——— delete.html
    │——— home.html
    │——— script.js
    │——— style.css
```

## ファイル説明

### slackボット、スプレッドシートの処理・MySQLとの連携

・slack.js

Slackボットのメインの処理を担当し、Slack APIとの通信やメッセージの処理を行います。

・sheet.js

Google SheetsとMySQLとの連携を担当し、スプレッドシートからのデータ取得や更新を行います。

・authorize.js

 Google Sheets APIへのアクセスを許可するためのファイルで、認証トークンの取得や認証フローの制御などを行います。

### 管理者用の出席管理画面の設定

・server.js

: 管理者用の出席管理画面を設定し、シートの閲覧や登録、削除などのDBの処理を行う。

・home.html

出席管理やシートの操作を行うための管理者用ページ

・create.html

管理者がDBにslackのチャンネルID、シート情報を登録するためのページ

・delete.html

管理者がDBにある既存のslackのチャンネルID、シート情報を削除するためのページ

### 学生用のログイン処理・シート確認

・login.js

学生用のログインとシート確認の処理をし、学生がログインして自身のシートを確認するための機能

・login.html

学生がログインするためのページで、ユーザー名とパスワードを入力後、閲覧したいシートの選択を行う。


<br />


## インストール
このリポジトリのクローンを作成します

実行してnpm installで依存関係をインストールします。

・Node.js v20.10.0 以降

・npm v10.2.3 以降

・ngrok v3.4.0 以降（テスト段階で必要）


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
```
mysql> SELECT * FROM sheets;
+----+-------------+----------------------------------------------+--------------+
| id | channelId   | sheetId                                      | sheetName    |
+----+-------------+----------------------------------------------+--------------+
|  1 | C06772JMJ9Y | 1tSXSgQHQ-y0cDM6BfOLCt8rTwBy48dNYD-8hnT1IWkU | Database I   |
|  2 | C067JQKRBKQ | 1tSXSgQHQ-y0cDM6BfOLCt8rTwBy48dNYD-8hnT1IWkU | 月間出席管理  |
+----+-------------+----------------------------------------------+--------------+
```

ユーザーログイン用のユーザー名、パスワード
```
mysql> SELECT * FROM users;
+----+----------+----------+
| id | username | password |
+----+----------+----------+
|  1 | n22030   | n22030   |
|  2 | n22009   | n22009   |
+----+----------+----------+
```
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

#### 「APIとサービス」 > 「ダッシュボード」に移動し、Google Sheets API,drive APIを有効にする

#### 「APIとサービス」 > 「認証情報」に移動し、「認証情報を作成」ボタンをクリックし、サービスアカウントキーを作成します。

#### サービスアカウントに適切な権限（Google Sheets編集者など）を付与します。

#### JSON形式でキーをダウンロードします。

<br />

## 実行手順

#### プロジェクトフォルダの.envに以下の内容を書き込む
```
SLACK_SIGNING_SECRET=《slackのsinging_secret》
SLACK_BOT_TOKEN=《slackのbot_token》
GOOGLE_SHEETS_API_KEY_PATH=《ダウンロードしたGCPのJSONキーのパス》
DB_HOST=《ホスト》
DB_USER=《ユーザー名》
DB_PASSWORD=《パスワード》
DB_DATABASE=《データベース名》
```
#### publicフォルダにあるscript.jsの以下の部分を書き換える
```
function redirectToGoogleSheet() {
    window.location.href = 《'実際の管理者のdriveにある出席管理用のフォルダのURLに書き換える'》;
}
```

#### プロジェクトフォルダでnode .\slack.jを実行(ポート:3001)

#### 次にngrokを開き、ngrok http 3001を実行

#### Forwarding にあるURLをコピーし、slackのEvent Subscriptionsに移動

#### Event SubscriptionsにあるRequest URLに先ほどのURLを貼り付けて、行末に/slack/eventsを付け加える

#### slackのチャンネルで出席と入力し、メッセージの確認とシートへの出力が確認できたら成功です。

<br />

## サーバー構築

ローカルでの動作がうまくいったら次にGCPのAppEngineを使ってサーバーを構築していきます。

今回はGCPの無料枠を使って行っていきます。

参考サイト

[https://qiita.com/yfujii01/items/41c15d885830deea8ed1]

### VMインスタンスの作成

GCPのメニューからCompute EngineのVMインスタンスに移動し、Compute Engine APIを有効にする

VMインスタンスの上部にあるインスタンス作成をクリック

名前を決め、リージョンとゾーンは無料枠で使えるus-west1とus-west1-bを利用します。

マシンタイプは「micro (共有 vCPU x 1)」を利用します。

好きなOSを選択。　私はUbuntuを選択しました。

ブートディスクのサイズは30GBまでは無料枠なので、30GBで設定。またデフォルトで指定されているバランス型永久ディスクは無料枠外なので標準永久ディスクに切り替える。

IDとAPIへのアクセスはデフォルトで行う。

ファイアウォールを設定で、http(80) https(443)ポートの開放

固定 IP アドレスの設定で、デフォルトではフィラメント（起動するたびに変更される）であるので、固定 IP アドレ スを取得しておくと便利

インスタンスを作成する。

### インストールと設定

うまく作成できたらブラウザウィンドウで開くを押し、インスタンスに接続する。

ssh接続で入り、apt updateとnode、nom、git、MySQLなどのインストールを行う。

gitからリポジトリをクローンし、必要なライブラリなどをプロジェクトディレクトリにインストールする。

MySQLにテーブルを追加

login.jsやserver.jsのlocalhostを外部IPなどに書き換える

動作確認の為、server.jsを実行

「http://【外部IP】:3000」で接続します。

成功すれば、出席管理が表示されます。

### ドメインの作成

Google Cloud DNSやGoogle Domains、他のドメイン登録サービスを使用する。

どれを利用するかはお好みで

### Let's Encrypt でSSL証明書を作成

cerbot-autoをインストールします

```
$ wget https://dl.eff.org/certbot-auto

$ chmod a+x certbot-auto
```
cerbot-autoを実行

```
$ ./certbot-auto
```

Emailを入力を行い、利用規約を確認する。

[https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf]

確認後「A」を入力します。

Emailへのお知らせを選択

SSL証明書を発行したいドメインを入力

httpをhttpsにリダイレクトするかの設定

1 リダイレクトしない　２リダイレクトする

証明書の発行に成功すると、それぞれ以下にファイルが作成されたようです。

証明書　/etc/letsencrypt/live/ドメイン名/fullchain.pem

秘密鍵　/etc/letsencrypt/live/ドメイン名/privkey.pem

cerbot-autoのおかげでnginxの設定が書き換えられ、https://【ドメイン名】で接続が行えるようになっています。


### Nginxのインストールを行う。

```
$ sudo apt install nginx -y
```

### Nginxを起動

```
$ sudo service nginx start
```

「http://【外部IP】:3000」で接続します。

### Nginxの設定を修正

```
$ sudo nano /etc/nginx/sites-available/default

server {
    listen 80;

    server_name example.com; # 自分のドメインに置き換える

    location /login {
        proxy_pass http://localhost:3003; # login.jsが動作するポートに合わせて変更
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /slack {
        proxy_pass http://localhost:3002; # slack.jsが動作するポートに合わせて変更
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /server {
        proxy_pass http://localhost:3001; # server.jsが動作するポートに合わせて変更
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

$ sudo systemctl restart nginxで設定を保存

```

https://【ドメイン名】でログイン画面や管理画面が表示されれば成功です。

お疲れ様でした！

<br />

## よくある質問

**Q:** 授業に出なくても出席ができますが、不正対策はありますか？

**A:** はい。GCPのCloud IAPやVPC ネットワークでファイアウォール ルールの設定をすることで特定のネットワークからのみアクセス可能にできます。
<br />
## 既存のバグ

#### 時間外の出席入力の際にエラー　現在対応中

## 改変履歴

#### 2024/02/01 ログイン機能の変更

DBに事前にユーザー名、パスワードを入力する仕様に変更

## 今後の改変予定

#### ログイン画面のデザイン変更


## 免責事項
このfileをインストールしたことによるいかなる損害も、私たちは一切責任を負わないものとします。

ご使用は自己責任でお願いいたします。

## お問い合わせ

email n22030@std.it-college.ac.jp

---

Copyright (c) 2024 卒業企画チーム_HMN
