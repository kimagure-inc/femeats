import React from 'react';
import axios from 'axios';

const ShippmentForm = (props: any) => {

  // console.log("props :", props)
  // console.log("props.props.cycle :", props.props.cycle)
  // console.log("props.props.cycle[0] :", props.props.cycle[0])

  return (
    <>
      <div>
          <div>
            <label>配送サイクル</label>
            <select name="cycle">
            <option>---選択してください---</option>
            {props.props.cycle.map((value: any) => (
                <option key={value.id}>{value.cycle}</option>
            ))}
            </select>
            週間ごと
          </div>
      </div>
      <div>
        <div>
          <label>初回お届け日</label>
          <select name="datelist">
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
            <select name="timezone">
            {props.props.timezone.map((value: any) => (
                <option value={value.timezone} key={value.id}>{value.timezone}</option>
            ))}
            </select>
          </div>
      </div>
    </>
  )
}

export default ShippmentForm;

// export async function getServerSideProps() {
//   const timezoneData = await axios.get(`${process.env.API_BASE_URL}/shippInfo/timezone`);
//   const timezone = timezoneData.data;
    
//   const cycleData = await axios.get(`${process.env.API_BASE_URL}/shippInfo/cycle`);
//   const cycle = await cycleData.data;
//   return {
//     props: {
//       timezone,
//       cycle,
//     },
//   };
// }

// 5日後の日程から2週間表示させる（例：今日10/1 => 10/6~10/20の日程）
const days = [ "日", "月", "火", "水", "木", "金", "土" ];
const dataSet: any[] = [];
let start = Date.now() + (5 * 86400000); // 基準日=5日後の日程
let max = 14; // 何回繰り返すか
for(let i = 0; i < max; i++) {

  let newDay = new Date(start + i * 86400000);
  let year = newDay.getFullYear();
  let month = newDay.getMonth() + 1;
  let date = newDay.getDate();
  let day = days[newDay.getDay()];

  let selectDay = year + '/' + month + '/' + date + '(' + day + ')';

  dataSet.push(selectDay);
}