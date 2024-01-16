![ヘッダー画像](/AME.png)

<br />

## サービスのURL


<br />

## サービスへの想い



<br />

## アプリケーションのイメージ
![アプリケーションのイメージ](/docs/img/app-view/app-view_1.1.gif)

<br />

## 機能一覧
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
| Infrastructure    | GCP                     |
| Database          | MySQL                                                |
| Monitoring        | Sentry, UptimeRobot                                  |
| Environment setup | Docker                                               |
| CI/CD             | GitHub Actions                                       |
| Design            | Figma, Lucid                                         |
| etc.              | Stylelint, ESLint, Prettier, Husky Jest, Git, GitHub |

<br />

## 使い方
AMEではslackとスプレッドシートを使って出席を行います。

slackの教科ごとのチャンネルで出席と入力することで出席になります。

出席状況は時間内・遅刻・欠席の三つに分けられており、シートに値が出力される。

時間内であれば２、遅刻は１、17時までに出席がない場合は欠席となり０がシートに出力されます。



<br />

## インストール
以下のURLでSlackのダウンロードを行う

Windows : https://slack.com/intl/ja-jp/downloads/windows

Mac : https://slack.com/intl/ja-jp/downloads/mac

Linux: https://slack.com/intl/ja-jp/downloads/linux

Android : https://slack.com/intl/ja-jp/downloads/android

iOS : https://slack.com/intl/ja-jp/downloads/ios

<br />

## 今後の展望

本プロダクトは4つのフェーズに分けて、段階的に開発を進めています。  
現在はフェーズ1として、請求書の作成・発行機能の開発をしています。  
将来的には書類作成業務から経理・会計業務までを一元管理できる、統合的なソリューションの実現を目指しています。  

- フェーズ1：新しい税制に対応した請求書を、Web上で作成・発行できるアプリケーションを開発する。
- フェーズ2：発注書・見積書・納品書を、Web上で作成・発行できる機能を追加する。
- フェーズ3：お金や取引に関するデータをWeb上で確認できる機能を追加する。
- フェーズ4：取引に関するデータを、会計ソフトに効率的に取り込める機能を追加する。
