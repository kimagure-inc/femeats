import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("💫 seed executing ...");

    // TODO:password後でhash化
    await prisma.user.deleteMany();
    await prisma.user.create({
        data: {
            name: "おでかけ太郎",
            email: "odekake@prisma.io",
            residence: "Tokyo",
            imgurl: "https://free-materials.com/adm/wp-content/uploads/2019/01/adpDSC_2004-750x500.jpg",
            password: "password",
            comment: "おでかけ大好きです！みなさんのおすすめスポットをたくさん教えてください！",
        },
    });

    await prisma.feeling.deleteMany();
    await prisma.feeling.createMany({
        data: [
            { id: 1, name: "自然と触れ合いたい" },
            { id: 2, name: "リフレッシュしたい" },
            { id: 3, name: "静かに過ごしたい" },
            { id: 4, name: "身体を動かしたい" },
            { id: 5, name: "美味しいものが食べたい" },
            { id: 6, name: "のんびりしたい" },
        ]
    });

    await prisma.post.deleteMany();
    await prisma.post.create({
        data: {
            title: "東京タワー🗼",
            comment: "メインデッキ1階の「カフェ ラ・トゥール」へ。世界大会連続金賞受賞のウィンナーを使用した「ゴールドメダルウィンナードッグ」（580円）がおすすめです。",
            userId: 1,
            feelingId: 5,
            imgurl: "https://free-materials.com/adm/wp-content/uploads/2016/11/adtDSC_3194-499x750.jpg",
        },
    })

    await prisma.type.deleteMany();
    await prisma.type.createMany({
        data: [
            { name: "amusement_park" },
            { name: "aquarium" },
            { name: "art_gallery" },
            { name: "bakery" },
            { name: "book_store" },
            { name: "bowling_alley" },
            { name: "cafe" },
            { name: "campground" },
            { name: "florist" },
            { name: "library" },
            { name: "movie_theater" },
            { name: "museum" },
            { name: "park" },
            { name: "restaurant" },
            { name: "shopping_mall" },
            { name: "spa" },
            { name: "tourist_attraction" },
            { name: "zoo" },
        ]
    });

    await prisma.feelingType.deleteMany();
    await prisma.feelingType.createMany({
        data: [
            { typeId: 1, feelingId: 2 },
            { typeId: 1, feelingId: 4 },
            { typeId: 2, feelingId: 1 },
            { typeId: 2, feelingId: 2 },
            { typeId: 3, feelingId: 3 },
            { typeId: 4, feelingId: 5 },
            { typeId: 4, feelingId: 6 },
            { typeId: 5, feelingId: 3 },
            { typeId: 5, feelingId: 6 },
            { typeId: 6, feelingId: 4 },
            { typeId: 7, feelingId: 3 },
            { typeId: 7, feelingId: 5 },
            { typeId: 7, feelingId: 6 },
            { typeId: 8, feelingId: 3 },
            { typeId: 8, feelingId: 4 },
            { typeId: 8, feelingId: 6 },
            { typeId: 9, feelingId: 1 },
            { typeId: 10, feelingId: 3 },
            { typeId: 10, feelingId: 6 },
            { typeId: 11, feelingId: 2 },
            { typeId: 12, feelingId: 1 },
            { typeId: 13, feelingId: 1 },
            { typeId: 13, feelingId: 3 },
            { typeId: 14, feelingId: 5 },
            { typeId: 15, feelingId: 2 },
            { typeId: 15, feelingId: 5 },
            { typeId: 16, feelingId: 2 },
            { typeId: 16, feelingId: 6 },
            { typeId: 17, feelingId: 1 },
            { typeId: 17, feelingId: 4 },
            { typeId: 18, feelingId: 1 },
        ]
    });

    // TODO:seed文は仮入れのため後から調整する
    await prisma.oneWord.deleteMany();
    await prisma.oneWord.createMany({
        data: [
            { comment: "お気に入りの洋服で出かけよう！" },
            { comment: "空を見上げてみると良いことがあるかも！" },
            { comment: "気に入ったスポットを見つけたら写真を撮ってみよう！" },
            { comment: "野良猫を見つけたらラッキー！" },
            { comment: "今日はちょっとした贅沢をしてみよう！" },
        ]
    });

    console.log('💫 seed finished.');
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })