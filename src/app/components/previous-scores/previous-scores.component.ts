import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {Quiz} from "../quiz-page/quiz-page.component";

/*
* Provides a table for user to review all the past Quiz scores (saved in local storage)
* as well as capability to navigate to any specific quiz to review in details
* */
@Component({
  selector: 'app-previous-scores',
  templateUrl: './previous-scores.component.html',
  styleUrls: ['./previous-scores.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviousScoresComponent implements OnInit {
  @Output() onReviewQuiz = new EventEmitter();
  @Output() onBackToHome = new EventEmitter();

  previousScoresList: Quiz[] = [];
  constructor(private localStorage: LocalStorageService) {
  }
  ngOnInit() {
    this.previousScoresList = (this.localStorage.getPreviousScores() as Quiz[]);
  }
  reviewQuiz(quiz: Quiz): void {
    this.onReviewQuiz.emit(quiz);
  }
  backToHome(): void {
    this.onBackToHome.emit();
  }
}
