import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('💫 seed executing ...');

  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      name: '山崎　みずえ',
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

  await prisma.timezone.deleteMany();
  await prisma.timezone.createMany({
    data: [
      { timezone: '指定なし' },
      { timezone: '午前中(12時まで)' },
      { timezone: '14時から~16時' },
      { timezone: '16時から~18時' },
      { timezone: '19時から~21時' },
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

  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: [
      {
        name: 'balance 5食セット',
        introduction:
          '生理前・生理中に必要となる栄養をバランス良く組み合わせています。迷ったらまずはこのプランがおすすめです。',
        price: 3000,
        imgUrl: 'obento.jpg',
        category_id: 1,
      },
      {
        name: 'balance 10食セット',
        introduction:
          '生理前・生理中に必要となる栄養をバランス良く組み合わせています。迷ったらまずはこのプランがおすすめです。',
        price: 3000,
        imgUrl: 'obento.jpg',
        category_id: 1,
      },
      {
        name: 'beauty 5食セット',
        introduction:
          '緑黄色野菜たっぷりのメニューでビタミンや食物繊維を豊富に含んでいます。お肌の悩みが気になる方におすすめのプランです。',
        price: 3000,
        imgUrl: 'obento.jpg',
        category_id: 2,
      },
      {
        name: 'beauty 10食セット',
        introduction:
          '緑黄色野菜たっぷりのメニューでビタミンや食物繊維を豊富に含んでいます。お肌の悩みが気になる方におすすめのプランです。',
        price: 3000,
        imgUrl: 'obento.jpg',
        category_id: 2,
      },
      {
        name: 'relax 5食セット',
        introduction:
          '神経を落ち着かせるはたらきのあるカルシウムを豊富に含んでいます。心が不安定になりやすい方におすすめのプランです。',
        price: 3000,
        imgUrl: 'obento.jpg',
        category_id: 3,
      },
      {
        name: 'relax 10食セット',
        introduction:
          '神経を落ち着かせるはたらきのあるカルシウムを豊富に含んでいます。心が不安定になりやすい方におすすめのプランです。',
        price: 3000,
        imgUrl: 'obento.jpg',
        category_id: 3,
      },
      {
        name: 'energy 5食セット',
        introduction:
          'ホルモンバランスを整えつつ、身体の疲労をとる栄養をたっぷり含んでいます。生理期間でも、いつでも元気に過ごしたい方におすすめのプランです。',
        price: 3000,
        imgUrl: 'obento.jpg',
        category_id: 4,
      },
      {
        name: 'energy 10食セット',
        introduction:
          'ホルモンバランスを整えつつ、身体の疲労をとる栄養をたっぷり含んでいます。生理期間でも、いつでも元気に過ごしたい方におすすめのプランです。',
        price: 3000,
        imgUrl: 'obento.jpg',
        category_id: 4,
      },
    ],
  });

  await prisma.contract.deleteMany();
  await prisma.contract.create({
    data: {
      product_id: 1,
      user_id: 1,
      deliveryCycle_id: 1,
      timezone_id: 1,
      first_del_date: new Date('2022-10-02'),
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
