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
| ![管理者画面](/docs/img/app-view/welcome_1.1.png) | ![確認画面](/docs/img/app-view/login_1.1.png) |
| ここでは管理者がシートの確認・作成・削除を行う | フォルダから確認・修正したいシートを選択 |

| 作成画面 |　削除画面 |
| ---- | ---- |
| ![作成画面](/docs/img/app-view/select-business_1.1.png) | ![削除画面](/docs/img/app-view/create-invoice_1.1.png) |
| slackのチャンネルID、シートID、シート名を入力 | 作成画面と同様の入力を行う |

| 時間内の場合 |　シート画面 |
| ---- | ---- |
| ![時間内メッセージ](/docs/img/app-view/invoice-detail_1.1.png) | ![　シート画面１](/docs/img/app-view/print-invoice_1.1.png) |
| slackで出席を入力すると時間内であれば通常のメッセージを出力 | シートには2の値を出力 |

| 遅刻の場合 |　シート画面 |
| ---- | ---- |
| ![遅刻メッセージ](/docs/img/app-view/select-master_1.1.png) | ![　シート画面２](/docs/img/app-view/master-register-form_1.1.png) |
| 遅刻の場合は遅刻メッセージを出力 | シートには1の値を出力 |

<br />

## 使用技術

| Category          | Technology Stack                                     |
| ----------------- | --------------------------------------------------   |
| Frontend          | TypeScript, Next.js, Storybook                       |
| Backend           | TypeScript, NestJS, Prisma                           |
| Infrastructure    | Amazon Web Services, Vercel                          |
| Database          | PostgreSQL                                           |
| Monitoring        | Sentry, UptimeRobot                                  |
| Environment setup | Docker                                               |
| CI/CD             | GitHub Actions                                       |
| Design            | Figma, Lucid                                         |
| etc.              | Stylelint, ESLint, Prettier, Husky Jest, Git, GitHub |

<br />

## システム構成図

![システム構成図](/docs/img/system-architecture/system-architecture_1.1.png)

<br />

## ER図

![ER図](/docs/img/entity-relationship-diagram/entity-relationship-diagram_1.6.png)

<br />

## 今後の展望

本プロダクトは4つのフェーズに分けて、段階的に開発を進めています。  
現在はフェーズ1として、請求書の作成・発行機能の開発をしています。  
将来的には書類作成業務から経理・会計業務までを一元管理できる、統合的なソリューションの実現を目指しています。  

- フェーズ1：新しい税制に対応した請求書を、Web上で作成・発行できるアプリケーションを開発する。
- フェーズ2：発注書・見積書・納品書を、Web上で作成・発行できる機能を追加する。
- フェーズ3：お金や取引に関するデータをWeb上で確認できる機能を追加する。
- フェーズ4：取引に関するデータを、会計ソフトに効率的に取り込める機能を追加する。
