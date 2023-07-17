import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../components/quiz-page/quiz-page.component';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private searchUrl = 'https://opentdb.com/api.php';
  public questionsCount = 10;
  private activeToken = '';
  private categoriesMap: Map<string, number> ;

  constructor(
    private httpClient: HttpClient
  ) { }

  loadQuizQuestions(category: string): Observable<Task[]> {
    return this.httpClient.get<any>(
      `${this.searchUrl}?amount=${this.questionsCount}&token=${this.activeToken}&category=${this.categoriesMap.get(category)}`)
      .pipe(map(questionsData => this.normalizeQuestionData(questionsData.results)));
  }

  generateToken(): Observable<string>{
    return this.httpClient.get<any>(`https://opentdb.com/api_token.php?command=request`)
      .pipe(
        map(response => response.token),
        tap(token => this.activeToken = token)
      );
  }

  getTheListOfCategories(): Observable<string[]> {
    if (this.categoriesMap) return of([...this.categoriesMap.keys()])

    return this.httpClient.get<any>('https://opentdb.com/api_category.php').pipe(
      tap(categoryData => this.categoriesMap = new Map(categoryData.trivia_categories.map(category => [category.name, category.id]))),
      map(categoryData => categoryData.trivia_categories.map(category => category.name))
    )
  }

  private normalizeQuestionData(questionsData): Task[] {
    return questionsData.map((task, index) => ({
      title: `Question ${index+1}`,
      question: this.htmlDecode(task.question),
      answers: [task.correct_answer, ...task.incorrect_answers]
        .map(x => this.htmlDecode(x))
        .sort(() => Math.random() - 0.5),
      correctAnswer: this.htmlDecode(task.correct_answer),
      userAnswer: null,
      difficulty: task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1),
    }));
  }

  private htmlDecode(input) {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
}
