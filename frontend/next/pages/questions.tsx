import Link from "next/link";
import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import axios, { AxiosResponse, AxiosError } from "axios";

type questions = {
	questions: question[]
}

type question = {
	id: number;
	question: string;
	choice1: string;
	choice2: string;
	choice3: string;
	choice4: string;
	choice5: string;
  }

type allAnswer = number[]

export default function App(props: questions) {

	const questions: question[] = props.questions;
	const router = useRouter();
	const [isStart, setIsStart] = useState(false);
	const [userName, setUserName] = useState("");
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [finishAnswer, setFinishAnswer] = useState(false); // Q5を答えたらtrueに変わる
	const [waitingResult, setWaitingResult] = useState(false); //Trueになったら診断中の画面に変わる
	const [allAnswer, setAllAnswer] = useState<allAnswer>([]); //ユーザーの回答をQ1〜Q5まで溜めておく
	
	const startBtn = () => { setIsStart(true) };

	const handleAnswerOptionClick = (userAnswer: number) => {

		setAllAnswer([...allAnswer, userAnswer]);

		const nextQuestion = currentQuestion + 1;

		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion); // 次の質問を表示
		} else {
			setFinishAnswer(true); // Q5を答えたら送信ボタンを出現させる
		}
	};

	const submitBtn = () => { 
		setWaitingResult(true); // 診断中の画面を表示
		postAnswer();  // APIに回答送信後、結果ページへ遷移させる 
	};

	const postAnswer = () => {
		axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/personalize`, {
			data: allAnswer
		}).then((res: AxiosResponse) => {
			console.log('Posting data', res);
			showResult(res.data);
		})
		.catch((e: AxiosError<{ error: string }>) => console.log(e.message, 500))
	}

	const showResult = (recommendCategory: number) => {
		  setTimeout(() => {
			router.push({
				pathname: '/recommend',
				query: {name: userName, category: recommendCategory},	
			}, 'recommend');
		  }, 3 * 1000);
	}

	return (
        <>
      <h2>パーソナライズ診断</h2>
		<div className='app'>
			{ !isStart ? (
				<div className='score-section'>
					お名前を教えてください（ニックネーム可）
					<br/>
					<input type="text" value={userName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.currentTarget.value)}/>
					<br/>
					<button onClick={startBtn}>診断をはじめる</button>
				</div>				
			) : (
			waitingResult ? (
				<div className='score-section'>
					{userName}さんにおすすめのプランを診断中・・・
				</div>				
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<br/>
						<div className='question-text'>{questions[currentQuestion].question}</div>
						<br/>
					</div>
					<div className='answer-section'>
                        <button onClick={() => handleAnswerOptionClick(1)}>{questions[currentQuestion].choice1}</button>{" "}
                        <button onClick={() => handleAnswerOptionClick(2)}>{questions[currentQuestion].choice2}</button>{" "}
                        <button onClick={() => handleAnswerOptionClick(3)}>{questions[currentQuestion].choice3}</button>{" "}
                        <button onClick={() => handleAnswerOptionClick(4)}>{questions[currentQuestion].choice4}</button>{" "}
						<br/>
						<br/>
						{finishAnswer ? (
							<div className='score-section'>
								<button onClick={submitBtn}>診断結果を見る</button>					
							</div>							
						) : (
							<div></div>
						)}
					</div>
				</>
			))}
		</div>
        </>
	);
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_BASE_URL}/questions`)

  return { props: {
    questions: await res.json()
  } }
}