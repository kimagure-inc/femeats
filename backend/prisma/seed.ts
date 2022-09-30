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
      address: '香川県高松市上林町123',
      telPhone: '09012341234',
    },
  });

  await prisma.deliveryCycle.deleteMany();
  await prisma.deliveryCycle.createMany({
    data: [{ cycle: 2 }, { cycle: 3 }, { cycle: 4 }],
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
        stripe_id: 'price_1LkLNhAdWjJU6gVu741NrQl8',
      },
      {
        name: 'balance 10食セット',
        introduction:
          '生理前・生理中に必要となる栄養をバランス良く組み合わせています。野菜たっぷり♪当店自慢のプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/balance.jpg',
        category_id: 1,
        stripe_id: 'price_1LnJR2AdWjJU6gVuZxG6ADKa',
      },
      {
        name: 'beauty 5食セット',
        introduction:
          '緑黄色野菜たっぷりのメニューでビタミンや食物繊維を豊富に含んでいます。お肌の悩みが気になる方におすすめのプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/beauty.jpg',
        category_id: 2,
        stripe_id: 'price_1LnJRVAdWjJU6gVu7DjMkCSO',
      },
      {
        name: 'beauty 10食セット',
        introduction:
          '緑黄色野菜たっぷりのメニューでビタミンや食物繊維を豊富に含んでいます。お肌の悩みが気になる方におすすめのプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/beauty.jpg',
        category_id: 2,
        stripe_id: 'price_1LnJSPAdWjJU6gVurS9lZ8hW',
      },
      {
        name: 'relax 5食セット',
        introduction:
          '神経を落ち着かせるはたらきのあるカルシウムを豊富に含んでいます。心が不安定になりやすい方におすすめのプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/relax.jpg',
        category_id: 3,
        stripe_id: 'price_1LnJSxAdWjJU6gVuoqfKeyij',
      },
      {
        name: 'relax 10食セット',
        introduction:
          '神経を落ち着かせるはたらきのあるカルシウムを豊富に含んでいます。心が不安定になりやすい方におすすめのプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/relax.jpg',
        category_id: 3,
        stripe_id: 'price_1LnJTKAdWjJU6gVuYZ7nP09Z',
      },
      {
        name: 'energy 5食セット',
        introduction:
          'ホルモンバランスを整えつつ、身体の疲労をとる栄養をたっぷり含んでいます。生理期間でも、いつでも元気に過ごしたい方におすすめのプランです。',
        price: 3000,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/energy.jpg',
        category_id: 4,
        stripe_id: 'price_1LnJTnAdWjJU6gVuEHCh1awT',
      },
      {
        name: 'energy 10食セット',
        introduction:
          'ホルモンバランスを整えつつ、身体の疲労をとる栄養をたっぷり含んでいます。生理期間でも、いつでも元気に過ごしたい方におすすめのプランです。',
        price: 5800,
        imgUrl:
          'https://s3.ap-northeast-3.amazonaws.com/kimagure.inc-app/energy.jpg',
        category_id: 4,
        stripe_id: 'price_1LnJUAAdWjJU6gVulLo9DERE',
      },
    ],
  });

  await prisma.contract.deleteMany();
  await prisma.contract.create({
    data: {
      user_id: 1,
      product_id: 1,
      deliveryCycle_id: 3,
      timezone_id: 1,
      status_id: 1,
      first_del_date: new Date('2022-10-2'),
      next_del_date: new Date('2022-10-30'),
    },
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
