import React from 'react';

const ShippmentForm = (props: any) => {

  return (
    <>
      <div>
        <div>
          <label>初回お届け日</label>
          <select
            name='datelist'
            onChange={(e) => props.deliveryDateChange(e.target.value)}
          >
            <option>---選択してください---</option>
            {dataSet.map((value: any) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div>
          <label>お届け時間帯</label>
          <select
            name='timezone'
            onChange={(e) => props.delTimeChange(e.target.value)}
          >
            {props.props.timezone.map((value: any) => (
              <option value={value.id} key={value.id}>
                {value.timezone}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default ShippmentForm;

// 5日後の日程から2週間表示させる（例：今日10/1 => 10/6~10/20の日程）
const days = ['日', '月', '火', '水', '木', '金', '土'];
const dataSet: any[] = [];
let start = Date.now() + 5 * 86400000; // 基準日=5日後の日程
let max = 14; // 何回繰り返すか
for (let i = 0; i < max; i++) {
  let newDay = new Date(start + i * 86400000);
  let year = newDay.getFullYear();
  let month = newDay.getMonth() + 1;
  let date = newDay.getDate();
  let day = days[newDay.getDay()];

  let selectDay = year + '/' + month + '/' + date + '(' + day + ')';

  dataSet.push(selectDay);
}
