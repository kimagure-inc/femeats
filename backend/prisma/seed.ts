import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('💫 seed executing ...');

  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      name: '山崎みずえ',
      email: 'mizue@prisam.io',
      password: '1234abcd',
      postcode: '1112222',
      address1: '東京都',
      address2: '新宿区西新宿二丁目8-1',
      telPhone: '09012341234',
    },
  });

  await prisma.deliveryTimezone.deleteMany();
  await prisma.deliveryTimezone.createMany({
    data: [
      { timezone: '指定なし' },
      { timezone: '午前中(12時まで)' },
      { timezone: '14時から16時' },
      { timezone: '16時から18時' },
      { timezone: '19時から21時' },
    ],
  });

  await prisma.category.deleteMany();
  await prisma.category.createMany({
    data: [
      { name: 'balance' },
      { name: 'beauty' },
      { name: 'relax' },
      { name: 'energy' },
    ],
  });

  await prisma.status.deleteMany();
  await prisma.status.createMany({
    data: [{ name: '継続中' }, { name: '停止中' }, { name: '解約中' }],
  });

  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: [
      {
        name: 'balance 5食セット',
        introduction:
          '生理前・生理中に必要となる栄養をバランス良く組み合わせています。野菜たっぷり♪当店自慢のプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/balance.jpg',
        category_id: 1,
        stripe_id: 'price_1Lpk7aAdWjJU6gVuRH86NHmp',
        deliveryCycle: 4,
      },
      {
        name: 'balance 10食セット',
        introduction:
          '生理前・生理中に必要となる栄養をバランス良く組み合わせています。野菜たっぷり♪当店自慢のプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/balance.jpg',
        category_id: 1,
        stripe_id: 'price_1Lpk8mAdWjJU6gVuqYvt5RQZ',
        deliveryCycle: 4,
      },
      {
        name: 'beauty 5食セット',
        introduction:
          '緑黄色野菜たっぷりのメニューでビタミンや食物繊維を豊富に含んでいます。お肌の悩みが気になる方におすすめのプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/beauty.jpg',
        category_id: 2,
        stripe_id: 'price_1Lpk9mAdWjJU6gVuF6YLp2GI',
        deliveryCycle: 4,
      },
      {
        name: 'beauty 10食セット',
        introduction:
          '緑黄色野菜たっぷりのメニューでビタミンや食物繊維を豊富に含んでいます。お肌の悩みが気になる方におすすめのプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/beauty.jpg',
        category_id: 2,
        stripe_id: 'price_1LpkAiAdWjJU6gVuDpQyVooI',
        deliveryCycle: 4,
      },
      {
        name: 'relax 5食セット',
        introduction:
          '神経を落ち着かせるはたらきのあるカルシウムを豊富に含んでいます。心が不安定になりやすい方におすすめのプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/relax.jpg',
        category_id: 3,
        stripe_id: 'price_1LpkBxAdWjJU6gVur2hpFnOp',
        deliveryCycle: 4,
      },
      {
        name: 'relax 10食セット',
        introduction:
          '神経を落ち着かせるはたらきのあるカルシウムを豊富に含んでいます。心が不安定になりやすい方におすすめのプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/relax.jpg',
        category_id: 3,
        stripe_id: 'price_1LpkD4AdWjJU6gVuXErWIVkX',
        deliveryCycle: 4,
      },
      {
        name: 'energy 5食セット',
        introduction:
          'ホルモンバランスを整えつつ、身体の疲労をとる栄養をたっぷり含んでいます。生理期間でも、いつでも元気に過ごしたい方におすすめのプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/energy.jpg',
        category_id: 4,
        stripe_id: 'price_1LpkEYAdWjJU6gVuTIvGJyEK',
        deliveryCycle: 4,
      },
      {
        name: 'energy 10食セット',
        introduction:
          'ホルモンバランスを整えつつ、身体の疲労をとる栄養をたっぷり含んでいます。生理期間でも、いつでも元気に過ごしたい方におすすめのプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/energy.jpg',
        category_id: 4,
        stripe_id: 'price_1LpkFiAdWjJU6gVus3bDh4h5',
        deliveryCycle: 4,
      },
      {
        name: 'balance 5食セット',
        introduction:
          '生理前・生理中に必要となる栄養をバランス良く組み合わせています。野菜たっぷり♪当店自慢のプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/balance.jpg',
        category_id: 1,
        stripe_id: 'price_1Lpk2uAdWjJU6gVuMxcaOeQs',
        deliveryCycle: 3,
      },
      {
        name: 'balance 10食セット',
        introduction:
          '生理前・生理中に必要となる栄養をバランス良く組み合わせています。野菜たっぷり♪当店自慢のプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/balance.jpg',
        category_id: 1,
        stripe_id: 'price_1Lpk8SAdWjJU6gVuXGvz0L11',
        deliveryCycle: 3,
      },
      {
        name: 'beauty 5食セット',
        introduction:
          '緑黄色野菜たっぷりのメニューでビタミンや食物繊維を豊富に含んでいます。お肌の悩みが気になる方におすすめのプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/beauty.jpg',
        category_id: 2,
        stripe_id: 'price_1Lpk9SAdWjJU6gVuF1WSncTJ',
        deliveryCycle: 3,
      },
      {
        name: 'beauty 10食セット',
        introduction:
          '緑黄色野菜たっぷりのメニューでビタミンや食物繊維を豊富に含んでいます。お肌の悩みが気になる方におすすめのプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/beauty.jpg',
        category_id: 2,
        stripe_id: 'price_1LpkAQAdWjJU6gVuHohf7qik',
        deliveryCycle: 3,
      },
      {
        name: 'relax 5食セット',
        introduction:
          '神経を落ち着かせるはたらきのあるカルシウムを豊富に含んでいます。心が不安定になりやすい方におすすめのプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/relax.jpg',
        category_id: 3,
        stripe_id: 'price_1LpkBaAdWjJU6gVuCJTY3obk',
        deliveryCycle: 3,
      },
      {
        name: 'relax 10食セット',
        introduction:
          '神経を落ち着かせるはたらきのあるカルシウムを豊富に含んでいます。心が不安定になりやすい方におすすめのプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/relax.jpg',
        category_id: 3,
        stripe_id: 'price_1LpkCmAdWjJU6gVuUbxX8XcR',
        deliveryCycle: 3,
      },
      {
        name: 'energy 5食セット',
        introduction:
          'ホルモンバランスを整えつつ、身体の疲労をとる栄養をたっぷり含んでいます。生理期間でも、いつでも元気に過ごしたい方におすすめのプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/energy.jpg',
        category_id: 4,
        stripe_id: 'price_1LpkEFAdWjJU6gVudsZ0qRmp',
        deliveryCycle: 3,
      },
      {
        name: 'energy 10食セット',
        introduction:
          'ホルモンバランスを整えつつ、身体の疲労をとる栄養をたっぷり含んでいます。生理期間でも、いつでも元気に過ごしたい方におすすめのプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/energy.jpg',
        category_id: 4,
        stripe_id: 'price_1LpkFHAdWjJU6gVu5SQfOPKD',
        deliveryCycle: 3,
      },
      {
        name: 'balance 5食セット',
        introduction:
          '生理前・生理中に必要となる栄養をバランス良く組み合わせています。野菜たっぷり♪当店自慢のプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/balance.jpg',
        category_id: 1,
        stripe_id: 'price_1Lpk2CAdWjJU6gVuCSpPoCov',
        deliveryCycle: 2,
      },
      {
        name: 'balance 10食セット',
        introduction:
          '生理前・生理中に必要となる栄養をバランス良く組み合わせています。野菜たっぷり♪当店自慢のプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/balance.jpg',
        category_id: 1,
        stripe_id: 'price_1Lpk82AdWjJU6gVu3Bvjn5ZF',
        deliveryCycle: 2,
      },
      {
        name: 'beauty 5食セット',
        introduction:
          '緑黄色野菜たっぷりのメニューでビタミンや食物繊維を豊富に含んでいます。お肌の悩みが気になる方におすすめのプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/beauty.jpg',
        category_id: 2,
        stripe_id: 'price_1Lpk9CAdWjJU6gVuhrfFye9h',
        deliveryCycle: 2,
      },
      {
        name: 'beauty 10食セット',
        introduction:
          '緑黄色野菜たっぷりのメニューでビタミンや食物繊維を豊富に含んでいます。お肌の悩みが気になる方におすすめのプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/beauty.jpg',
        category_id: 2,
        stripe_id: 'price_1LpkA4AdWjJU6gVuU2F2m5KA',
        deliveryCycle: 2,
      },
      {
        name: 'relax 5食セット',
        introduction:
          '神経を落ち着かせるはたらきのあるカルシウムを豊富に含んでいます。心が不安定になりやすい方におすすめのプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/relax.jpg',
        category_id: 3,
        stripe_id: 'price_1LpkBIAdWjJU6gVu1d8oogSs',
        deliveryCycle: 2,
      },
      {
        name: 'relax 10食セット',
        introduction:
          '神経を落ち着かせるはたらきのあるカルシウムを豊富に含んでいます。心が不安定になりやすい方におすすめのプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/relax.jpg',
        category_id: 3,
        stripe_id: 'price_1LpkCSAdWjJU6gVuFJGyz1Qn',
        deliveryCycle: 2,
      },
      {
        name: 'energy 5食セット',
        introduction:
          'ホルモンバランスを整えつつ、身体の疲労をとる栄養をたっぷり含んでいます。生理期間でも、いつでも元気に過ごしたい方におすすめのプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/energy.jpg',
        category_id: 4,
        stripe_id: 'price_1LpkDzAdWjJU6gVu74TUnAyO',
        deliveryCycle: 2,
      },
      {
        name: 'energy 10食セット',
        introduction:
          'ホルモンバランスを整えつつ、身体の疲労をとる栄養をたっぷり含んでいます。生理期間でも、いつでも元気に過ごしたい方におすすめのプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/energy.jpg',
        category_id: 4,
        stripe_id: 'price_1LpkEtAdWjJU6gVueHDq8smO',
        deliveryCycle: 2,
      },
    ],
  });

  await prisma.contract.deleteMany();
  await prisma.contract.create({
    data: {
      user_id: 1,
      product_id: 1,
      timezone_id: 1,
      status_id: 1,
      deliveryDate: new Date('2022-10-8'),
      orderDate: new Date('2022-10-3'),
    },
  });

  await prisma.question.deleteMany();
  await prisma.question.createMany({
    data: [
      {
        question: '栄養バランスを考えた食事をとっていますか？',
        choice1: 'ほぼ毎日',
        choice2: '週に3〜4食',
        choice3: '週に1〜2食',
        choice4: '栄養バランスは考えていない',
      },
      {
        question: '体を温める食事や生活を実践していますか？',
        choice1: 'ほぼ毎日',
        choice2: '週に1〜2回',
        choice3: '生理前や生理中のみ',
        choice4: 'ほとんど実践していない',
      },
      {
        question: '生理前や生理中に、肌荒れが気になりますか？',
        choice1: 'まったく気にならない',
        choice2: 'ほとんど気にならない',
        choice3: '部分的に気になる',
        choice4: '全身の肌荒れが気になる',
      },
      {
        question:
          '生理前や生理中に、不安・緊張・興奮・イライラなどを感じることがありますか？',
        choice1: 'まったく感じない',
        choice2: 'ほとんど感じない',
        choice3: '2〜3回に1度',
        choice4: 'ほぼ毎回',
      },
      {
        question: '最近疲れやすいと感じますか？',
        choice1: 'ほとんど感じない',
        choice2: '月に1〜2回',
        choice3: '週に3〜4回',
        choice4: 'ほぼ毎日',
      },
    ],
  });

  await prisma.recommend.deleteMany();
  await prisma.recommend.createMany({
    data: [{ product_id: 1, email: 'mizue@prisam.io' }],
  });

  console.log('💫 seed finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
