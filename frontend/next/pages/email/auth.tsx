import Layout from '../../layout/Layout';

export default function Sign() {
  return (
    <>
      <Layout auth={false}>
        <div>
          <h3>認証メールを送信しました</h3>
          <div>認証メールに記載されたURLから購入手続きに進んでください</div>
        </div>
      </Layout>
    </>
  );
}
