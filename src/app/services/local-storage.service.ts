import { Injectable } from '@angular/core';
import { Quiz } from '../components/quiz-page/quiz-page.component';

/*
* Service is responsible for saving the completed quizes in the local storage,
* and load the completed quizes for review.
* */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getPreviousScores(): Quiz[] {
    return JSON.parse(localStorage.getItem('prevScores')) || [];
  }

  public addNewScore(completeQuiz: Quiz): void {
    localStorage.setItem('prevScores', JSON.stringify([...this.getPreviousScores(), completeQuiz]));
  }

}
