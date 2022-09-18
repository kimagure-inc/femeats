import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("💫 seed executing ...");

    await prisma.spot.deleteMany();
    await prisma.spot.createMany({
        data: [
            {
                name: "伊勢神宮",
                introduction: "7世紀建立の代表的な神宮。森や川に囲まれた複数の社殿が点在。",
                amuletUrl: "https://buy.stripe.com/test_14kcP36Wh8vR7Go7ss",
                amuletPrice: 1000,
            },
            {
                name: "来宮神社",
                introduction: "推定樹齢2,000年の大楠が境内にある神社。",
                amuletUrl: "https://buy.stripe.com/test_7sI2apeoJeUf0dWeUV",
                amuletPrice: 800,
            },
            {
                name: "皇居",
                introduction: "美しい庭園がある天皇の住居。一般参観もできる。",
            },
            {
                name: "諏訪大社",
                introduction: "山麓の静かな森に佇む木造の神社。複数の拝殿があり、さまざまな彫刻が施されている。",
                amuletUrl: "https://buy.stripe.com/test_fZeeXbfsNdQb4uc28a",
                amuletPrice: 500,
            },
            {
                name: "住吉大社",
                introduction: "景観の美しい 3世紀の神社。赤い橋と静かな庭園がある。",
                amuletUrl: "https://buy.stripe.com/test_7sI3eteoJaDZ7GocN0",
                amuletPrice: 500,
            },
            {
                name: "鶴岡八幡",
                introduction: "11世紀建立の神社。1828年に江戸時代の伝統的建築様式により改築。",
                amuletUrl: "https://buy.stripe.com/test_3cs16leoJ8vRaSA6or",
                amuletPrice: 1000,
            },
            {
                name: "日光東照宮",
                introduction: "江戸幕府初代将軍を祀る 17世紀の神社。色彩豊かな建物と芸術が見所。",
                amuletUrl: "https://buy.stripe.com/test_5kA02h94pdQb6Ck9AE",
                amuletPrice: 800,
            },
            {
                name: "幣立神宮",
                introduction: "清らかな池や、そびえ立つ樹木に囲まれた急な階段の先にある小さな神社。",
                amuletUrl: "https://buy.stripe.com/test_eVaaGV1BXfYj9Ow5kp",
                amuletPrice: 700,
            },
            {
                name: "布引の滝",
                introduction: "ハイキングコースからアクセスできる山中の滝。近くの尾根からはスカイラインと港の景色が一望できる。",
            },
            {
                name: "根津神社",
                introduction: "閑静な神社。千本鳥居、春に見頃を迎えるつつじで有名。",
                amuletUrl: "https://buy.stripe.com/test_eVa9CR6WheUff8Q7sy",
                amuletPrice: 800,
            },
            {
                name: "榛名神社",
                introduction: "榛名川沿いの歴史ある神社。年間を通じてさまざまな祭りが催される。",
                amuletUrl: "https://buy.stripe.com/test_6oE4ix6Wh13p5yg007",
                amuletPrice: 1000,
            },
            {
                name: "箱根神社",
                introduction: "緑豊かな湖畔にある由緒ある神社。小さな宝物殿も併設。",
                amuletUrl: "https://buy.stripe.com/test_3csaGV4O98vR1i04go",
                amuletPrice: 1000,
            },
            {
                name: "明治神宮",
                introduction: "森に囲まれた由緒ある神社。菖蒲園が有名。",
                amuletUrl: "https://buy.stripe.com/test_aEUeXb2G18vR9Ow14d",
                amuletPrice: 800,
            },
            {
                name: "御岩神社",
                introduction: "荘厳な楼門のある神社。御岩山を登る参道は大きな杉の木に囲まれている。",
                amuletUrl: "https://buy.stripe.com/test_9AQcP394ph2nf8Q3cm",
                amuletPrice: 800,
            },
            {
                name: "善光寺",
                introduction: "庭園や宝物館がある美しい境内で知られる 7世紀の仏教寺院。",
                amuletUrl: "https://buy.stripe.com/test_7sIbKZbcx6nJ9OweV5",
                amuletPrice: 600,
            },
            {
                name: "分杭峠",
                introduction: "長野県伊那市と下伊那郡大鹿村との境界に位置する標高1,424mの峠。静岡県浜松市の秋葉神社へ向かう街道として古くから利用された秋葉街道の峠の一つ。",
            },
            {
                name: "金剛崎",
                introduction: "能登半島にある岬のひとつ。気象条件が良ければ真っ青に染まる青の洞窟が存在。美しい岩礁部分では磯釣りも楽しめる。",
            },
            {
                name: "出羽三山 羽黒山",
                introduction: "出羽三山の1つ。有名な五重塔があることで知られる。山頂までは2,446段の階段を登る。",
            },
            {
                name: "霊場恐山",
                introduction: "火山でできたカルデラ湖にある、由緒ある仏教寺と温泉地。",
            },
            {
                name: "高野山",
                introduction: "標高1000メートル級の八つの峰々に囲まれた深山の幽谷。平安時代のはじめ、弘法大師・空海によって密教の道場が開かれた日本仏教の聖地。",
            },
            {
                name: "江の島",
                introduction: "神奈川県の湘南海岸に浮かぶ小島。本土側には人気のビーチがあり、島を一望できる。",
            },
            {
                name: "出雲大社",
                introduction: "複数の社が立つ、日本を代表する大きな神社。隣接する博物館では美術品や祭事の資料などを展示。",
                amuletUrl: "https://buy.stripe.com/test_14keXb94pbI3e4M6oA",
                amuletPrice: 1000,
            },
            {
                name: "橿原神宮",
                introduction: "第一代天皇を祀る19世紀後半創建の神社。景観の良い歴史的名所。",
                amuletUrl: "https://buy.stripe.com/test_dR6g1fbcxdQb0dW7sF",
                amuletPrice: 1000,
            },
            {
                name: "富士山",
                introduction: "雪で覆われた山頂で有名な火山。日本の最高峰で、世界では7番目に高い独立峰。",
            },
            {
                name: "屋久島",
                introduction: "古代の杉の木が生い茂る森で静かな山のハイキングを楽しめる亜熱帯の島。",
            },
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