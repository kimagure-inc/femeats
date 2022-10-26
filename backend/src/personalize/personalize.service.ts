import { Injectable } from '@nestjs/common';
import { CreatePersonalizeDto } from './dto/create-personalize.dto';

const dataset = [
  // balance type
  { label: 1, Q1: 4, Q2: 4, Q3: 4, Q4: 4, Q5: 4 },
  { label: 1, Q1: 3, Q2: 3, Q3: 3, Q4: 3, Q5: 3 },
  { label: 1, Q1: 2, Q2: 2, Q3: 2, Q4: 2, Q5: 2 },
  { label: 1, Q1: 1, Q2: 1, Q3: 1, Q4: 1, Q5: 1 },
  { label: 1, Q1: 4, Q2: 3, Q3: 3, Q4: 2, Q5: 1 },
  // beauty type
  { label: 2, Q1: 1, Q2: 1, Q3: 4, Q4: 1, Q5: 1 },
  { label: 2, Q1: 2, Q2: 2, Q3: 4, Q4: 2, Q5: 2 },
  { label: 2, Q1: 3, Q2: 3, Q3: 4, Q4: 3, Q5: 3 },
  { label: 2, Q1: 2, Q2: 2, Q3: 3, Q4: 2, Q5: 2 },
  { label: 2, Q1: 1, Q2: 1, Q3: 3, Q4: 1, Q5: 1 },
  // relax type
  { label: 3, Q1: 1, Q2: 1, Q3: 1, Q4: 4, Q5: 1 },
  { label: 3, Q1: 2, Q2: 2, Q3: 2, Q4: 4, Q5: 2 },
  { label: 3, Q1: 3, Q2: 3, Q3: 3, Q4: 4, Q5: 3 },
  { label: 3, Q1: 2, Q2: 2, Q3: 2, Q4: 3, Q5: 2 },
  { label: 3, Q1: 1, Q2: 1, Q3: 1, Q4: 3, Q5: 1 },
  // energy type
  { label: 4, Q1: 1, Q2: 1, Q3: 1, Q4: 1, Q5: 4 },
  { label: 4, Q1: 2, Q2: 2, Q3: 2, Q4: 2, Q5: 4 },
  { label: 4, Q1: 3, Q2: 3, Q3: 3, Q4: 3, Q5: 4 },
  { label: 4, Q1: 2, Q2: 2, Q3: 2, Q4: 2, Q5: 3 },
  { label: 4, Q1: 1, Q2: 1, Q3: 1, Q4: 1, Q5: 3 },
];

type UserAnswer = { data: number[] };

type Dataset = {
  label: number;
  Q1: number;
  Q2: number;
  Q3: number;
  Q4: number;
  Q5: number;
};

type Data = { Q1: number; Q2: number; Q3: number; Q4: number; Q5: number };

function decideLabel(userAnswer: UserAnswer, dataset: Dataset[]) {
  const nearestData = [];

  for (const x of dataset) {
    let distance = euclidDistance(userAnswer.data, x); // 20通りの距離を計算

    if (nearestData[0] === undefined || distance < nearestData[0].distance) {
      nearestData.splice(0, 1, { distance: distance, label: x.label });
    }
  }
  return nearestData[0].label;
}

function euclidDistance(answer: number[], data: Data) {
  return Math.sqrt(
    (answer[0] - data.Q1) ** 2 +
      (answer[1] - data.Q2) ** 2 +
      (answer[2] - data.Q3) ** 2 +
      (answer[3] - data.Q4) ** 2 +
      (answer[4] - data.Q5) ** 2,
  );
}

@Injectable()
export class PersonalizeService {
  create(userAnswer: UserAnswer) {
    return decideLabel(userAnswer, dataset);
  }
}
