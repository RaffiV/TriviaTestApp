import { Component, OnInit } from '@angular/core';
import {TriviaService} from "./services/trivia.service";
import {Quiz} from "./components/quiz-page/quiz-page.component";

export enum ActivePage {
  Home,
  Quiz,
  PrevScores
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  activeToken: string;
  ActivePage = ActivePage;
  activePage: ActivePage = ActivePage.Home;
  selectedCategory: string;
  completedQuiz: Quiz = null;

  constructor(private triviaService: TriviaService) {}

  ngOnInit() {
    this.triviaService.generateToken()
      .subscribe(token => this.activeToken = token);
  }

  onCategorySubmit(value: string): void {
    this.selectedCategory = value;
    this.setActivePage(ActivePage.Quiz);
  }

  reviewPrevQuiz(quiz: Quiz): void {
    this.completedQuiz = quiz;
    this.setActivePage(ActivePage.Quiz);
  }

  showScoresPage(): void {
    this.setActivePage(ActivePage.PrevScores);
  }

  onBackToHome(): void {
    this.completedQuiz = null;
    this.activePage = ActivePage.Home;
  }

  private setActivePage(page: ActivePage): void {
    this.activePage = page;
  }

}
