import { Injectable } from '@angular/core';
import { Quiz } from '../components/quiz-page/quiz-page.component';

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
