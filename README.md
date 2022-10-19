# femeats

「女性の健康」を目的とした、レコメンドお弁当のサブスクサービス

![Top](https://github.com/yuko1113/image/blob/main/femeats-top.png)

## Features

- メール認証
- サインアップ、ログイン
- 決済（サブスクリプション）
- マイページ閲覧、編集
- プラン変更、一時停止
- パーソナライズ診断

## Built With

- [Next.js](https://nextjs.org/): 12.3.0
- [TypeScript](https://www.typescriptlang.org/): 4.8.3
- [MUI](https://mui.com/): 5.10.8
- [Nest.js](https://nestjs.com/): 9.0.0
- [Node.js](https://nodejs.org/ja/): 16.17.0
- [Prisma](https://www.prisma.io/): 4.3.1
- [MySQL](https://www.mysql.com/jp/): 8.0
- [Docker](https://www.docker.com/): 20.10.17
- [Stripe](https://stripe.com/jp): 10.11.0
- [AWS EC2,RDS,S3](https://aws.amazon.com/jp/)

## Getting Started

1.Clone this repository

```bash
$ git clone https://github.com/kimagure-inc/femeats.git
```

2.Move to the root directory

```bash
$ cd femeats
```

3.Download dependencies

```bash
$ docker-compose run -w /app/next --rm frontend npm install

$ docker-compose run -w /api --rm backend npm install
```

4.Add password file and Enter any password there

```bash
$ cd db
$ touch password.txt
```

5.Run the App

```bash
$ docker-compose up -d
```

6.Open http://localhost:8080 with your browser to see the App

## Project Structure

![Architecture](https://github.com/yuko1113/image/blob/main/architecture.png)

## Author

Kimagure.inc
